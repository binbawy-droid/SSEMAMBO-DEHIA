# BINBAWY TECH UG — Automation Email Templates

These are approved starting templates for future Gmail/Zapier workflow steps. Saving this file does not create a Zap, send an email, or authorise a contractor.

## 1. Client build brief received

**Trigger:** Only after the website confirms a successful insert into `public.binbawy_service_enquiries` for a signed-in customer.

**To:** `{{client_email}}`

**Subject:** We received your build brief — BINBAWY TECH UG

**Body:**

Hello {{client_name}},

Your build brief has been received by BINBAWY TECH UG.

**Request:** {{build_title}}  
**Category:** {{category}}  
**Target budget:** {{budget_usd_display}}  
**Target date:** {{target_date_display}}

Our team will review the requirements and prepare a technical assessment. If more information is needed, we will contact you through the email address on your account.

You can sign in to your private workspace to review project records, quotes and milestones once a project has been opened.

A submitted brief is not a contract, confirmed quotation, payment receipt or guaranteed delivery date. Work begins only after the scope, price, schedule and terms are agreed in writing.

Regards,  
Ssemambo Dehia  
Founder & Principal Architect  
BINBAWY TECH UG  
https://binbawy-tech-ug.vercel.app/

## 2. Founder lead alert

**Trigger:** Same confirmed build-brief insert. Send to the verified company mailbox configured in Gmail; do not hard-code an address in the workflow template.

**Subject:** New build enquiry — {{client_name}} ({{country}})

**Body:**

A new build enquiry was submitted through the BINBAWY TECH UG website.

- Client: {{client_name}}
- Email: {{client_email}}
- Company: {{company_name}}
- Country: {{country}}
- Industry: {{industry}}
- Category: {{category}}
- Budget (USD): {{budget_usd_display}}
- Target date: {{target_date_display}}
- Build title: {{build_title}}

**Brief**

{{problem_description}}

**AI triage summary**

{{ai_triage_summary}}

**Required next step:** Review the request, confirm missing details, and decide whether to open a project. Do not send a binding quote or publish a bounty automatically.

## 3. Contractor assignment — founder approved only

**Trigger:** Only after a founder records approval of the selected applicant, project scope, payout and delivery window. This workflow must not trigger merely because an application was submitted.

**To:** {{selected_builder_email}}

**Subject:** Project assignment proposal — {{job_title}} | BINBAWY TECH UG

**Body:**

Hello {{applicant_name}},

We would like to invite you to take on the following contract assignment:

**Project:** {{job_title}}  
**Approved payout:** {{payout_usd}} USD  
**Target delivery:** {{delivery_days}} days  
**Deliverables:** {{technical_subtasks}}  
**Acceptance criteria:** {{acceptance_criteria}}

Please reply to confirm your availability and acceptance of the written scope and contract terms before starting work.

Payment is subject to the agreed contract and completion of the stated acceptance and QA process. This email is not proof of escrow funding or a guarantee that funds have been deposited.

Regards,  
Talent & Delivery Team  
BINBAWY TECH UG

## Workflow safety rules

1. A client acknowledgement is sent only after the database insert succeeds.
2. A founder alert may be automatic, but it must not include passwords, payment credentials or unnecessary sensitive information.
3. AI-generated scope and pricing remain drafts until a founder approves them.
4. Job applicants are not selected automatically. Contractor dispatch requires an explicit founder approval record.
5. Do not state that escrow, a deposit, a payment or a payout exists unless the connected payment provider confirms it.
6. Store provider message IDs and workflow execution IDs for auditability.
7. Use the Supabase project tables and authenticated user IDs as the source of truth; do not use an unverified `no-cors` browser webhook as a successful-submission signal.

**Current status:** Templates documented only. Gmail/Zapier trigger and action steps still need to be created and tested before these messages are sent automatically.
