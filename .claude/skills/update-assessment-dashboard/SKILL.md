---
name: update-assessment-dashboard
description: "Use when updating assessment dashboard"
---

# Update assessment dashboard

Update kick-off assessment tasks via API using data from a CSV file

## When This Activates

When updating assessment dashboard.

## API Details

1. **GET** the current assessment:
   curl 'https://api.assessments.geniusee.com/prod/api/v1/kick-offs-assessments/d01fc1fe-c06e-4000-a90a-aa079308f920' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-US,en;q=0.9,ru-UA;q=0.8,ru;q=0.7,uk-UA;q=0.6,uk;q=0.5' \
  -H 'authorization: Bearer bearer_token' \
  -H 'if-none-match: W/"2910b-nB0ZQGUp6s+mHQm4OBccS5u8tJw"' \
  -H 'origin: https://assessments.geniusee.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://assessments.geniusee.com/' \
  -H 'sec-ch-ua: "Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36' \
  -H 'x-timezone-offset: -180'

2. **PATCH** to update tasks:
   curl 'https://api.assessments.geniusee.com/prod/api/v1/kick-offs-assessments/d01fc1fe-c06e-4000-a90a-aa079308f920' \
  -X 'PATCH' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-US,en;q=0.9,ru-UA;q=0.8,ru;q=0.7,uk-UA;q=0.6,uk;q=0.5' \
  -H 'authorization: Bearer bearer_token' \
  -H 'content-type: application/json' \
  -H 'origin: https://assessments.geniusee.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://assessments.geniusee.com/' \
  -H 'sec-ch-ua: "Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36' \
  -H 'x-timezone-offset: -180' \
  --data-raw '{"kickOffAssessmentTasks":[{"id":"b553b7d4-2c5c-4a41-bbc7-8338ffcad8cf","required":true,"implementationStatus":null,"priority":null,"note":"test","score":null},{"id":"495a737c-eef9-4588-a1c2-94769f5a55d4","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"97337dfb-3bed-41c7-9a3b-1be4e4928a62","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"1a665785-3499-4a75-b2db-c0f1b16050eb","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"906f6537-e789-43de-abc5-c01d1502d8ff","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"7b24dfd2-bc39-4e37-97d4-e091ee3e6b0b","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"622947dd-1af4-4bae-8506-35fc628f2f66","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"3ade973f-1edb-4251-af61-3e8613d35236","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"db626537-dc35-423c-b80f-3370a54c8a3e","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"3cf53db4-4026-4b79-9810-3c6533050e45","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"e2cb2bfe-6462-4652-9e63-f41476b7dd1c","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"15dd3fa1-f720-4e4d-85ed-56cb3163a2b1","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"a5dfbdc3-3edf-4fdb-aed9-3608c72d0689","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"9c6da7d7-c5d3-4e64-8fe5-de29ec21b95f","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"4270da3b-a4df-40fb-9a67-137e19347f02","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"34799b5c-4ac4-48d8-b22d-6c0f64db57f5","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"9469a298-eab7-4bf5-ac14-29654407c002","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"22c1b2a7-056b-472b-8694-e20151e3ea5f","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"027d9c8f-fe90-4f81-9966-67c1341912f0","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"c7689fc6-6a10-4218-b030-f4da31ddcf01","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"5f3148f0-ab57-4add-87ed-6f741c0a5b65","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"f5168cbc-2360-4fc8-99ca-e99583fc358c","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"6c85fa60-cc9b-495f-bdd5-70c2527feff0","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"8a5b777f-e4b1-4056-a269-b3f468aa67fd","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"6def4275-9c0e-4c2d-9b47-de319c13942d","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"39efb239-6a25-4e49-be43-ee787810e0ae","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"c28e2fe2-c9b2-4e62-aa76-51e91691bac4","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"62e0ebc7-a552-4a51-905b-d73d67976900","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"a1149cfe-97cb-4eba-899a-1b9ad6c53ad8","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"bf8a5fbf-2cbf-4937-b28f-6f795e72f1b6","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"9f2cb212-1a13-4f78-b3f9-254335fbadf2","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"54ad6417-05ca-4322-b5d2-ec18e76fd0b5","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"5dc46fb8-01d3-4163-a8ba-c9648f6ef74e","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"a28b1ddf-e2d7-43ea-9857-85f8dc46a5b6","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"8361d302-719b-4de8-b143-86273985e72e","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"355fa742-cade-41c6-9363-882662090077","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"0e07a8a1-4dbd-4cd1-b547-6d9f8cabd653","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"339b5691-06ce-45ef-b49e-1cceb8c767b0","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"fc4ecb01-cc5a-4f1f-9527-05be8230be6c","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"ce9229c0-5256-4131-9de8-c3b5efb430c3","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"b592ee19-9f40-49ac-a65c-d00516aacb87","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"1b228ff8-8f6c-4dec-a946-3e5a1ff52cd9","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"dc22fc5a-8577-45eb-940a-e3407c4df0ce","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"d9a4b502-b085-4a94-b1ef-e420190eea7c","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"6c028374-0cda-4156-9074-efdaef7d25e1","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"63be7752-b449-4d35-a809-7497068d9a79","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"acb4fe08-fa60-4fe1-ac33-3eac26943d26","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"4d6127c3-49cd-4ab3-8dab-5635372f3087","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"4fe2117b-9bf2-43c3-9dcd-17789421f38b","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"169ad383-43b2-4dd6-8df2-fe66b28b9d38","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"0aa578eb-b7fa-4aa1-9158-884a589ad7a6","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"b74e196f-c805-4ecc-9a45-b2dbee6542ef","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"766dd227-52a0-4108-9975-6c656000ecde","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"acd34392-6ba5-4015-bb9d-1e28c6325538","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"94be6d7b-5477-46d1-84b5-f755eb8fcc71","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"fd8faf9f-794f-4ec4-824d-1b41e2ff9148","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"fc425919-3197-45ba-9ccf-0548738d73d0","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"b2e751b0-4dd6-4ca3-87da-9e0316bd913c","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"1a00769d-dec9-465f-a412-9a2101458976","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"f6153066-fc95-464f-b584-82d6ba216978","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"bc755b55-666c-4024-9d1b-0e189e356634","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"5cfbbc92-b634-4ff0-aef9-05c9968abee7","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"c6604d4a-cb47-4dac-9deb-0530f74c784c","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"93f0b9cd-9499-4425-84c4-69eea2c0a99c","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"87612cfc-c970-42e2-9e3a-93dde62f1222","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"e7a1ebcd-6b40-4fda-a26c-2e7ddca2cffd","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"20ad6f5d-fd67-4d5f-93e9-6212067a6eca","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"a6f94e06-3a1b-4a0f-b8ee-ae21a8229579","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"fb035f86-f0ae-47d2-9f99-6ae5bd2f3ea7","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"52e02ce7-57a5-426f-9183-72c2b51cb3b4","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"e6284353-b179-47f1-9ba7-a08b9b05acfc","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"b2202103-1572-47dc-b0ba-0e79c44bc4d9","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"054a81d1-8d9b-4df1-9321-797f2a221581","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"26f23cf7-4b8b-4b51-a095-47823aece158","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"aee9db53-c4ee-452f-b03c-eb2e5fe93779","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"6a3f5c1d-5a18-432f-b300-a7be11dc6613","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"24812ca9-8dbf-4f9f-a067-e24365cb9f2e","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"29fef934-b310-4b77-925d-45a1ab9a618d","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"7bc1dc20-c72a-499a-b0d2-58d501d425ed","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"f26faf77-f7c6-403a-9323-5c073b387d1a","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"d6ae3b2a-5bb7-4461-8be4-b3c5f5801887","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"b4bd2178-f23b-41bb-9fc7-55e2343e737b","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"6900ef35-ab78-4ed9-954d-f690d9b2089e","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"e7a94f82-c1ec-4a30-81e1-a16a6c075440","required":true,"implementationStatus":null,"priority":null,"note":"","score":null},{"id":"84a68d2a-5d43-4dfe-a13d-6131e1096922","required":true,"implementationStatus":null,"priority":null,"note":"","score":null}]}'

