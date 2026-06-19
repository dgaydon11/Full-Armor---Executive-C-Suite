# MORNING WAKEUP PROCEDURE
**Document ID:** CQO-SOP-01  
**Owner:** Chief Quality Officer (Veritas)  
**Status:** ACTIVE  

This document outlines the mandatory morning routine to re-establish workspace integrations, verify authorizations, sync state, and activate the Staff after a nightly system reset.

---

## SECTION 1: AUTHORIZATION RECOVERY
To handle daily IDE permission resets, the operator must grant access to the active project folders.
1. Immediately request the operator to authorize Read and Write permissions for:
   * `C:\Users\Don1\Desktop\Full-Armor---Executive-C-Suite`
   * `C:\Users\Don1\Desktop\Full-Armor---Vanguard`
   * `C:\Users\Don1\Desktop\Full-Armor---Titan`
   * `C:\Users\Don1\Desktop\Full-Armor---Noble`
   * `C:\Users\Don1\Desktop\Full Armor --- Sentinel`
   * `C:\Users\Don1\Desktop\full-armor-monitoring`
   * `C:\Users\Don1\Desktop\Full-Armor---HQ`

---

## SECTION 2: SERVICE & ACCOUNT AUTHENTICATION
External tokens expire during resets. Re-establish credentials using:
1. **Firebase**:
   * Execute: `firebase login --reauth`
   * Confirm the browser opens and the login completes successfully.
2. **Git Credentials**:
   * Verify access to remote repositories.
3. **Google Cloud Cost & Token Dashboard**:
   * Access and monitor live billing status: [Looker Studio Billing Dashboard](https://datastudio.google.com/reporting/914e4792-c483-423c-8965-d182452327d6/page/WKV1F/edit)


---

## SECTION 3: GIT OPERATIONAL RECOVERY & SYSTEM DIAGNOSTICS
Run the following diagnostics to check for uncommitted changes to staff personas, directives, and project files:
1. **Check Git Status**:
   ```powershell
   git status
   ```
2. **Retrieve Latest Commit History**:
   ```powershell
   git log -n 5 --oneline
   ```
3. **Verify Personas & Directives Health**:
   * Inspect modified files in the executive suite. Ensure no uncommitted local changes to persona files are lost or overwritten.

---

## SECTION 4: CONVERSATION RECOVERY (EOD REVIEW)
Restore the contextual state from the previous day:
1. Open and review the latest End of Day (EOD) summary file in `C-Suite_Logs/` (e.g., `C-Suite_Logs/YYYY-MM-DD_EOD.md`).
2. If no EOD summary is present, read the last 15 lines of the `walkthrough.md` or `task.md` of the previous session.

---

## SECTION 5: DAILY BRIEFING STATUS TABLE
Before starting daily tasks, the active agent must compile and output the following alignment checklist to the operator:

| Step | Check / Target | Status | Notes |
| :--- | :--- | :--- | :--- |
| **1** | IDE Folder Permissions | `[PASS / PENDING]` | |
| **2** | Firebase Auth Status | `[PASS / PENDING]` | Verify via `firebase projects:list` |
| **3** | Git Connectivity & Branch | `[PASS / PENDING]` | Active Branch: `xxxx` |
| **4** | Persona / Directive Sync | `[PASS / PENDING]` | Audit C-Suite files for local changes |
| **5** | EOD Context Restored | `[PASS / PENDING]` | Read last EOD report |
| **6** | Token & CAPA Audit | `[PASS / PENDING]` | Verify `Token_Governance.md` and check `yellow_light_capa_log.md` |
| **7** | Executive Staff Report-Outs | `[PASS / PENDING]` | Compile morning reports from each active department |

---

## SECTION 6: EXECUTIVE STAFF REPORT-OUT REQUIREMENTS
To ensure complete alignment and multi-disciplinary validation, the morning briefing must contain a concise report-out from each executive officer detailing their domain's status, recent changes, and outstanding directives:

1.  **CQO (Veritas) — Process & Quality Oversight:** State of quality gates, test suite runs (Playwright and R&D DSP math), Firestore/GCS rules compliance status, and any active CAPA items.
2.  **CTO — Systems & Technical Architecture:** Status of database collection schemas, API Gateway integrations, and system scalability reviews.
3.  **CISO — Information Security & Secret Isolation:** Security perimeter status (CSP headers, GCS CORS settings, App Check policies) and credential hygiene checks.
4.  **CSO — Acoustics & Audio Engineering:** Audio fingerprinting tools accuracy, watermarker configurations, and DSP catalog updates.
5.  **CLO — Legal Compliance & Governance:** Statutory copyright compliance, digital signatures notarization status, and licensing agreements checks.
6.  **CMO — Brand Guidelines & Presentation:** Brand guidelines adherence, interface copy status, and user-experience visual alignment.
7.  **CFO (Vance Ledger) — Operations & Token Budgeting:** Token daily spend updates, cost control gate alerts, and token budgeting compliance reports.

---

*By order of Veritas, Chief Quality Officer.*
