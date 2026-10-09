# CAPA Report: CAPA Ticket System Backlog Review
**Document ID:** CQO-CAPA-1008  
**Date:** October 8, 2026  
**Pillar Affected:** CQO / Quality Management System (CAPA)  
**Status:** `OPEN`  
**Active Officer:** Chief Quality Officer (Veritas / Rita)  
**Collaborating Officer:** HQ (Global Coordinator)

---

## 1. Task Description
Conduct a full review of **every ticket in the local QA Corrective Action (CAPA) system — open and closed, without exception**. For each ticket, verify that its status, owner, root cause, corrective action, and sign-offs are accurate and current, and reconcile any drift between individual CAPA report files (`capa_*.md`) and the master CAPA Log (`yellow_light_capa_log.md`).

---

## 2. Scope
*   All individual CAPA report files (`capa_*.md`) in this directory.
*   All rows in the master CAPA Log (`yellow_light_capa_log.md`).
*   Confirm each log row maps to a report (and vice-versa); flag orphans and duplicates.

---

## 3. Current Inventory (starting point)
**CAPA Log rows (4):**

| # | Date / Time | Pillar | Flagged Item | Report File | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 2026-06-19 14:50 | Vanguard | Unauthorized script blocked by CSP | *(log-only)* | Closed |
| 2 | 2026-06-20 21:31 | Vanguard | `auth/internal-error` & redirect loop | `capa_0620_vanguard_auth_loop.md` | **Open** |
| 3 | 2026-06-21 07:00 | Finance | Simulated token spend budget warning | *(log-only)* | Closed |
| 4 | 2026-06-23 09:19 | R&D / Comm | Sentry mic silent transcription | `capa_0623_sentry_mic_failure.md` | Closed |

**Known drift to reconcile:**
*   Ticket #2 (`CQO-CAPA-0620`) is still `UNDER INVESTIGATION` / Open since June 20 — confirm it is genuinely still open and re-assign a current next step, or close it with a documented resolution.
*   Tickets #1 and #3 are log-only; decide whether they require standalone report files or are adequately captured by the log row.

---

## 4. Action Plan / Checklist
*   [ ] Enumerate every CAPA ticket file (open + closed).
*   [ ] Cross-check each ticket against its CAPA Log row.
*   [ ] Reconcile status drift (report vs. log).
*   [ ] Flag stale, unowned, or duplicate items.
*   [ ] Confirm each closed ticket has a documented resolution and required sign-offs.
*   [ ] Confirm each open ticket has a current owner and a next action.
*   [ ] Report findings to the Operator.

---

## 5. Deliverable
*   A reconciled view of all CAPA tickets with corrected statuses.
*   A short findings note covering any drift, missing sign-offs, or stale items.
*   Recommended corrections (for Operator approval) — **no existing ticket is to be edited until approved.**

---

## 6. Sign-offs
*   *CQO (Veritas) Sign-off:* `PENDING`
*   *Operator (Donald) Sign-off:* `PENDING`

---

*Opened by order of the Operator. Review all tickets — complete or not.*
