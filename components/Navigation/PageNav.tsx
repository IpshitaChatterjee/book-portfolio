"use client";

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8H14M14 8L10 4M14 8L10 12"
        stroke="#6b6b58"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 8H2M2 8L6 4M2 8L6 12"
        stroke="#6b6b58"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const btnStyle = (disabled: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "11px",
  fontFamily: "var(--font-geist-mono)",
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#6b6b58",
  background: "none",
  border: "none",
  padding: "0 12px",
  cursor: disabled ? "default" : "pointer",
  opacity: disabled ? 0.3 : 1,
  lineHeight: "22px",
});

interface PageNavProps {
  side: "left" | "right";
  onPrev?: () => void;
  onNext?: () => void;
  disabled?: boolean;
}

export default function PageNav({
  side,
  onPrev,
  onNext,
  disabled = false,
}: PageNavProps) {
  if (side === "left") {
    return (
      <button onClick={onPrev} disabled={disabled} style={btnStyle(disabled)}>
        <ArrowLeft />
        <span>PREVIOUS</span>
      </button>
    );
  }

  return (
    <button onClick={onNext} disabled={disabled} style={btnStyle(disabled)}>
      <span>NEXT</span>
      <ArrowRight />
    </button>
  );
}