## CSV File

The CSV file is `./output/<project>/working_version.csv`. It has these columns:
- `task_body` — the task name (used to match against the API's `templateTask.body`)
- `notes` — the value to write into each task's `note` field
- `is implemented` — maps to `implementationStatus`: "yes" → "Done", "no" → "Open", anything else (n/a, partial) → keep the existing API value unchanged

## What to do

### Before continuing

Ask the user for `ASSESSMENT_ID` and `AUTH_TOKEN`. Do not read the CSV, write `update-notes.ts`, or call the API until both values are provided. Put those values in the script constants. Ignore the sample assessment id and `bearer_token` in the curl examples above.

### Before running

Ask the user for permission to run the script, and show the `ASSESSMENT_ID` that will be updated. Ask them to confirm it is the right assessment. Run `npx tsx update-notes.ts` from the repository root only after they agree to run it and confirm that id. If they decline or say the id is wrong, stop without running it. After a successful run, report the logged matched/unmatched/skipped-Done counts and the PATCH response status.

Create a standalone TypeScript script (`update-notes.ts`, run with `npx tsx`) that:

1. Reads the CSV and builds two maps keyed by `task_body`:
   - `task_body → notes`
   - `task_body → implementationStatus` (only "yes"/"no" map to "Done"/"Open"; skip others)
2. GETs the current assessment from the API
3. Writes `./output/<project>/config.csv` from that GET when the file does not already exist. The file has a header row `assessmentScore,bestPracticeScore` and one data row with those two fields. Leave an existing `config.csv` unchanged so later runs keep the original baseline. Never write post-PATCH scores into `config.csv`.
4. Matches each API task to CSV by comparing `templateTask.body` === `task_body`
5. Builds the PATCH payload preserving existing fields (`id`, `required`, `priority`, `score`) from the GET response. If the existing task `implementationStatus` is `Done`, leave `note` and `implementationStatus` unchanged. Otherwise replace `note` from the CSV and set `implementationStatus` from the CSV mapping (`yes` → `Done`, `no` → `Open`; `partial` / `n/a` keep the existing status). Every task is still included in the payload.
6. Sends the PATCH request with `{ kickOffAssessmentTasks: [...] }`
7. Logs to stdout: total matched/unmatched/skipped-Done, a preview of the first 5 tasks that actually change (exclude skipped Done tasks), and the PATCH response status.
8. When the PATCH succeeds, GETs the assessment again and reads the new `assessmentScore` and `bestPracticeScore`. When the PATCH fails, skip this GET.
9. Writes `./output/<project>/changes.md` once, after step 8, or after the failed PATCH when step 8 is skipped. Do not write this file earlier, and do not append a second time. The file contains:
   - matched, unmatched, and skipped-Done counts
   - every task whose note or status actually changes
   - the PATCH response status
   - `assessmentScore` and `bestPracticeScore` as old → new. Old values come from `./output/<project>/config.csv`. New values come from the second GET. On PATCH failure, include the PATCH status and omit the new scores.

Use Node built-in `fetch` and a simple inline CSV parser (no external deps). Set `ASSESSMENT_ID` and `AUTH_TOKEN` from the values the user provided. Extract other custom headers as constants at the top.
