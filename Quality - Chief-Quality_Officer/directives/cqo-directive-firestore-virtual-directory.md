# STANDING ORDER: FIRESTORE VIRTUAL DIRECTORY STRUCTURE
**Document ID:** CQO-GOV-03  
**Owner:** Chief Quality Officer (Veritas) & Chief Technology Officer (CTO)  
**Target:** All Programming Bots & HQ Agent  
**Status:** DRAFT (Awaiting Review on June 18, 7:00 AM)  

To maintain strict alignment with the free Spark Plan limits and establish a uniform architecture across all pillars (Titan, Noble, R&D), all agents must utilize this Virtual Directory Structure. **No Cloud Storage (gs://) buckets shall be accessed or created.**

---

## 1. VIRTUAL STORAGE ARCHITECTURE
All files, assets, and scripts must be serialized and stored directly within Firestore collections. The database maps virtual paths using JSON fields:

```
Collection: "projects"
  |
  +-- Document: [project_name]
        |
        +-- Field: "metadata" (Map)
        |     +-- "base_path": "r_d/crawlers/"
        |     +-- "virtual_path": "src/main/engine/crawler.js"
        |
        +-- Field: "code" (String)
        |     +-- [Raw Source Code Content]
        |
        +-- Field: "assets" (Map)
              +-- [Base64-encoded file attachments or JSON schema arrays]
```

---

## 2. COMPLIANCE CONSTRAINTS
*   **No Storage Service:** Do not attempt to use `gs://` (Cloud Storage) buckets for saving, retrieving, or staging assets.
*   **Audit Gate:** If a task requires binary files that cannot be serialized as JSON/Base64, the agent must instantly halt and flag the task for a **"Schema Review"** by the Human Operator.
*   **Unified Query Pattern:** All file retrieval loops must query Firestore document fields rather than scanning folder directories, eliminating file-system mapping errors.

---

## 3. INITIALIZATION PROTOCOL (BRAIN DUMP)
To start a project setup under this virtual system, the dispatch command format is:
> *"Agent, initialize a new document in the projects collection called [project_name]. Set the base path to [virtual_path]. Store the initial logic in the code field."*

---

*Issued by Veritas, CQO, and CTO. Authorized for C-Suite integration.*
