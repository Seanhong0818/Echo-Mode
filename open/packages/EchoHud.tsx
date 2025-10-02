// SPDX-License-Identifier: Apache-2.0
import React from "react";

export function EchoHud(props: { protocolVersion: string; state?: string; score?: number }) {
  const { protocolVersion, state = "Sync", score = 0.7 } = props;
  const pct = Math.round(score * 100);
  return (
    <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:12, fontFamily:'ui-sans-serif, system-ui'}}>
      <div style={{fontWeight:700, marginBottom:6}}>Echo Mode HUD</div>
      <div>Protocol: {protocolVersion}</div>
      <div>State: {state}</div>
      <div>Score: {pct}%</div>
    </div>
  );
}
export default EchoHud;
