# CAPA Report: Sentry Bridge Microphone Failure & Audio Engine Mismatch
**Document ID:** CQO-CAPA-0623  
**Date:** June 23, 2026  
**Pillar Affected:** R&D / Communication Bridge (`sentry_mobile_client`)  
**Status:** `CLOSED (RESOLVED & REVERTED)`  
**Active Officer:** Chief Quality Officer (Veritas / Rita)  
**Collaborating Officer:** Chief Sound Officer (Orio / Orion Wave)

---

## 1. Problem Description
Upon deploying a codebase refactor to support lossless WAV audio recording, the standard Sentry Mobile Client (`sentry_mobile_client`) microphone stopped capturing voice commands on the physical device. The app failed to record any voice data, transmitting silent 884-byte files (WAV header only) to the Sentry Bridge server, which were transcribed by Gemini STT as the timestamp `"00:00"`. 

---

## 2. Root Cause Analysis (RCA)

### 2.1 The 5 Whys Analysis
1. **Why did the Sentry Mobile Client microphone stop working?**  
   *Answer:* The client's audio recording engine was refactored from the stable, high-level Android `MediaRecorder` class (outputting 3GP format) to the native `AudioRecord` class (capturing raw PCM bytes).
2. **Why was the audio engine refactored to `AudioRecord`?**  
   *Answer:* To align with Chief Sound Officer Orion's (Orio) Directive **SD-02**, which mandates that all system file uploads be strictly uncompressed, raw `.wav` files to preserve mastering quality and prevent lossy transcoding.
3. **Why did `AudioRecord` fail to capture audio on the physical mobile device?**  
   *Answer:* The sample rate was hardcoded to `16000Hz` and read operations were performed in large block sizes. Many Android devices' audio hardware or HAL layers do not natively support 16kHz capture in `AudioRecord`, causing the object state to remain `STATE_UNINITIALIZED` and all reads to fail with `ERROR_INVALID_OPERATION` (`-3`).
4. **Why did the server receive 884-byte files and transcribe them as "00:00"?**  
   *Answer:* Since the read loop failed, it wrote 0 bytes of raw PCM. The app's converter then appended a 44-byte WAV header to the empty file. The server's base64 reader decoded this, and Gemini STT transcribed the silent WAV header file as a zero-length timestamp `"00:00"`.
5. **Why was this major refactoring applied to the Sentry Mobile Client, which was previously working fine?**  
   *Answer:* We failed to isolate the stable Sentry Mobile Client code from the experimental Sentry Cellular Bridge app development. The WAV refactoring was only required for the cellular app, but we modified both repositories simultaneously without validating device compatibility.

### 2.2 Bluetooth Audio Routing & Human Error Factor
During verification of the communication bridge, a secondary, persistent cause of the transmission silence ("gap") was identified as a localized human and hardware routing error:
* **Active Bluetooth Link:** Donald was utilizing a Bluetooth headset equipped with a physical boom microphone.
* **Muted State & Physical Disconnect Failure:** The headset's boom microphone was physically muted. When Donald finished using and took off the headset, the Bluetooth connection remained active on the mobile device.
* **Operating System Capture Route:** The mobile device continued to route audio input through the muted Bluetooth headset rather than falling back to the built-in device microphone. This resulted in the transmission of silent streams, which simulated a software recording failure.

---

## 3. Corrective and Preventive Actions (CAPA)

### 3.1 Immediate Corrective Action (Done)
*   **Reverted standard Mobile Client:** Discarded all local changes to `sentry_mobile_client` (`AudioRecorder.kt` and `MainActivity.kt`), returning the standard Sentry Mobile Bridge app completely to its original, stable `MediaRecorder` (3GP/AMR) baseline.
*   **Restarted Relay Server:** Canceled the modified background server task and restarted the Sentry bridge server on the clean master version of `sentry_bridge.js`.
*   **Restored Mockup Dimensions:** Reverted the browser mockup container height to `95dvh` and log box to `60dvh` to restore Donald's screen real estate.

### 3.2 Preventive Action & Governance Gates (Standardized)
*   **Critical Tool Designation:** The Sentry Mobile Bridge (`sentry_mobile_client`) is officially designated as a **Critical Communication Tool**. 
*   **Separation of Concerns:** All standard Sentry Mobile Bridge code is locked. Any future communication experiments (such as Sentry Cellular Bridge or Lossless WAV audio trials) must be developed and compiled exclusively within the isolated R&D sandbox directory (`sentry_cellular_client`) and never merged or shared with the stable mobile client.
*   **Reversibility Enforcement:** Before any changes are made to standard communication portals, a Git branch or automated snapshot backup must be created. Deployments must use an emulator-first validation checklist.

---

## 4. Sign-offs
*   **CQO (Veritas) Sign-off:** `APPROVED` (Rita/Veritas on 2026-06-23)
*   **CSO (Orio) Sign-off:** `APPROVED`
