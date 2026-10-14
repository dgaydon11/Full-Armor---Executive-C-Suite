# FULL ARMOR STUDIOS - MASTER WHITEBOARD
**Document ID:** CQO-WHITEBOARD  
**Owner:** Human Operator  
**Last Updated:** 2026-10-13  

This file serves as the master repository for brainstorming, system ideas, and future features. All automated tickets for Titan, Noble, Vanguard, Sentinel, and R&D will be derived from the ideas logged here.

---

## 💡 ACTIVE IDEAS & BACKLOG

*   **Review ALL CAPA Tickets (Open & Closed) (Ticket: CQO-CAPA-1008)**
    *   *Pillar:* CQO / Quality Management System
    *   *Status:* Pending
    *   *Concept:* Full review of every ticket in the local QA Corrective Action (CAPA) system — reconcile status drift between the `capa_*.md` reports and `yellow_light_capa_log.md`, re-assess the open Vanguard auth loop (CQO-CAPA-0620), and flag stale or unowned items.

*   **Reaper DAW Automation & Lossless Compliance Pipeline (Ecosystem)**
    *   *Pillar:* R&D / Audio
    *   *Status:* Proposed/Planned
    *   *Concept:* Automate track stem exports in Reaper as uncompressed WAV files, perform quality and compliance audits (sample rate, bit depth, headroom) using a folder watcher, and auto-upload stems to Firebase Storage.

*   **[Voice Feedback] Test Page (Ticket: LxpWcrqA2nLFg4y2Osri)**
    *   *Pillar:* Voice Feedback
    *   *Status:* Pending
    *   *Concept:* Welcome to Full Armor.

*   **Implement Floating Voice Feedback Widget (Ecosystem)**
    *   *Pillar:* Executive C-Suite / Design / R&D
    *   *Status:* Proposed/Planned
    *   *Concept:* Build a global floating microphone button present on all portal pages. Records user feedback using the Web Audio API, auto-transcribes the audio via Gemini, and registers a ticket directly in our Firestore ticketing database.

*   **Sentry Cellular Bridge (R&D)**
    *   *Pillar:* R&D / Security
    *   *Status:* Proposed/Planned (Ready for Morning Staff Review)
    *   *Concept:* Create a secondary cellular-based communication relay app client that queries cellular network metadata (MCC, MNC, LAC, CID, Signal Strength) using the Android TelephonyManager and sends this telemetry alongside voice commands.

*   **Acoustic Fingerprinting Tool (Phase 2)**
    *   *Pillar:* R&D
    *   *Status:* Proposed/Planned
    *   *Concept:* Build zero-dependency JS utility (`analyzer.js`, `hasher.js`, `signature.js`, `matcher.js`) to extract constellation peaks from 11025Hz mono WAV audio stems.

*   **Token Budgeting & Model Routing Architecture**
    *   *Pillar:* Executive C-Suite
    *   *Status:* Proposed/Planned
    *   *Concept:* Integrate Green/Yellow/Red traffic-light controls and 3-try loop ceiling to restrict standard code generation to the Flash model tier.

*   **Implement 3D Vocalist Stage Avatar Experience (Titan)**
    *   *Pillar:* Titan
    *   *Status:* Proposed/Planned
    *   *Concept:* Plan and design a 3D stage experience inside the Titan Vault. Let users configure/dress an avatar representing the song's creator, animate the avatar walking onto a virtual stage with a band in the background, and transition the camera perspective to a first-person view of the cheering crowd.

*   **Audit Top 10 Bot Vulnerabilities (Sentinel/Ecosystem)**
    *   *Pillar:* Sentinel / CISO
    *   *Status:* Proposed/Planned
    *   *Concept:* Conduct a security threat audit comparing our active web systems against the Top 10 web vulnerabilities exploited by bot attacks, identifying potential exposure points and drafting mitigation strategies (such as rate limits and App Check integration).

*   **Design 'Guardian Shield' Marketing Campaign for DAW Creators (CMO)**
    *   *Pillar:* Marketing / CMO
    *   *Status:* Proposed/Planned
    *   *Concept:* Develop promotional copy and landing page layouts targeting home DAW producers. Highlight our unique combination of 3D visualizers, automated digital signature notarization, active web crawling detection, and automated government copyright filing (emphasizing the $150,000 statutory damages protection).

