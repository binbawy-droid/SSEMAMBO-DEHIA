# Remote jobs daily automation

## Already implemented on the website
The repository includes a GitHub Actions workflow that reads We Work Remotely's public RSS feed once daily at 05:30 UTC and updates `data/remote-jobs.json`. The public jobs page reads that JSON file and links each visitor to the original listing. This is the website refresh workflow; it does not require Zapier.

Official RSS source: https://weworkremotely.com/remote-jobs.rss  
Publisher attribution: We Work Remotely. Keep each original job URL and do not republish full job descriptions.

## Optional Zapier RSS-to-Telegram alert prompt

Copy this prompt into your Zapier AI workflow builder after connecting the RSS app and the Telegram app/bot:

> Create a daily remote-jobs alert workflow for BINBAWY TECH UG.
>
> Trigger: use the official We Work Remotely RSS feed at https://weworkremotely.com/remote-jobs.rss and check for newly published items. Process only new items since the previous successful run.
>
> Filter: keep roles related to software engineering, AI/ML, data annotation, product, design, DevOps, marketing, or technical support. Do not claim that a role is available in Uganda unless the original listing explicitly confirms it. Do not invent salary, location, eligibility, or deadlines.
>
> Format each alert with the job title, company (if present), published date, a one-sentence summary derived from the feed, and the original application URL. Add the attribution: "Source: We Work Remotely".
>
> Destination: send to the Telegram destination explicitly selected by the account owner. Do not guess a channel, chat ID, or recipient. If no destination is connected, stop and ask the owner to connect/select one.
>
> Frequency: run once daily and batch new roles into one concise digest. If there are no new matching roles, send no message.
>
> Safety: never apply to jobs, submit personal data, pay fees, message employers, or claim that BINBAWY TECH UG has verified an employer. Link applicants to the original posting and remind them to check location eligibility and payment terms.
>
> Before activating, show the trigger, filter, schedule and selected Telegram destination for review.

## Current limitations
- This document is a setup prompt, not an active Zap.
- No Telegram channel or bot destination has been selected in this workflow.
- External job boards control their own listings, eligibility, payment methods and availability.
