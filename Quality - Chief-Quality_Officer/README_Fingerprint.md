# WORK INSTRUCTION: SHAS-01 (SONIC SIGNATURE UTILITY)
**Associated Plan:** [Fingerprint_Project_Plan.md](file:///C:/Users/Don1/Desktop/Full-Armor---Executive-C-Suite/Quality%20-%20Chief-Quality_Officer/Fingerprint_Project_Plan.md)  
**Security Level:** Tier 1 (C-Suite Core)  

This companion readme serves as the official work instruction for compiling, executing, and testing the standalone fingerprinting utility.

---

## 💻 DEVELOPMENT ENVIRONMENT SETUP
The utility must be developed as a modular JavaScript module targeting Node.js execution environments.
*   **Engine Target:** `Node.js >= 18.0`
*   **Dependency Constraint:** Zero external npm library dependencies. Math modules and cryptography modules must rely strictly on Node's native libraries (`crypto`, `fs`, `path`).

---

## ⚡ INPUT/OUTPUT VALIDATION CONTRACT
All functions must validate inputs against the contract rules before running calculations.

### Input Specification (Audio Substrate)
*   **Format:** Standard 16-bit PCM Linear Mono WAV.
*   **Sample Rate Target:** `11025 Hz` (to maintain processing speed and high peak resolution).
*   **Minimum Header size:** 44 bytes.

### Output Specification (Signature Packet)
*   **Format:** JSON Object containing:
    ```json
    {
      "fingerprint_id": "hex-encoded-string",
      "signature": "sha256-signature",
      "peaks_extracted": 1000,
      "generated_at": "ISO-8601-timestamp"
    }
    ```

---

## 🧪 MANUAL RUN & TEST INSTRUCTIONS

During Phase 3 (Check), the utility will be run from the terminal using standard PowerShell commands:

```powershell
# Run the test execution script passing the path to the WAV substrate
node src/index.js -input "assets/test_guitar_stem.wav"
```

The output must print the JSON signature packet directly to the standard output terminal.

---

*Verified by CISO & CSO. Issued by Veritas, CQO.*