*   **Vanguard Experience Verification System (HIGH PRIORITY)**
    *   *Pillar:* Vanguard
    *   *Status:* Proposed/Planned - High Priority
    *   *Concept:* Replace the current symbolic "I Agree" voice capture in the Vanguard gateway (`index.html`) with a proper experience verification system.
    *   *Required Implementation:*
      *   Replace the two-step "I Agree" mic flow with a structured experience questionnaire (prompt: "Tell us about your DAW experience — which DAWs have you used, how long, and on what projects?")
      *   Capture spoken response via Web Audio API with start/stop controls and audio preview
      *   Validate minimum requirements (must mention at least one recognized DAW: Pro Tools, Logic Pro, Ableton Live, Studio One, Reaper, Cubase, FL Studio, Nuendo, etc.)
      *   Implement automatic keyword-based evaluation with configurable threshold; route to "pending review" if inconclusive
      *   Store audio at `vanguard_verifications/{uid}/experience.wav` and metadata/transcript in Firestore at `vanguard_experience_verifications/{uid}` (status: pending/approved/rejected, reason, timestamps, evaluator)
      *   Gate redirect to `vanguard_terminal.html` — only allow if approved (or mission already accepted); show pending/rejected states in UI
      *   Update `platform_configuration/vanguard_gateway` copy for new prompts/instructions
      *   Add optional Cloud Function for speech-to-text + scoring (Gemini/Whisper) behind feature flag
      *   Preserve existing SSO/auth flow and mission bypass logic

---



## 🚧 LOOSE ENDS & OPERATIONAL STATE
*As of 2026-10-08 EOD. Captured so tomorrow's session resumes cleanly — these are discovered defects / pending state, NOT yet ticketed in the CAPA system (triage → CQO-CAPA when resumed).*

