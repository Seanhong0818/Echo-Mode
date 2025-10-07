// SPDX-License-Identifier: Apache-2.0
import React from "react";

type Score = { sync: number; res?: number; insight?: number; calm?: number };
type Props = { state: string; score: Score };

export const EchoHud: React.FC<Props> = ({ state, score }) => {
  const colorMap: Record<string, string> = {
    Sync: "#3b82f6",
    Resonance: "#10b981",
    Insight: "#f59e0b",
    Calm: "#64748b"
  };
  const color = colorMap[state] ?? "#6b7280";

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: `${color}20`,
        border: `2px solid ${color}`,
        width: "250px",
        fontFamily: "Inter, sans-serif"
      }}
    >
      <h3 style={{ color }}>{state}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {Object.entries(score).map(([k, v]) => (
          <li key={k}>
            {k}: {(v * 100).toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
};
