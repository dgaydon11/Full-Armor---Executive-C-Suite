# CQO Executive Directive: QD-01 (Avoiding Costly Mistakes: Architectural Quality Gates)

*   **To**: HQ Agent (Global Coordinator)
*   **From**: Chief Quality Officer (CQO)
*   **Subject**: Mandatory Quality Governance Gates for Multi-Pillar Code Architecture
*   **Status**: `APPROVED & TRANSMITTED`
*   **Operator Sign-Off**: Approved by Human Operator on 2026-06-16 at 17:08:03-07:00

---

## 1. Quality & Operational Objective (What)
The HQ Agent shall implement and enforce five mandatory **Architectural Quality Gates** across all code bases within the ecosystem (Noble, Vanguard, Titan, Sentinel) to prevent technical debt, ensure database efficiency, lock down data privacy, and maintain vendor-agnostic infrastructure. All code bases must align with the official 5-stage production lifecycle.

---

## 2. The 5-Stage Cross-Pillar Production Lifecycle
HQ must coordinate and track developer activities strictly within this sequence:
1.  **Noble Pillar**: Pre-production command center. Storylines, lyrics, and rough drafts are developed here. Once the customer signs off on the draft, the stems are exported to the DAW.
2.  **DAW Phase 1 (Prep)**: The draft stems are stripped and prepared for tracking.
3.  **Vanguard Pillar**: Human session recording. Stems are loaded here for session players. Live human tracks (guitars, vocals, etc.) replace draft placeholders. Standard industry metadata (ISRC, credits) is captured for contributing artists.
4.  **DAW Phase 2 (Mix & Master)**: Newly recorded human tracks are brought back into the DAW for mixing. The dynamic auditory watermark is embedded during this final compilation, and the song is polished into the final Master Mix.
5.  **Titan & Sentinel Vaults**: The final master is analyzed for its spectral fingerprint, and then safely locked away in the Titan Vault and/or Sentinel Vault for distribution protection and crawler monitoring.

---

## 3. The Five Quality Gates (Operational Rules)

### Gate 1: Variable Isolation (Variable Privacy) & Sandbox Controls
*   **Local .env Rules**: No secret credentials, database paths, or API keys shall be hardcoded into code. All configuration variables must reside in localized `.env` files.
*   **Pre-Commit Secret Scanning**: HQ must configure git pre-commit hooks (e.g., using TruffleHog or local regex scans) to verify that no secret files or high-entropy credentials are pushed to version control.
*   **Sandbox Cost Caps**: HQ must configure GCS billing alerts and hard monthly spend limits (e.g., $10 maximum) on all developer sandbox/testing projects to prevent budget runs. Personal Identifiable Information (PII) must never be stored alongside dev credentials.

### Gate 2: Content Decoupling & Safe DOM Injections
*   **Empty Frame Rule**: User-facing HTML files must act as empty presentation frames. All text descriptions, legal text, titles, and variables must be sourced dynamically from Firestore.
*   **Safe DOM Manipulation**: HQ must audit code to ensure dynamic database text is injected strictly using `textContent` or `innerText`. The use of `innerHTML` is forbidden to prevent Stored XSS vulnerabilities unless explicitly sanitized via DOMPurify.
*   **Mandatory Local Caching**: To minimize Firestore read charges, HQ must enforce local browser caching (LocalStorage/IndexedDB) for static UI text.

### Gate 3: Vendor-Agnostic Adapters (Single Source of Truth)
*   **The Adapter Law**: No third-party SDK or brand-specific library code (e.g., Stripe, Mailchimp) shall be hardcoded directly into user-facing page layouts. 
*   **Generic Bridges**: HQ must enforce an internal wrapper/adapter layer (a generic payment or communication bridge). To switch vendors, only the bridge code is modified.
*   **Pseudonymous Mapping**: All external vendor records must be anchored to the user's primary Firebase Auth UID using a cryptographically hashed identifier (e.g., SHA-256 hash of UID + salt) to maintain user privacy.

### Gate 4: State and Storage Isolation (Object Locking)
*   **State Separation**: Decouple application state from the visual layout code. Layout code must be completely deletable without altering the underlying user vault.
*   **Vanguard Ingestion Metadata Validation**: HQ must verify that the Vanguard upload forms validate and capture essential metadata (**ISRC**, **ISWC**, composer, and performer credits) before allowing stem ingestion.
*   **Absolute Owner-UID Locking**: Human-recorded audio stems and master mixes must live in isolated Cloud Storage folders locked strictly to the creator's authenticated Google UID (`request.auth.uid`).
*   **Time-Locked Signed URLs**: Stems pulled into client DAWs must be accessed via time-locked Signed URLs (maximum 15-minute expiration fuse) generated server-side using secure GCP service accounts.

### Gate 5: Headless Database Decoupling
*   **Unified API Gateway**: Enforce a serverless API Gateway layer (Firebase Cloud Functions / secure HTTPS endpoints) between the frontend layouts and raw database tables. Visual layouts talk only to the API Gateway.
*   **Serverless Scaling**: Configure API functions to scale to zero when inactive to keep running costs at zero.

---

## 4. Performance & CI/CD Gates
*   **Zero N+1 Queries**: HQ must reject any code loop that makes repeated individual database requests for list items. All list queries must use batch fetches and database indexing to resolve data in a single stream.
*   **CI/CD Pipeline**: Deployments to production must flow through automated Git-based pipelines (e.g., GitHub Actions) that run syntax, linting, and security checks prior to live release.