*   **Cairn Voice Bridge — Health Watch (monitor for a few days).**
    *   *Pillar:* HQ / Voice Bridge
    *   *Status:* Monitoring — started 2026-10-13
    *   *Reference:* `Full-Armor---HQ\CELL PHONE COMM BRIDGE (Cairn Voice)\CAIRN_VOICE_BRIDGE.md`
    *   *Detail:* After repointing the phone bridge to local Ollama (`qwen2.5-coder:14b-instruct`), watch stability over the next few days. Once daily, run the health check and a live test; confirm the relay + OpenCode server are up with no quota / `RESOURCE_EXHAUSTED` errors. Log one row per day in the check log.
    *   *Daily checks:*
      *   Health — `Invoke-RestMethod http://127.0.0.1:8787/api/health` → expect `provider: ollama`, `model: qwen2.5-coder:14b-instruct`, relay + opencode up.
      *   Live — POST `/api/message` (see the reference doc's "Live test message" block) → expect a correct **Cairn**-persona reply, no 429.
    *   *Check log:*
      | Date | Relay | OpenCode | Live test | Notes |
      | --- | --- | --- | --- | --- |
      | 2026-10-13 | up | up | pass (warm ~1.2s) | Initial switch to Ollama verified |

*   **Full-Armor Folder-Root Path Defects (SOP-01 & inbox).**
    *   *Pillar:* HQ / CQO
    *   *Status:* Open
    *   *Detail:* `morning_wakeup_procedure.md` lists dirs under `...\Desktop\Full-Armor---X`, but they actually live under `...\Desktop\full-armor-personal-project\Full-Armor---X`; `Full-Armor---Rnd-Lab` should be `Full-Armor---R&D-Lab (3D stage avatar)`. Fix these references so wakeup + inbox routing is correct.

*   **`sentry_bridge.js` Mirrors to a Stale Whiteboard Path.**
    *   *Pillar:* HQ / Sentinel
    *   *Status:* Open
    *   *Detail:* ~line 669 uses a mirror path missing the `full-armor-personal-project\` root (the mirror step would fail); the bridge also references a nonexistent `task_queue.js`.

*   **Firestore `tickets` Rule Missing.**
    *   *Pillar:* CISO / Vanguard
    *   *Status:* Open (prerequisite for the floating voice-feedback widget)
    *   *Detail:* `Full-Armor---HQ\firestore.rules` has no rule for the `tickets` collection written by the voice-feedback widget. Add before that feature goes live.

*   **Leftover File Decision: `titan_Portal_2\Carolina Dreamin V3 Save.mp3`.**
    *   *Pillar:* Titan / CSO
    *   *Status:* Pending decision
    *   *Detail:* 7 MB file predating the WAV uploads. Confirm whether to keep, rename, or remove.

*   **Morning Routine — Register the new `/good-morning` command & Veritas agent.**
    *   *Pillar:* HQ / CQO
    *   *Status:* Pending restart
    *   *Detail:* The global command (`~/.config/opencode/command/good-morning.md`) and the project agent `.opencode\agent\cqo.md` (Veritas) load only after an opencode restart. Until then, trigger the routine by saying "Good morning staff." After restart: press `Tab` → Veritas, then `/good-morning`.

---


## 📌 ARCHIVED / COMPLETED IDEAS

*   **Personal Calendar (Local GUI + Data)**
    *   *Pillar:* HQ / Personal Ops
    *   *Status:* Completed (2026-10-13)
    *   *Concept:* Local Tkinter month-grid calendar (`Full-Armor---HQ\local_calendar.py`) with a US-holiday overlay (via the `holidays` package, preloaded ±5/10 years) and click-to-add events persisted to `local_calendar_data.json`. Delivered with `start_calendar.ps1` (runs the HQ `.venv` pythonw), a Desktop shortcut "Full Armor Calendar", and a global `/calendar` opencode command. Verified running.

*   **Cairn Voice Bridge — Repointed to Local Ollama (Quota-Free)**
    *   *Pillar:* HQ / Voice Bridge
    *   *Status:* Completed (2026-10-13) — under multi-day monitoring
    *   *Concept:* The phone voice bridge was failing with Google Gemini free-tier `429 RESOURCE_EXHAUSTED` (250 req/day per model). Repointed the relay to `provider: ollama`, `model: qwen2.5-coder:14b-instruct` and added an `ollama` provider (6 local models) to `~/.config/opencode/opencode.jsonc`. Cleared a stale OpenCode server holding port 4096. Verified end-to-end: relay (8787) → OpenCode server (4096) → local Ollama (11434), correct Cairn persona, ~1.2s warm, no quota. Documented in `...\CELL PHONE COMM BRIDGE (Cairn Voice)\CAIRN_VOICE_BRIDGE.md` (linked from all agent/persona files); daily health watch tracked in LOOSE ENDS.

*   **Personal Daily Briefing**
    *   *Pillar:* HQ / Personal Ops
    *   *Status:* Completed (2026-10-13)
    *   *Concept:* `Full-Armor---HQ\Personal_Briefing.py` generates `Personal_Briefing.md` containing, in order: today's calendar events (read from `local_calendar_data.json`), a rental-property reminder, Hesperia/Chino weather (wttr.in), the Hesperia→Chino commute (OSRM), US + World headlines (Google News RSS), and upcoming SpaceX Starship status (The Space Devs API). Verified live end-to-end.

*   **Transitioning the Executive Staff into the opencode Environment**
    *   *Pillar:* Executive C-Suite / HQ
    *   *Status:* Resolved (2026-10-11) — Final scope: **CQO/Veritas only**
    *   *Outcome:* The only Executive Staff member to live natively in opencode is the **CQO (Veritas)**; **Cairn (CCO)** is already opencode-native. All other staff (remaining Chiefs, HQ Manager/Script Writer, Pillar bots) remain in Open Web UI and will **not** be migrated. The earlier "full 7-Chief + HQ + Pillars" mapping is therefore moot.
    *   *Delivered (2026-10-11):* Project agent `.opencode\agent\cqo.md` (`mode: primary`, `permission: { edit: deny, bash: ask }`) that reads `cqo_persona.md` + `staff_activation_control.md` at startup — the persona file stays the single source of truth, no persona text copied. Wired the global `/good-morning` command to it via `agent: cqo`. Takes effect on the next opencode restart.
    *   *Retained Learnings:* (a) OWUI staff and opencode agents are separate model instances with no shared memory; the only bridge is the one-way `__inbox__` file drop. (b) Agent bodies should *Read* the `<x>_persona.md` at startup rather than copy persona text (avoids drift, honors the revision lock). (c) opencode config is not hot-reloaded — restart after adding agents. (d) `agents.py` is retired; persona `.md` files are the single source of truth.

*   **Review Archived `agents.py` for Value**
    *   *Pillar:* HQ / CTO
    *   *Status:* Completed (2026-10-11) — Decision: **Retire**
    *   *Concept:* Reviewed `Full-Armor---HQ\__ARCHIVE__\agents.py` (CrewAI `Agent` on local `ollama/qwen3-coder:30b`, tools via `body_toolbox.get_drawer`, loads the Titan programming-engineer persona). Determined it is a superseded single-agent prototype: its successor pattern is the per-pillar `persona_mind_body_nerveous_system\nervous_system.py` factory, and the current architecture keeps the `*_persona.md` files as the single source of truth. Formally **retired** — stays in `__ARCHIVE__`, not revived. Corrected the stale "agents.py = single source of truth" claims in `Open_Web_UI_Front_End\open_web_ui_prompt_writer.md` (line 65) and `Full-Armor---HQ\full_armor_structure.md` (line 47) to point to the persona `.md` files.

*   **Inbox Relay — Auto-Capture & Review Staff Drops from the OWUI Sandbox**
    *   *Pillar:* HQ / CQO
    *   *Status:* Completed (2026-10-11)
    *   *Concept:* Built the file bridge between the Open Web UI sandbox and opencode. `__inbox__` now has `active\` (awaiting review) and `inactive\` (reviewed/archived); OWUI infra (`cache\`, `uploads\`, `vector_db\`, `webui.db*`) is ignored. New tool at `Full-Armor---HQ\__inbox_relay__\`: `inbox_relay.py`, a pure-stdlib 4s polling watcher that routes new drops into `active\`, maintains `_mailbox.json` state + a `_mailbox.md` index, and raises a native Windows toast on arrival; plus `start_inbox_relay.ps1` / `stop_inbox_relay.ps1`. New `/check-inbox` command lists/summarizes active mail and offers Act / Promote / Archive / Ignore; `/good-morning` (SOP-01) now auto-scans the mailbox. Review-first — dropped code is never auto-executed. Started resident 2026-10-11 (14 existing drops routed to `active\`).

*   **P0 — Restore Vanguard Access (Portal Locked) (Ticket: CQO-CAPA-0620)**
    *   *Pillar:* Vanguard / CTO
    *   *Status:* Closed (2026-10-11)
    *   *Concept:* Operator regained full access to Vanguard Pillar in regular and incognito windows. Resolved premature unauthenticated bypass race condition in `index.html`, added SSO sync event hooks, decoupled `auth.currentUser` from pending ticket requirement in `vanguard_terminal.html`, cleaned up stale cookies on rejection in `sso.js`, and deployed live to production (`full-armor-vanguard-dacc3.web.app`).

*   **Vanguard Fixes — CP1252/SSO Race Commit & Deploy.**
    *   *Pillar:* Vanguard / CTO
    *   *Status:* Closed (2026-10-11)
    *   *Concept:* CP1252 mojibake/BOM cleanup and SSO race fixes committed (`540005e`) and deployed to production hosting at `full-armor-vanguard-dacc3.web.app`. Tested and verified operational.

*   **Retire Deprecated Google Account (`don.gaydon@dgcustomphotography.com`)**
    *   *Pillar:* HQ / CQO
    *   *Status:* Closed (2026-10-11)
    *   *Concept:* Ensure the deprecated Google account is never used by live code or tooling, so nothing can "jump back" to it. Revoked its gcloud authorization (`gcloud auth revoke`); confirmed `gcloud auth list` and `firebase login:list` now resolve solely to `dgaydon11@gmail.com`. Vacuumed the gcloud credential/token SQLite stores and cleared gcloud logs so no residue remained. Verified no project code/config (`.firebaserc`, `firebase.json`, `.env`, service-account keys, `sso.js`) references the old account. Historical git commit metadata was intentionally left unchanged (inert; does not affect account selection).

*   **Customer 2FA/MFA Strategy Discussion**
    *   *Pillar:* Security / CISO / Product
    *   *Status:* Completed (2026-06-24)
    *   *Concept:* Evaluated costs and security implications of custom MFA. Determined that leveraging OAuth (Google & Apple Sign-In) delegates 2FA to the identity providers for free, avoiding SMS toll fraud risks. Standard email/password login remains available as an optional, lower-friction fallback to prevent user drop-off.

*   **Background Ticketing System**
    *   *Pillar:* Executive C-Suite
    *   *Status:* Completed (2026-06-22)
    *   *Concept:* Build a silent, background-only task tracker in Firestore projects collection to manage concurrent multi-agent code execution.

*   **Implement Standalone R&D Lab (Pillar 6)**
    *   *Pillar:* R&D
    *   *Status:* Completed (2026-06-22)
    *   *Concept:* Set up local `Full-Armor---Rnd-Lab` workspace directory and configure isolated `full-armor-rnd-sandbox` Firestore on the Spark plan.

*   **Communication App Bridge**
    *   *Pillar:* Executive C-Suite
    *   *Status:* Completed (2026-06-22)
    *   *Concept:* Develop a lightweight, standalone "Sentry" binary acting as a secure relay between mobile devices and the local Anti-Gravity environment. Features cryptographic device-specific handshakes to push commands to `HQ` for Veritas to process, native Jetpack Compose UI, local voice-to-intent pipeline (Whisper STT) with barge-in support, verbal shortcut command library, and ISO 9001 audit trails of all mobile interactions.

*   **Z Fold7 Mobile Layout Optimization (Sentry)**
    *   *Pillar:* R&D / Design
    *   *Status:* Completed (2026-06-22)
    *   *Concept:* Implement responsive layout scaling, fluid grid systems, compressed status header, content-first typography, and viewport height prioritization (80-90% conversation display) to maximize the reading workspace when unfolded on Z Fold7 devices.
