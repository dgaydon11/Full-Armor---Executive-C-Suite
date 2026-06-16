# CQO DIRECTIVE IMPACT MATRIX

This matrix defines the impact levels for all executive directives and determines the required approval mechanism. **All agents must reference this specific file to determine approval rules and are prohibited from defining impact levels elsewhere.**

| Impact Tier | Description | Typical Operations / Examples | Approval Mechanism |
| :--- | :--- | :--- | :--- |
| **🔴 High Impact**<br>(Tier 1) | **Core System & Production Changes**<br>Operations affecting system stability, security, or live production environments. | • Database schema migrations<br>• Production hosting deployments (e.g., Firebase)<br>• Firewall / Security configuration changes (Sentinel)<br>• Modifying core C-Suite persona protocols | **Mandatory Human Operator Approval**<br>(Hold execution until explicitly signed off) |
| **🟡 Medium Impact**<br>(Tier 2) | **Feature & Logic Changes**<br>Standard application logic updates that do not impact critical infrastructure. | • Implementing new UI features or components<br>• Modifying business logic or API endpoints<br>• Major refactoring of existing codebase structures | **CQO Validated Auto-Approve**<br>(Executes automatically; CQO audits and posts a summary report to the operator) |
| **🟢 Low Impact**<br>(Tier 3) | **Standard Maintenance & Quality**<br>Routine codebase maintenance, testing, and documentation. | • Writing or updating unit tests<br>• Formatting, styling, and spelling fixes<br>• Updating internal markdown documentation<br>• Automated rollbacks on failed builds | **Fully Automated**<br>(No hold or audit required; tracked in regular bot operation logs) |
