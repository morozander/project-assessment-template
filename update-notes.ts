import { existsSync, readFileSync, writeFileSync } from "node:fs"

const AUTH_TOKEN = (process.env.AUTH_TOKEN ?? "").trim()
if (!AUTH_TOKEN) throw new Error("AUTH_TOKEN env var is required")
const ASSESSMENT_ID = "ad504c3b-0f64-40af-a32d-ac450f7716ab"
const API_BASE = "https://api.assessments.geniusee.com/prod/api/v1"
const PROJECT = "panthers-capital-nov-2026"
const OUTPUT_DIR = `./output/${PROJECT}`
const CSV_PATH = `${OUTPUT_DIR}/working_version.csv`
const CONFIG_PATH = `${OUTPUT_DIR}/config.csv`
const CHANGES_PATH = `${OUTPUT_DIR}/changes.md`

const ACCEPT = "application/json, text/plain, */*"
const ACCEPT_LANGUAGE = "en-US,en;q=0.9,ru-UA;q=0.8,ru;q=0.7,uk-UA;q=0.6,uk;q=0.5"
const ORIGIN = "https://assessments.geniusee.com"
const REFERER = "https://assessments.geniusee.com/"
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
const TIMEZONE_OFFSET = "-180"

const COMMON_HEADERS: Record<string, string> = {
  accept: ACCEPT,
  "accept-language": ACCEPT_LANGUAGE,
  authorization: `Bearer ${AUTH_TOKEN}`,
  origin: ORIGIN,
  priority: "u=1, i",
  referer: REFERER,
  "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent": USER_AGENT,
  "x-timezone-offset": TIMEZONE_OFFSET,
}

type ApiTask = {
  id: string
  required: boolean
  implementationStatus: string | null
  priority: string | null
  note: string | null
  score: number | null
  templateTask?: { body?: string }
}

type AssessmentResponse = {
  assessmentScore?: number | null
  bestPracticeScore?: number | null
  tasks?: ApiTask[]
  kickOffAssessmentTasks?: ApiTask[]
}

type TaskChange = {
  body: string
  oldNote: string
  newNote: string
  oldStatus: string | null
  newStatus: string | null
}

function parseCsv(content: string): Record<string, string>[] {
  const rows: string[][] = []
  let current = ""
  let row: string[] = []
  let inQuotes = false

  for (let i = 0; i < content.length; i++) {
    const ch = content[i]
    if (ch === '"') {
      if (inQuotes && content[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === "," && !inQuotes) {
      row.push(current)
      current = ""
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && content[i + 1] === "\n") i++
      row.push(current)
      current = ""
      if (row.some(cell => cell.trim() !== "")) rows.push(row)
      row = []
    } else {
      current += ch
    }
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current)
    if (row.some(cell => cell.trim() !== "")) rows.push(row)
  }

  if (rows.length < 2) return []

  const headers = rows[0].map(header => header.trim())
  return rows.slice(1).map(values => Object.fromEntries(headers.map((header, index) => [header, (values[index] ?? "").trim()])))
}

