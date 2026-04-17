import { readFileSync } from "fs";

const AUTH_TOKEN =
  "eyJraWQiOiJzMkJpb2NCT3EyM1BmYTh5eTMxYVJJQzM2UGM1OVpsbjY0R0dUNlY1TlRZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4M2Q0Zjg4Mi1mMDgxLTcwNTgtMGYxMC01YzQ3ODI4ZjI3NGMiLCJjb2duaXRvOmdyb3VwcyI6WyJldS1jZW50cmFsLTFfYXg3QU92R3JJX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9heDdBT3ZHckkiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI2NGtiamp2M3JzdDZlMG8zbzNobTM0NzlpcyIsIm9yaWdpbl9qdGkiOiIzZjQ0NWNkMS0yMzI4LTQyMWYtODVkMS1jNTM0YTdhNTU4MjYiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNzc2NDA5Njk0LCJleHAiOjE3NzY0MTczNTUsImlhdCI6MTc3NjQxMzc1NSwianRpIjoiNzkxOTllY2UtMmM0ZC00OTdjLWFhYjktZDViNGM4NWQ1ZGNhIiwidXNlcm5hbWUiOiJHb29nbGVfMTExNDAwNjE1ODQ4NDgxOTQwNTUyIn0.TWfXpMWL88xwJiDaSx2t_eN_sqe4jaNhgkn82FzYtr5EWh_rwkSBU8WWYm5eeuW_O-jCgLjqp0xHgI9oIWpoINRQ8h9MHs2ViRlNM0tDXDw04egjcRULI-FwJjVQRWGNeOuo99HtaoFV4wWfG_6cYrGZJDPLKQDUaMjOKkOJxNoj7Bc7cFzMizWWvwHK4stVPPGpHeslYWJbexyq-yz-KQJlP9iqMbdsqh3lg2wp_wHGNBCf0pUYJ_CEqauz4QzvN7yGSeiTW5yWxlqUxJXG0NHJSNqylfRlrNoswacsfOXH_W6rv9Zn1NAQzcpe9JxZ-z-owMyqkEmvEAqmdgRluQ";

const ASSESSMENT_ID = "d01fc1fe-c06e-4000-a90a-aa079308f920";
const API_BASE = "https://api.assessments.geniusee.com/prod/api/v1";
const CSV_PATH = "./output/panthers-capital/working_version.csv";

const COMMON_HEADERS: Record<string, string> = {
  accept: "application/json, text/plain, */*",
  "accept-language": "en-US,en;q=0.9,ru-UA;q=0.8,ru;q=0.7,uk-UA;q=0.6,uk;q=0.5",
  authorization: `Bearer ${AUTH_TOKEN}`,
  origin: "https://assessments.geniusee.com",
  priority: "u=1, i",
  referer: "https://assessments.geniusee.com/",
  "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
  "x-timezone-offset": "-180",
};

function parseCsv(content: string): Record<string, string>[] {
  const lines = content.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const parseRow = (line: string): string[] => {
    const cols: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        cols.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
    cols.push(current);
    return cols;
  };

  const headers = parseRow(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseRow(line);
    return Object.fromEntries(headers.map((h, i) => [h.trim(), (values[i] ?? "").trim()]));
  });
}

async function main() {
  const csvContent = readFileSync(CSV_PATH, "utf-8");
  const rows = parseCsv(csvContent);

  const noteMap = new Map<string, string>();
  const statusMap = new Map<string, string>();

  for (const row of rows) {
    const body = row["task_body"]?.trim();
    if (!body) continue;
    noteMap.set(body, row["notes"] ?? "");
    const impl = (row["is implemented"] ?? "").toLowerCase().trim();
    if (impl === "yes") statusMap.set(body, "Done");
    else if (impl === "no") statusMap.set(body, "Open");
  }

  console.log(`CSV loaded: ${rows.length} rows, ${noteMap.size} task_body entries`);

  const getRes = await fetch(`${API_BASE}/kick-offs-assessments/${ASSESSMENT_ID}`, {
    headers: COMMON_HEADERS,
  });
  if (!getRes.ok) {
    console.error(`GET failed: ${getRes.status} ${getRes.statusText}`);
    process.exit(1);
  }
  const data = (await getRes.json()) as {
    tasks?: Array<{
      id: string;
      required: boolean;
      implementationStatus: string | null;
      priority: string | null;
      note: string;
      score: number | null;
      templateTask?: { body?: string };
    }>;
    kickOffAssessmentTasks?: Array<{
      id: string;
      required: boolean;
      implementationStatus: string | null;
      priority: string | null;
      note: string;
      score: number | null;
      templateTask?: { body?: string };
    }>;
  };

  const apiTasks = data.tasks ?? data.kickOffAssessmentTasks ?? [];
  console.log(`API returned: ${apiTasks.length} tasks`);

  let matched = 0;
  let unmatched = 0;
  const preview: string[] = [];

  const updatedTasks = apiTasks.map((task) => {
    const taskBody = task.templateTask?.body ?? "";
    if (noteMap.has(taskBody)) {
      matched++;
      const newNote = noteMap.get(taskBody)!;
      const newStatus = statusMap.has(taskBody)
        ? statusMap.get(taskBody)!
        : task.implementationStatus;
      if (preview.length < 5) {
        preview.push(
          `  [${taskBody}] note: "${newNote}" | status: ${newStatus}`
        );
      }
      return {
        id: task.id,
        required: task.required,
        implementationStatus: newStatus,
        priority: task.priority,
        note: newNote,
        score: task.score,
      };
    } else {
      unmatched++;
      return {
        id: task.id,
        required: task.required,
        implementationStatus: task.implementationStatus,
        priority: task.priority,
        note: task.note,
        score: task.score,
      };
    }
  });

  console.log(`\nMatched: ${matched} | Unmatched: ${unmatched}`);
  console.log("Preview of first 5 changes:");
  preview.forEach((p) => console.log(p));

  const patchRes = await fetch(`${API_BASE}/kick-offs-assessments/${ASSESSMENT_ID}`, {
    method: "PATCH",
    headers: { ...COMMON_HEADERS, "content-type": "application/json" },
    body: JSON.stringify({ kickOffAssessmentTasks: updatedTasks }),
  });

  console.log(`\nPATCH response: ${patchRes.status} ${patchRes.statusText}`);
  if (!patchRes.ok) {
    const body = await patchRes.text();
    console.error("PATCH error body:", body);
    process.exit(1);
  }
  console.log("Dashboard updated successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
