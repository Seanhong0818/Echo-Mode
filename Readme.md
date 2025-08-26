# Echo Mode — Protocol-Layer Stability for LLM Interactions

Echo Mode provides a **protocol layer** for stable, tone-aware interactions on top of LLM chat APIs.  
It implements a **finite-state machine (FSM)**, **tone weight vector**, and an optional **machine footnote**.

- **FSM states**: `Sync`, `Resonance`, `Insight`, `Calm`
- **Tone weights**: `w_sync`, `w_res`, `w_chal`, `w_calm` (0–1)
- **Output contract** (optional): `{ SYNC_SCORE, STATE, PROTOCOL_VERSION }`
- **Works with**: Any provider exposing chat-completions (OpenAI/Anthropic/Gemini/local)

> Protocol = deterministic middleware around model I/O. No fine-tuning. No agentive claims.

---

## Quick links

[![Docs](https://img.shields.io/badge/Docs-Protocol_Overview-informational)](#protocol-overview) 
[![Quickstart](https://img.shields.io/badge/Quickstart-5_min-green)](#quickstart) 
[![License](https://img.shields.io/badge/License-Apache--2.0-blue)](#license)

**Community**
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Follow-blue?logo=linkedin)](www.linkedin.com/in/echo-mode-io-766051376)
[![Medium](https://img.shields.io/badge/Medium-Read-black?logo=medium)](https://medium.com/@seanhongbusiness/beyond-prompts-the-protocol-layer-for-llms-ae5dd2ad0a21)
[![Reddit](https://img.shields.io/badge/Reddit-Discuss-orange?logo=reddit)](https://www.reddit.com/user/Medium_Charity6146/)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?logo=discord&logoColor=white)](https://discord.gg/kDQgjYXBcx)

---

## Quickstart

```bash
pnpm install
pnpm -r build
