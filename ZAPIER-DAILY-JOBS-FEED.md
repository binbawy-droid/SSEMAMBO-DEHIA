# BINBAWY TECH UG — Daily Remote Jobs Feed (Zapier Build Specification)

**Owner:** Ssemambo Dehia  
**Website:** https://binbawy-tech-ug.vercel.app/jobs.html  
**Status:** Specification only. This document does not create or activate a Zap.

## Objective

Collect fresh remote technology and AI vacancies from public RSS feeds, validate each listing, and publish a clean feed for the BINBAWY TECH UG jobs page. Do not claim a job is worldwide unless the source explicitly confirms worldwide or location-independent eligibility.

## Recommended Zap

### 1. Trigger — RSS by Zapier

Use **New Items in Multiple Feeds** with:

- https://weworkremotely.com/remote-jobs.rss
- https://remotive.com/remote-jobs/feed

If the RSS trigger does not accept both feeds reliably, create one trigger per feed and send both into the same downstream processing steps.

### 2. Filter — quality and eligibility

Continue only when the item has a valid title, publisher/company (if supplied), source URL and description.

Use relevant terms such as AI, machine learning, software, developer, engineering, automation, design, video editing, support, data, product or writing as discovery signals. These terms are not proof of job eligibility.

Set an eligibility label using source evidence only:

- **Worldwide:** source explicitly says worldwide / anywhere / globally open.
- **Remote — country limits apply:** source says remote but names eligible countries or regions.
- **Eligibility unclear:** source does not establish where applicants may live.

Do not discard a legitimate remote role solely because it does not contain the word “Worldwide”. Do not rewrite “Remote” as “Worldwide”.

### 3. AI curation — ChatGPT / OpenAI

Prompt:

> You are the listing editor for BINBAWY TECH UG, curated by Ssemambo Dehia. Transform the supplied RSS item into a concise, factual job card. Use only facts in the source. Return valid JSON with: title, company, eligibility_label, eligible_locations, summary (two sentences maximum), employment_type, compensation (or “Not stated”), published_at, source_name, source_url. If the company, pay, employment type or location eligibility is absent, use “Not stated” or “Eligibility unclear”. Never invent a salary, employer, closing date, application requirements or worldwide eligibility. Preserve the original application URL. Reject spam, expired listings where expiry is explicit, duplicate source URLs, recruitment-fee schemes, and listings that do not describe a real role.

### 4. Deduplicate

Use the canonical source URL as the deduplication key. If a record with that URL already exists, update it only when the source has materially changed; otherwise skip it.

### 5. Publish

The current jobs page reads curated feed cards from:

`/data/remote-jobs.json`

The file is currently an empty JSON array until a feed publisher writes records. The Zap must publish a valid JSON array in the format:

```json
[
  {
    "title": "Example role title",
    "company": "Example company",
    "eligibility_label": "Remote — country limits apply",
    "summary": "Factual summary from the source listing.",
    "published": "2026-11-26",
    "url": "https://example.com/apply"
  }
]
```

**Important:** A normal Zapier RSS workflow cannot write directly to a GitHub repository file unless a GitHub action or authenticated webhook step is configured. Choose one supported publisher:

- GitHub: update `data/remote-jobs.json` in `binbawy-droid/SSEMAMBO-DEHIA` on `main` using a connected GitHub action; or
- A small authenticated feed endpoint/storage service, then change `jobs.html` to read from that endpoint.

Do not expose a GitHub token, Supabase service-role key or other secret in browser JavaScript, public HTML, or this document.

### 6. Optional Telegram digest

Only after the website publication succeeds, send a compact alert to the Telegram channel explicitly selected by the owner. Include title, company, eligibility label and original source link. Do not send to an unspecified channel or subscriber list.

### 7. Schedule and monitoring

- Run a scheduled daily feed refresh in the owner's chosen timezone.
- Keep the latest 24–50 valid listings; remove duplicates by canonical source URL.
- Log trigger, rejected items, duplicates, successful publications and failures.
- On publisher failure, alert the owner and do not claim the website feed was updated.
- Re-check original links before publication where feasible.

## Acceptance tests

1. A role explicitly limited to the United States is labelled country-restricted, not worldwide.
2. A listing with no location evidence is labelled eligibility unclear.
3. A duplicate source URL is not published twice.
4. A malformed or non-HTTPS application URL is rejected.
5. A failed GitHub/API write does not trigger a “published” Telegram message.
6. The public jobs page renders only escaped text and links to the original source.

## Current implementation boundary

The public page already renders `/data/remote-jobs.json` and separately loads agency-published roles from Supabase `binbawy_jobs`. The contractor registration form is already connected to `binbawy_contractor_profiles` with authenticated self-registration and admin review policies. No Zapier RSS automation, GitHub publisher, or Telegram broadcast is activated by saving this specification.
