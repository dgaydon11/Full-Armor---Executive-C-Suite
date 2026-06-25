# FULL ARMOR STUDIOS - MASTER WHITEBOARD
**Document ID:** CQO-WHITEBOARD  
**Owner:** Human Operator  
**Last Updated:** 2026-06-24  

This file serves as the master repository for brainstorming, system ideas, and future features. All automated tickets for Titan, Noble, Vanguard, Sentinel, and R&D will be derived from the ideas logged here.

---

## 💡 ACTIVE IDEAS & BACKLOG

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
