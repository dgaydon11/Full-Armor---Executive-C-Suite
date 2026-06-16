# CISO MASTER STANDARD: SECRET MANAGEMENT & INTEGRITY

**Owner:** Chief Information Security Officer (CISO)  
**Applicability:** All systems, configurations, backends, and programming bots (Titan, Vanguard, Noble, Sentinel).

## Objective

To prevent credential leaks, unauthorized database access, and environment compromise by enforcing strict secret isolation.

## Security Mandates

1.  **No Hardcoded Credentials:** Under no circumstances shall programming bots write or commit API keys, database credentials, authentication tokens, private keys, or service account files directly into code repositories or configurations.
2.  **Vault Utilization:** All sensitive configurations must be retrieved dynamically from approved runtime secret managers:
    *   **GCP/Firebase Backends:** Utilize Google Cloud Secret Manager.
    *   **Local environments:** Utilize local `.env` files that are strictly listed in the project's `.gitignore`.
3.  **Principle of Least Privilege (IAM):** All service accounts and execution contexts must be scoped to the absolute minimum permissions required to perform their tasks.
4.  **Static Secret Scanning:** Sentinel shall monitor the codebases for high-entropy strings or potential credentials. Any detected secrets will trigger immediate rollback and remediation.
