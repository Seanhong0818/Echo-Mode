import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const EchoHud = ({ state, score }) => {
    const colorMap = {
        Sync: "#3b82f6",
        Resonance: "#10b981",
        Insight: "#f59e0b",
        Calm: "#64748b"
    };
    const color = colorMap[state] ?? "#6b7280";
    return (_jsxs("div", { style: {
            padding: "1rem",
            borderRadius: "1rem",
            backgroundColor: `${color}20`,
            border: `2px solid ${color}`,
            width: "250px",
            fontFamily: "Inter, sans-serif"
        }, children: [_jsx("h3", { style: { color }, children: state }), _jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0 }, children: Object.entries(score).map(([k, v]) => (_jsxs("li", { children: [k, ": ", (v * 100).toFixed(1), "%"] }, k))) })] }));
};
