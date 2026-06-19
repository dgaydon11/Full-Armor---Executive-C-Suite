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
| **8** | SPC Metric Deck | `[PASS / PENDING]` | Verify metrics match green thresholds |

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

## SECTION 7: STATISTICAL PROCESS CONTROL (SPC) METRICS & THRESHOLDS
Every morning report must evaluate and display the control light status (🟢/🟡/🔴) for each executive's core operational metrics:

### 1. CQO (Veritas) — Test Suite Pass Rate
*   **Metric:** Percentage of successful E2E Playwright tests and core R&D DSP math verification tests.
*   **🟢 GREEN:** 100% test pass rate.
*   **🟡 YELLOW:** 90% – 99% test pass rate.
*   **🔴 RED:** < 90% test pass rate OR any compiler crash.

### 2. CTO — API Response Latency
*   **Metric:** API Gateway route loading latency and endpoint error rate.
*   **🟢 GREEN:** Latency < 200ms AND Error rate < 1%.
*   **🟡 YELLOW:** Latency 200ms – 500ms OR Error rate 1% – 5%.
*   **🔴 RED:** Latency > 500ms OR Error rate > 5%.

### 3. CISO — Perimeter Security Compliance
*   **Metric:** Blocked unauthorized access logs and CORS/CSP compliance count.
*   **🟢 GREEN:** 0 unauthorized access attempts AND 100% CSP/CORS compliance.
*   **🟡 YELLOW:** 1 – 5 blocked attempts OR minor CSP configuration mismatch.
*   **🔴 RED:** > 5 blocked attempts OR any leaked credential / major CSP block.

### 4. CSO — DSP Peak Constellation Hashing Density
*   **Metric:** Average number of generated constellation pairs per 2.0-second audio track.
*   **🟢 GREEN:** 30 – 150 pairs (valid, robust fingerprint profile).
*   **🟡 YELLOW:** 10 – 29 pairs OR 151 – 200 pairs.
*   **🔴 RED:** < 10 pairs (insufficient keys) OR > 200 pairs (extreme noise/overhead).

### 5. CLO — Signed URL Expiration Duration
*   **Metric:** Configuration setting check of the maximum time-to-live (TTL) for temporary stem downloads.
*   **🟢 GREEN:** Maximum TTL is exactly 15 minutes.
*   **🟡 YELLOW:** Maximum TTL set between 15 and 30 minutes.
*   **🔴 RED:** Maximum TTL > 30 minutes.

### 6. CMO — Visual Presentation & Branding Adherence
*   **Metric:** Rendering alignment check of visual banners and brand interface controls.
*   **🟢 GREEN:** 100% compliance with corporate brand assets and fallback layouts.
*   **🟡 YELLOW:** Minor stylesheet fallback engaged or CSS layout shifts detected.
*   **🔴 RED:** Core branding asset missing OR layout is broken/unreadable.

### 7. CFO (Vance Ledger) — Daily Token Spend Ratio
*   **Metric:** Incremental cost accumulation compared to the daily limit of $5.00.
*   **🟢 GREEN:** Total spend is < 80% of limit ($0.00 – $4.00).
*   **🟡 YELLOW:** Total spend is 80% – 100% of limit ($4.00 – $5.00).
*   **🔴 RED:** Total spend is $\ge$ 100% of limit ($5.00+).

---

*By order of Veritas, Chief Quality Officer.*
