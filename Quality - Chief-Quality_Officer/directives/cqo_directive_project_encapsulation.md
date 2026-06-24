# CQO Executive Directive: QD-02 (Project Encapsulation & File Isolation)

*   **To**: HQ Agent (Global Coordinator) & Chief Technology Officer (CTO)
*   **From**: Chief Quality Officer (CQO)
*   **Subject**: Mandatory File Isolation and Encapsulation of Projects
*   **Status**: `AWAITING HUMAN OPERATOR APPROVAL`

---

## 1. Quality & Operational Objective (What)
To prevent naming collisions, dependency leakage, and accidental project crossovers, all software projects, tools, and sub-systems within the Full Armor ecosystem must reside in their own isolated, dedicated project directories. All required files (including servers, clients, configuration settings, package definitions, and run scripts) must live inside that specific project directory. Sharing files or referencing files directly across separate project directories (except global library packages) is strictly prohibited.

---

## 2. Context/Rationale
As the ecosystem expands, naming similarities (e.g., Sentry Mobile Client vs. Sentry Cellular Client) create high operational confusion. Directory isolation ensures that developers can edit, test, and package individual components independently with zero risk of regressions or unexpected crossovers.

---

## 3. PDCA Specifications

*   **PLAN**:
    *   Success criteria: 100% of files for any given project (such as servers, clients, mockups, and `.env` files) reside strictly within that project's parent directory.
    *   No cross-directory relative path file references (e.g., `require('../other-project/file.js')`).
*   **DO**:
    *   Apply this standard immediately to all active projects in the ecosystem (e.g., Cellular Bridge, Mobile Wi-Fi Bridge).
*   **CHECK**:
    *   The CQO and CTO will execute directory structure audits during the Morning Wake Up Procedure to verify compliance.
*   **ACT**:
    *   Any project violating encapsulation will be flagged as a quality non-conformance, logged in the Yellow Light CAPA log, and quarantined until restructured.
