# Telemetry Policy (OSS)

## Default Policy

- In OSS (`echo-mode` public repo), telemetry is **OFF** by default.
- No data leaves the user’s environment unless explicitly exported.

## What Is Excluded

- No usage statistics are collected.
- No call-home functionality is included.
- No hidden analytics are present.

## Commercial Extensions

- In the **commercial repo**, telemetry may be **opt-in** to collect anonymized drift metrics for research and service improvement.
- Any telemetry in commercial products will be disclosed and require user consent.

## User Control

- OSS users retain full control of what data is logged or exported.  
- Exporters (`@echo/exporters`) write only to local files.

For concerns about telemetry, contact **telemetry@echomode.io**.
