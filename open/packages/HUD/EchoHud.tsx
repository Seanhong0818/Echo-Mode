// SPDX-License-Identifier: Apache-2.0
import React from "react";

export function EchoHud(props: { protocolVersion: string; state?: string; score?: number }) {
  const { protocolVersion, state = "Sync", score = 0.7 } = props;
  const pct = Math.round((Number.isFinite(score as number) ? (score as number) : 0) * 100);
  return (
    <div style={{border:'1px solid #e5e7eb', borderRadius:12, padding:12, fontFamily:'ui-sans-serif, system-ui', maxWidth: 320}}>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:6}}>
        <strong>Echo Mode HUD</strong>
        <span style={{opacity:0.7}}>Protocol {protocolVersion}</span>
      </div>
      <div style={{marginBottom:6}}>State: <strong>{state}</strong></div>
      <div aria-label="score" title={`score: ${pct}%`}>
        <div style={{height:8, background:'#eee', borderRadius:999}}>
          <div style={{width:`${pct}%`, height:8, borderRadius:999, background:'#60a5fa'}} />
        </div>
        <div style={{fontSize:12, opacity:0.7, marginTop:4}}>{pct}%</div>
      </div>
    </div>
  );
}

export default EchoHud;
