# FULL ARMOR STUDIOS - MASTER WHITEBOARD
**Document ID:** CQO-WHITEBOARD  
**Owner:** Human Operator  
**Last Updated:** 2026-10-15  

This file serves as the master repository for brainstorming, system ideas, and future features. All automated tickets for Titan, Noble, Vanguard, Sentinel, and R&D will be derived from the ideas logged here.

---

## 💡 ACTIVE IDEAS & BACKLOG

*   **Robin's Personal Files — Vault Setup (Personal Ops)**
    *   *Pillar:* HQ / Personal Ops
    *   *Status:* In Progress (2026-10-15)
    *   *Concept:* Create a personal vault for Robin (Don's wife), parallel to `personal\don\`, at `Full-Armor---HQ\personal\robin\`, and populate it with subdirectories for her personal files.
    *   *Created (2026-10-15):* `personal\robin\` with subdirectories: `Robin's Daily Briefing`, `Robin's Shopping list`, `Robin's Medical File`, `Robin's Calendar`, `Robin's Medications`.
    *   *Robin's Calendar — EDITABLE (2026-10-15):* Seeded `personal\robin\Robin's Calendar\local_calendar_data.json` with a copy of Don's calendar. Parameterized `local_calendar.py` with a `--user` flag (`don` | `robin`); each user's data path is mapped in a `USERS` dict (Don: `personal\don\local_calendar_data.json`; Robin: `personal\robin\Robin's Calendar\local_calendar_data.json`). Added `start_robin_calendar.ps1` and a Desktop shortcut "Robin's Calendar" (`--user robin`); Don's launcher/shortcut now pass `--user don` explicitly. `load_events`/`save_events` auto-create the data dir. Verified: `py_compile` OK, path resolution for both users correct, GUI smoke test (Robin) launched + closed cleanly.
    *   *Robin's Calendar — CLEANED (2026-10-15):* Removed Don's work/misc events from Robin's copy (kept birthdays + stored holiday entries only). Robin's calendar now holds: Alec's Birthday (10-06), Mom Diamond's Birthday (10-12), Halloween (10-31), Thanksgiving Double Check (11-26), Wife's Birthday (12-06). Holidays still render dynamically via the overlay. Don's calendar untouched (15 entries).
    *   *Follow-ons (pending):* populate Robin's other content (briefing, shopping list); decide whether she gets her own briefing tooling mirroring Don's.
    *   *Robin's Shopping List — CREATED (2026-10-15):* Added `personal\robin\Robin's Shopping list\robin_shopping_list.md` (empty, same markdown-checkbox format as `don_shopping_list.md`) so Robin can maintain her own list. No tooling reads the list (plain markdown), so no code changes needed.
    *   *Robin's Morning Briefing — CREATED (2026-10-15):* Parameterized `Personal_Briefing.py` with a `--user` flag (`don` | `robin`); a `USERS` dict maps calendar (read) + briefing (write) paths (Robin reads `personal\robin\Robin's Calendar\local_calendar_data.json`, writes `personal\robin\Robin's Daily Briefing\Personal_Briefing.md`). All briefing sections retained unchanged ("keep everything for now"): calendar, rental reminder, exercise, Walmart, weather (Hesperia/Chino), commute, US/World news, SpaceX. Added `start_robin_briefing.ps1` + Desktop shortcut "Robin's Morning Briefing". Verified: `py_compile` OK, per-user path resolution correct, live run wrote Robin's briefing (exit 0). Don's briefing untouched.
    *   *Robin's Briefing — TAILORED (2026-10-15):* Added per-user `sections` + `cities` config to `Personal_Briefing.py`. Robin's briefing now omits the rental-property reminder, Walmart order, Chino weather, the Hesperia→Chino commute, US news, and SpaceX Starship — she gets: calendar, daily exercise, Hesperia weather, World news. Don's config unchanged (all sections). Verified live (exit 0) + per-user section resolution.
    *   *Robin's Briefing — REMINDERS ADDED (2026-10-15):* New Robin-only **✅ Reminders** section (after the calendar): take blood-pressure medication, start a load of laundry, start the dishwasher, add items to the shopping list. Gated by a new `reminders` section key; Don unaffected.
    *   *Robin's Briefing — LA CHARGERS ADDED (2026-10-15):* New Robin-only **🏈 LA Chargers** section (after weather): current **record** + **next game** (ESPN public site API `site.api.espn.com/.../teams/lac`) and **team news** (Google News RSS query). Next-game time is converted to Pacific (`zoneinfo America/Los_Angeles`). Gated by a new `chargers` section key; Don unaffected. Verified live (record 0-5, next: at KC Sun Oct 18 1:25 PM PDT, 5 news items).

*   **Desktop TTS Pipeline — Speak OpenCode Replies Aloud (Cairn Voice, Desktop)**
    *   *Pillar:* HQ / Voice Bridge / CCO
    *   *Status:* WORKING (2026-10-14) — speaking live through the **monitor speakers**. Playback hand-off to the DAW rig is still pending.
    *   *Concept:* Have the desktop read opencode chat replies out loud, matching the phone bridge's text-to-speech. The phone PWA speaks replies client-side via the browser Web Speech API (`speechSynthesis` in `public/app.js`); the desktop has no browser, so we reproduce the effect with an opencode plugin that hooks `session.idle`, extracts the last assistant message, strips code/URLs, and voices natural prose.
    *   *Decisions (locked 2026-10-14):* Global plugin at `~/.config/opencode/plugins/speak-replies.js`; **Phase 1 = Windows SAPI** (verify the hook), then **Phase 2 = edge-tts `en-GB-RyanNeural`** to match the Edinburgh voice; read every reply by default with a toggle/flag-file to mute; strip code blocks / inline code / raw URLs; new reply interrupts the previous utterance.
    *   *Built (2026-10-14):*
        *   Phase 1 — plugin `~/.config/opencode/plugins/speak-replies.js` (global, **verified loading live** — logs `initialised; engine=edge ...`). Hooks `session.idle`, fetches the last assistant message via `client.session.messages`, skips sub-agent sessions (`parentID`) and compaction summaries, strips code/URLs/markdown/emoji, then speaks. A newer reply interrupts the previous; mute via flag file. Helper `~/.config/opencode/tts/sapi.ps1`; config `~/.config/opencode/tts/config.json`.
        *   Phase 2 — resident helper `Full-Armor---HQ/desktop_tts/tts_server.py` (stdlib HTTP on `127.0.0.1:8788`; edge-tts `en-GB-RyanNeural` -> temp MP3 -> **Media Foundation decode to PCM WAV** -> winmm `PlaySound`, interruption-aware). The plugin posts text to it and it owns playback (no automatic SAPI fallback — see 2026-10-15 defect below).
        *   Scripts (HQ `desktop_tts/`): `start_tts_server.ps1`, `stop_tts_server.ps1`, `toggle_tts.ps1`, `mp3_to_wav.ps1` (Media Foundation MP3->WAV decoder). Mute = flag file `~/.config/opencode/tts/muted`.
    *   *Playback finding (2026-10-14) — why the WAV detour exists:* edge-tts only emits MP3, but on this machine the default output is the **monitor's HDMI endpoint**, where MP3 playback is **silent** via both MCI `mpegvideo` and `WMPlayer.OCX`; only winmm `PlaySound` (WAV) is audible. So each clip is decoded MP3->WAV in-process by Windows Media Foundation (no ffmpeg/mpv required). **Do not "simplify" this back to direct MP3 playback — it goes silent again.**
    *   *Verified (2026-10-14):* plugin loads + fires on `session.idle`; `edge-tts` synthesis OK; helper `/health` 200 and `/speak` 200 (audible voice on the monitor); SAPI fallback speaks (exit 0); text filter 6/6 unit cases pass; newer reply interrupts the previous clip.
    *   **DEFECT + FIX (2026-10-15) — two voices at once (Cairn's edge voice + a robotic voice) on the DESKTOP.**
        *   *Symptom:* two voices play simultaneously through the monitor speakers — Cairn's Edinburgh voice (edge-tts WAV) plus a robotic voice.
        *   *Root cause (NOT a device change, NOT concurrent wav+mp3):* the plugin posted the reply to the helper, then a **15-second abort timer** fired while edge-tts was still synthesising (long replies take 17–65s). The timeout was treated as "helper unreachable" and the plugin **fell back to Windows SAPI** (the robotic voice). The helper, unaware the client hung up, finished synthesising and **played its WAV anyway**. Both hit the same default device → two voices. A newer reply superseding an in-flight request triggered the identical abort→SAPI path.
        *   *Evidence:* `opencode.log` WARN `edge helper unavailable, falling back to SAPI: The operation was aborted.` (5 occurrences 2026-10-15) lines up 15s before the helper's long-synthesis log lines; helper `tts_server.err.log` shows matching `ConnectionResetError` (the aborted requests).
        *   *Fix:* `~/.config/opencode/plugins/speak-replies.js` — **removed the automatic SAPI fallback for engine `edge`.** On abort/timeout or helper-unreachable the plugin now stays silent (the helper owns playback); SAPI only runs if explicitly configured (`engine: "sapi"`). Also raised the abort timeout **15s → 120s** so a slow-but-healthy synthesis is not mistaken for a dead helper. `node --check` passes.
        *   *Status:* **VERIFIED LIVE 2026-10-15** — restart 09:53 loaded the fix (`initialised; engine=edge helperUrl=...8788 muted=false`, run `20013b91`); zero SAPI-fallback WARNs since restart; operator confirmed **one voice only** (Cairn edge voice, no robotic double). Defect closed.
        *   *Open decision for operator:* on a genuine helper outage the desired behaviour is now **silence** (only Cairn's voice ever plays). If a spoken fallback is ever wanted instead, it is a one-line config change.
    *   *Roadmap — playback device:*
        *   **Phase A (current):** monitor speakers (Sceptre L24 / NVIDIA HDMI). Working.
        *   **Phase B (next) — DECISION LOCKED 2026-10-14, option (a):** make the **Steinberg audio interface the Windows default output** and let winmm `PlaySound` follow it — **no helper code changes**. Then monitor.
    *   *Roadmap — voice input:*
        *   **Phase C (after Phase B) — DECISION LOCKED 2026-10-14:** set up a **professional microphone** plus a **helper that types the transcript into opencode** (synthetic keystrokes), so the operator can *speak prompts* to Cairn. Chosen over the "transcript file + `/voice-prompt` command" route (safer, but less seamless).
    *   ***RESUME HERE (paused 2026-10-14) — resume point for the next session.***
        *   **Phase B — do this next:**
            *   Operator connects the Steinberg interface + surround rig; confirm **Windows enumerates the device** (last check, the only active render endpoints were the monitor + Realtek Digital; the Steinberg showed as *not present*).
            *   Set the Steinberg as the Windows default output (manual: Settings > Sound > Output, or the classic Sound Control Panel). **Cairn does not change system audio settings unasked.**
            *   `PlaySound` follows the default automatically — verify a reply is audible on the surround rig.
            *   **Monitor checklist:** (1) audible at all; (2) correct channels — mono clip should land on the front pair, not buried in centre/rear; (3) no grit from the 24 kHz -> 48 kHz resample (first suspect if it sounds rough); (4) no silent failure when the device is off/absent; (5) no conflict with Cubase holding the interface in ASIO/exclusive mode — test with the DAW closed and open.
            *   If it holds -> Phase B done. If it goes silent -> capture the default-device state first (a Core Audio device/volume reader was already used for diagnosis).
        *   **Phase C — design locked, build later:**
            *   Pipeline: global push-to-talk hotkey (`RegisterHotKey`) -> record mic/interface input -> speech-to-text -> inject transcript into opencode as keystrokes.
            *   Injection: Win32 `SendInput` (Unicode key events) **or** clipboard + `Ctrl+V` (more robust for long/symbol-heavy text; briefly borrows the clipboard).
            *   **Safety rule (agreed):** inject only when the target window is the **verified foreground window**; otherwise fall back to clipboard + a toast ("prompt ready, Ctrl+V") rather than typing blind.
            *   Default to **review-first** (helper types; operator presses Enter) — an STT error must not auto-send a wrong prompt to an agent with write/bash access.
            *   Needs a mic-capture library (PortAudio-bound, e.g. `sounddevice`) and an STT engine (local Whisper fits the offline ethos; one-time model download; NVIDIA GPU available).
        *   **Phase C — OPEN QUESTIONS (answer before building):**
            1. Which terminal hosts opencode (Windows Terminal, or other)? Needed to target the window reliably.
            2. Review-first or auto-send?
            3. Which global hotkey — and does Cubase / the interface drivers already own it?
            4. STT: is local Whisper acceptable (model download + GPU use)?
        *   **Resolved (2026-10-15):** the "two `tts_server.py` helpers on 8788" was a **misread of one server, not two.** The venv `python.exe` is a *redirector*: it spawns the base system interpreter (system Python 3.12) as a child and hands it the venv's site-packages, so two Python PIDs appear (venv launcher + child) but there is a **single `Listen` socket** (verified: only one `127.0.0.1:8788 LISTENING`, owned by the child). One source of truth; no action needed.
        *   **Open operational item (decide):** register a logon scheduled task so the helper auto-starts with the machine.
        *   **Repo hygiene:** `Full-Armor---HQ/desktop_tts/` is **untracked in git** (no history to roll back to) — consider committing once the rig is stable.

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
| 2026-10-14 | up | up | pass (warm ~1.3s) | Day 2 health watch — no quota errors |

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

*   **Multi-User Voice Bridge Routing (Don default + Robin)**
    *   *Pillar:* HQ / Voice Bridge
    *   *Status:* Completed (2026-10-15)
    *   *Concept:* Made the phone voice bridge multi-user. Don is the automatic default; the PWA accepts `?user=<id>`, persists it (`cairn_user`), and sends it on every call. The relay validates it against an allowlist (`don`, `robin`; unknown → HTTP 400), hard-namespaces conversations (`user:conversationId`, stripping any client-supplied known-user prefix so nobody can spoof another user's session), and tags each message `[acting-user: <id>]`. Personal I/O routes to the acting user's vault `Full-Armor---HQ\personal\<user>\`. Policy added to the global `AGENTS.md` + `cairn_persona.md` §8. Source and LIVE bridge copies kept byte-identical; `node --check` + JSON parse OK. LIVE relay restarted (task `CairnVoiceRelay`, PID 20540, health ok) and live-tested (`user=eve`→400, `robin`/default→fresh scoped sessions). Committed + pushed (`b4acee4`, `d79044c`, `a84f03d`). *Caveat:* Don's old `chat:main` history is now `chat:don:main` → his `main` conversation starts fresh once.

*   **Personal Vault Consolidation — `personal/don/`**
    *   *Pillar:* HQ / Personal Ops
    *   *Status:* Completed (2026-10-15)
    *   *Concept:* Consolidated Don's scattered personal files into the canonical vault `Full-Armor---HQ\personal\don\`. Moved `local_calendar_data.json`, `Personal_Briefing.md`, and `don_shopping_list.md` out of the legacy `Don's personal files\` folder (then removed it) and deleted the stale root pointer stubs. Repointed `local_calendar.py` (`DATA_FILE`) and `Personal_Briefing.py` (read + write) plus the `/good-morning` command to the new vault; updated `cairn_persona.md` §8 + global `AGENTS.md`. Verified: `py_compile` OK and a live briefing run read the calendar and wrote `personal\don\Personal_Briefing.md` (exit 0). Committed + pushed (`59dc732`).

*   **Desktop TTS Two-Voice Defect — Fixed & Verified**
    *   *Pillar:* HQ / Voice Bridge / CCO
    *   *Status:* Completed (2026-10-15)
    *   *Concept:* The desktop read-aloud defect (Cairn's edge voice + a robotic voice playing at once) was root-caused to the plugin's 15s abort timer firing mid-synthesis, triggering a SAPI fallback while the helper still played its WAV. Fixed in `~/.config/opencode/plugins/speak-replies.js` (removed the automatic SAPI fallback for `engine: edge`, raised the abort timeout 15s → 120s). Reloaded live at 09:53 (run `20013b91`), zero fallback WARNs since; operator confirmed one voice only. Full detail under the Desktop TTS Pipeline entry above.

*   **Personal Calendar (Local GUI + Data)**
    *   *Pillar:* HQ / Personal Ops
    *   *Status:* Completed (2026-10-13)
    *   *Concept:* Local Tkinter month-grid calendar (`Full-Armor---HQ\local_calendar.py`) with a US-holiday overlay (via the `holidays` package, preloaded ±5/10 years) and click-to-add events persisted to `personal\don\local_calendar_data.json`. Delivered with `start_calendar.ps1` (runs the HQ `.venv` pythonw), a Desktop shortcut "Full Armor Calendar", and a global `/calendar` opencode command. Verified running.

*   **Cairn Voice Bridge — Repointed to Local Ollama (Quota-Free)**
    *   *Pillar:* HQ / Voice Bridge
    *   *Status:* Completed (2026-10-13) — under multi-day monitoring
    *   *Concept:* The phone voice bridge was failing with Google Gemini free-tier `429 RESOURCE_EXHAUSTED` (250 req/day per model). Repointed the relay to `provider: ollama`, `model: qwen2.5-coder:14b-instruct` and added an `ollama` provider (6 local models) to `~/.config/opencode/opencode.jsonc`. Cleared a stale OpenCode server holding port 4096. Verified end-to-end: relay (8787) → OpenCode server (4096) → local Ollama (11434), correct Cairn persona, ~1.2s warm, no quota. Documented in `...\CELL PHONE COMM BRIDGE (Cairn Voice)\CAIRN_VOICE_BRIDGE.md` (linked from all agent/persona files); daily health watch tracked in LOOSE ENDS.

*   **Personal Daily Briefing**
    *   *Pillar:* HQ / Personal Ops
    *   *Status:* Completed (2026-10-13)
    *   *Concept:* `Full-Armor---HQ\Personal_Briefing.py` generates `personal\don\Personal_Briefing.md` containing, in order: today's calendar events (read from `personal\don\local_calendar_data.json`), a rental-property reminder, Hesperia/Chino weather (wttr.in), the Hesperia→Chino commute (OSRM), US + World headlines (Google News RSS), and upcoming SpaceX Starship status (The Space Devs API). Verified live end-to-end.

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