function csvCell(value: string): string {
  if (/[",\n\r]/.test(value)) return `"${value.replaceAll('"', '""')}"`
  return value
}

function formatScore(value: unknown): string {
  if (value === null || value === undefined) return ""
  return String(value)
}

function readConfigScores(): { assessmentScore: string; bestPracticeScore: string } {
  const rows = parseCsv(readFileSync(CONFIG_PATH, "utf-8"))
  const row = rows[0] ?? {}
  return {
    assessmentScore: row.assessmentScore ?? "",
    bestPracticeScore: row.bestPracticeScore ?? "",
  }
}

function writeConfigIfMissing(data: AssessmentResponse): void {
  if (existsSync(CONFIG_PATH)) return
  const line = [csvCell(formatScore(data.assessmentScore)), csvCell(formatScore(data.bestPracticeScore))].join(",")
  writeFileSync(CONFIG_PATH, `assessmentScore,bestPracticeScore\n${line}\n`, "utf-8")
}

function display(value: string | null): string {
  if (value === null) return "null"
  if (value === "") return '""'
  return value
}

function writeChanges(options: {
  matched: number
  unmatched: number
  skippedDone: number
  changes: TaskChange[]
  patchStatus: number
  patchStatusText: string
  oldScores: { assessmentScore: string; bestPracticeScore: string }
  newScores?: { assessmentScore: string; bestPracticeScore: string }
}): void {
  const { matched, unmatched, skippedDone, changes, patchStatus, patchStatusText, oldScores, newScores } = options
  const scoreLine = (label: "assessmentScore" | "bestPracticeScore"): string => {
    const oldValue = oldScores[label] === "" ? "(empty)" : oldScores[label]
    if (!newScores) return `- ${label}: ${oldValue} → (omitted; PATCH failed)`
    const next = newScores[label] === "" ? "(empty)" : newScores[label]
    return `- ${label}: ${oldValue} → ${next}`
  }

  const changeBlocks =
    changes.length === 0
      ? "_No note or status changes._"
      : changes
          .map(change => {
            const lines = [`### ${change.body}`]
            if (change.oldNote !== change.newNote) {
              lines.push(`- note: ${display(change.oldNote)} → ${display(change.newNote)}`)
            }
            if (change.oldStatus !== change.newStatus) {
              lines.push(`- implementationStatus: ${display(change.oldStatus)} → ${display(change.newStatus)}`)
            }
            return lines.join("\n")
          })
          .join("\n\n")

  const body = [
    "# Dashboard update",
    "",
    `- Matched: ${matched}`,
    `- Unmatched: ${unmatched}`,
    `- Skipped Done: ${skippedDone}`,
    `- PATCH status: ${patchStatus} ${patchStatusText}`,
    "",
    "## Scores",
    "",
    scoreLine("assessmentScore"),
    scoreLine("bestPracticeScore"),
    "",
    "## Changes",
    "",
    changeBlocks,
    "",
  ].join("\n")

  writeFileSync(CHANGES_PATH, body, "utf-8")
}

async function main(): Promise<void> {
  const rows = parseCsv(readFileSync(CSV_PATH, "utf-8"))
  const noteMap = new Map<string, string>()
  const statusMap = new Map<string, string>()

  for (const row of rows) {
    const body = row.task_body?.trim()
    if (!body) continue
    noteMap.set(body, row.notes ?? "")
    const implemented = (row["is implemented"] ?? "").toLowerCase().trim()
    if (implemented === "yes") statusMap.set(body, "Done")
    else if (implemented === "no") statusMap.set(body, "Open")
  }

  console.log(`CSV loaded: ${rows.length} rows, ${noteMap.size} task_body entries`)

  const getRes = await fetch(`${API_BASE}/kick-offs-assessments/${ASSESSMENT_ID}`, {
    headers: COMMON_HEADERS,
  })
  if (!getRes.ok) {
    console.error(`GET failed: ${getRes.status} ${getRes.statusText}`)
    console.error((await getRes.text()).slice(0, 500))
    process.exit(1)
  }

  const data = (await getRes.json()) as AssessmentResponse
  writeConfigIfMissing(data)
  const oldScores = readConfigScores()

  const apiTasks = data.tasks ?? data.kickOffAssessmentTasks ?? []
  console.log(`API returned: ${apiTasks.length} tasks`)

  let matched = 0
  let unmatched = 0
  let skippedDone = 0
  const preview: string[] = []
  const changes: TaskChange[] = []

  const updatedTasks = apiTasks.map(task => {
    const taskBody = task.templateTask?.body ?? ""
    const base = {
      id: task.id,
      required: task.required,
      implementationStatus: task.implementationStatus,
      priority: task.priority,
      note: task.note ?? "",
      score: task.score,
    }

    if (!noteMap.has(taskBody)) {
      unmatched++
      return base
    }

    matched++

    if (task.implementationStatus === "Done") {
      skippedDone++
      return base
    }

    const newNote = noteMap.get(taskBody) ?? ""
    const newStatus = statusMap.has(taskBody) ? statusMap.get(taskBody)! : task.implementationStatus
    const oldNote = task.note ?? ""
    const changed = newNote !== oldNote || newStatus !== task.implementationStatus

    if (changed) {
      changes.push({
        body: taskBody,
        oldNote,
        newNote,
        oldStatus: task.implementationStatus,
        newStatus,
      })
      if (preview.length < 5) {
        preview.push(`  [${taskBody}] note: "${newNote}" | status: ${task.implementationStatus} → ${newStatus}`)
      }
    }

    return {
      ...base,
      implementationStatus: newStatus,
      note: newNote,
    }
  })

  console.log(`\nMatched: ${matched} | Unmatched: ${unmatched} | Skipped Done: ${skippedDone}`)
  console.log("Preview of first 5 tasks that change:")
  if (preview.length === 0) console.log("  (none)")
  else preview.forEach(line => console.log(line))

  const patchRes = await fetch(`${API_BASE}/kick-offs-assessments/${ASSESSMENT_ID}`, {
    method: "PATCH",
    headers: { ...COMMON_HEADERS, "content-type": "application/json" },
    body: JSON.stringify({ kickOffAssessmentTasks: updatedTasks }),
  })

  console.log(`\nPATCH response: ${patchRes.status} ${patchRes.statusText}`)

  if (!patchRes.ok) {
    console.error("PATCH error body:", await patchRes.text())
    writeChanges({
      matched,
      unmatched,
      skippedDone,
      changes,
      patchStatus: patchRes.status,
      patchStatusText: patchRes.statusText,
      oldScores,
    })
    process.exit(1)
  }

  const afterRes = await fetch(`${API_BASE}/kick-offs-assessments/${ASSESSMENT_ID}`, {
    headers: COMMON_HEADERS,
  })
  if (!afterRes.ok) {
    console.error(`Follow-up GET failed: ${afterRes.status} ${afterRes.statusText}`)
    console.error((await afterRes.text()).slice(0, 500))
    writeChanges({
      matched,
      unmatched,
      skippedDone,
      changes,
      patchStatus: patchRes.status,
      patchStatusText: patchRes.statusText,
      oldScores,
    })
    process.exit(1)
  }

  const after = (await afterRes.json()) as AssessmentResponse
  const newScores = {
    assessmentScore: formatScore(after.assessmentScore),
    bestPracticeScore: formatScore(after.bestPracticeScore),
  }

  writeChanges({
    matched,
    unmatched,
    skippedDone,
    changes,
    patchStatus: patchRes.status,
    patchStatusText: patchRes.statusText,
    oldScores,
    newScores,
  })

  console.log(
    `Scores: assessmentScore ${oldScores.assessmentScore || "(empty)"} → ${newScores.assessmentScore || "(empty)"}; bestPracticeScore ${oldScores.bestPracticeScore || "(empty)"} → ${newScores.bestPracticeScore || "(empty)"}`,
  )
  console.log("Dashboard updated successfully.")
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
