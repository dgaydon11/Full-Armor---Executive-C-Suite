# FULL ARMOR STUDIOS - MASTER WHITEBOARD
**Document ID:** CQO-WHITEBOARD  
**Owner:** Human Operator  
**Last Updated:** 2026-10-08  

This file serves as the master repository for brainstorming, system ideas, and future features. All automated tickets for Titan, Noble, Vanguard, Sentinel, and R&D will be derived from the ideas logged here.

---

## 💡 ACTIVE IDEAS & BACKLOG

*   **P0 — Restore Vanguard Access (Portal Locked) (Ticket: CQO-CAPA-0620)**
    *   *Pillar:* Vanguard / CTO
    *   *Status:* Tomorrow AM — Priority
    *   *Concept:* Operator must regain access to the Vanguard Pillar ASAP (Google sign-in fails with `auth/internal-error` + redirect loop). First action of the morning: run the CAPA-0620 diagnostics (browser Network tab for `CONFIGURATION_NOT_FOUND` / `OPERATION_NOT_ALLOWED` / `API_KEY_HTTP_REFERRER_BLOCKED`; verify Google provider Enabled and the authorized domains in the Firebase Console), then apply the 5S auth-routing cleanup and validate in the emulator before deploying.

*   **Review ALL CAPA Tickets (Open & Closed) (Ticket: CQO-CAPA-1008)**
    *   *Pillar:* CQO / Quality Management System
    *   *Status:* Pending
    *   *Concept:* Full review of every ticket in the local QA Corrective Action (CAPA) system — reconcile status drift between the `capa_*.md` reports and `yellow_light_capa_log.md`, re-assess the open Vanguard auth loop (CQO-CAPA-0620), and flag stale or unowned items.

*   **[DISCUSSION] Transitioning the Executive Staff into the opencode Environment**
    *   *Pillar:* Executive C-Suite / HQ
    *   *Status:* Discussion — Resume Here (Parked 2026-10-08, no files drafted yet)
    *   *Concept:* Planned migration of the C-Suite Staff (currently living as chat personas in Open Web UI) into native opencode agents. **Decision:** YES — opencode supports custom agents as simple `.md` files (project `.opencode/agent/<name>.md` or global `~/.config/opencode/agent/<name>.md`), with frontmatter for `description`, `mode` (primary/subagent/all), `model`, and `permission`.
    *   *Key Design Decision (proposed, unapproved):* Honor the governance already baked into every persona file (executives issue only "WHAT" to HQ; mandatory Human Operator sign-off; `.md` revision lock; Identity Sovereignty). Mapping: **(1) Chiefs** → `subagent`, read-only planners (`edit: deny`, `write: deny`, `bash: ask`); **(2) HQ Manager / Script Writer** → `primary`, full tools, turns directives into tasks ("HOW"); **(3) Pillar bots** (Titan/Noble/Vanguard/Sentinel) → `subagent`, the only write-capable agents. Enforce revision lock + sign-off via `permission: { edit: { "**/*.md": "ask", "*": "allow" } }` (opencode = last matching rule wins).
    *   *Open Questions / Gotchas:* (a) Open Web UI Staff and opencode agents are separate model instances — no shared memory; the only bridge is the `__inbox__` file drop, which is a one-way Open Web UI sandbox (`webui.db` + 185 uploaded images), NOT a live message bus. (b) Hierarchy is Chief→HQ, the reverse of opencode's primary→subagent dispatch — so HQ should be `primary` and consults Chiefs as `subagent` reports. (c) Keep single source of truth: agent bodies should *Read* the existing `<x>_persona.md` at startup (like SOP-01) rather than copy persona text (avoids drift + honors the revision lock). (d) Config is not hot-reloaded — restart opencode after adding agents. (e) `agents.py` is named as the single source of truth for staff capabilities in `open_web_ui_prompt_writer.md` — verify it before building.
    *   *Relevant Files:* all 7 `*_persona.md` under `Full-Armor---Executive-C-Suite\<Dept> - ...\`; `Open_Web_UI_Front_End\open_web_ui_prompt_writer.md`; `Quality - Chief-Quality_Officer\staff_activation_control.md`; `Full-Armor---HQ\__inbox__\`.
    *   *Next Step When Resumed:* Decide scope — start with a proof-of-concept (`/good-morning` + CQO/Veritas since she leads) vs. full 7-Chief + HQ + Pillar set — then draft the agent `.md` files and restart opencode.

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


---

## 🚧 LOOSE ENDS & OPERATIONAL STATE
*As of 2026-10-08 EOD. Captured so tomorrow's session resumes cleanly — these are discovered defects / pending state, NOT yet ticketed in the CAPA system (triage → CQO-CAPA when resumed).*

*   **Vanguard — Today's Fixes NOT Yet Committed/Deployed.**
    *   *Pillar:* Vanguard / CTO
    *   *Status:* Uncommitted (pairs with P0 / CQO-CAPA-0620)
    *   *Detail:* CP1252 mojibake + BOM cleanup in `index.html`, `vanguard_terminal.html`, `guitar_interior.html`, and the broken-JS repair at `index.html:289` are saved but not committed. Verify in the emulator, then commit + deploy.

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

*   **Ops Note — gcloud / gsutil Auth Workaround (NOT a bug to fix blindly).**
    *   *Pillar:* HQ
    *   *Status:* Documented
    *   *Detail:* gcloud holds the wrong account (`don.gaydon@dgcustomphotography.com`) and cannot refresh non-interactively. Correct account is `dgaydon11@gmail.com`. Workaround: mint an access token from the Firebase CLI refresh token in `~/.config/configstore/firebase-tools.json`, set `$env:CLOUDSDK_AUTH_ACCESS_TOKEN`, then run `gcloud storage ...` (token ~1h).

*   **Morning Routine — Register the new `/good-morning` command.**
    *   *Pillar:* HQ / CQO
    *   *Status:* Pending restart
    *   *Detail:* The new global command (`~/.config/opencode/command/good-morning.md`) only appears after an opencode restart. Until then, trigger the routine by saying "Good morning staff."

---


## 📌 ARCHIVED / COMPLETED IDEAS

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
