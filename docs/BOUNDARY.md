# OSS vs Commercial Boundary

This document defines what belongs in the **public OSS repo** (`echo-mode`) versus the **commercial/private repo** (`echo-core`).  
Maintainers and contributors must respect this boundary at all times.

---

## OSS (Apache-2.0, public)

✅ Included in this repository:

- **FSM Core**  
  - State machine (Sync, Resonance, Insight, Calm)  
  - Transition contracts and guards

- **Basic Heuristics**  
  - Transparent, rule-based scoring (no learned weights)  
  - Deterministic functions

- **HUD (React)**  
  - Visualization components for FSM state and score  
  - Basic theming

- **Middleware (Express/Node)**  
  - Request/response hooks for protocol enforcement  
  - Header injection and validation

- **Exporters**  
  - CSV and JSON log emitters

- **Documentation**  
  - README, CONTRIBUTING, GOVERNANCE, ROADMAP  
  - Telemetry/Privacy (OSS default = OFF)

---

## Commercial (BSL/EULA, private)

🔒 Excluded from this repo. Lives in **`echo-core`**:

- **Calibration Weights & Algorithms**  
  - Learned parameters for scoring  
  - Advanced model integration

- **Dashboards & Control Panel**  
  - Drift dashboards  
  - Calibration UI  
  - SaaS multi-tenant management

- **Provider Connectors**  
  - Integration with OpenAI, Anthropic, Vertex, etc.  
  - Enterprise APIs

- **Enterprise Ops**  
  - RBAC and audit logging  
  - SOC2/PII compliance modules  
  - Retention policies

- **Pricing & Licensing**  
  - Proprietary licensing terms  
  - Billing & metering logic

---

## Boundary Rules

- All public contributions must remain **OSS-only** (no learned weights, no closed algorithms).  
- Commercial features must be developed in the **private repo**.  
- Issues or PRs suggesting commercial features should be redirected to maintainers privately.  
- OSS repo provides a **demo-level experience**; production-grade calibration is reserved for the commercial repo.

---

## Enforcement

Maintainers will:

- Review contributions to ensure no commercial code leaks into OSS.  
- Close or redirect PRs/issues that cross the boundary.  
- Periodically audit the repository for compliance.

If you spot boundary concerns, contact: **oss-boundary@echomode.io**.

