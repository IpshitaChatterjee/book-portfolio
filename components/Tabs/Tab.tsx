"use client";

interface TabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Tab({ label, active, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        flex: "1 0 0",
        minHeight: 0,
        backgroundColor: active ? "#faf8f0" : "#e8dab1",
        borderRadius: "0 4px 4px 0",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px",
        outline: "none",
        position: "relative",
        overflow: "hidden",
        boxShadow: active ? "none" : "inset 4px 0px 4px 0px rgba(107,107,88,0.28)",
      }}
    >
      <span
        style={{
          writingMode: "vertical-lr",
          transform: "rotate(180deg)",
          fontSize: "11px",
          fontFamily: "var(--font-geist-mono)",
          letterSpacing: "0.08em",
          color: "#6b6b58",
          fontWeight: 400,
          textTransform: "uppercase",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </button>
  );
}
