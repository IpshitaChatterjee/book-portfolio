"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";

// ─── Asset URLs (local — served from /public/images/) ─────────────────────────

const IMG_PORTRAIT       = "/images/portrait.png";
const IMG_STAR           = "/images/star.png";
const IMG_CHASE_LOGO     = "/images/chase-logo.png";
const IMG_CHASE_PHOTO    = "/images/chase-photo.jpg";
const IMG_EY_LOGO        = "/images/ey-logo.png";
const IMG_EY_PHOTO       = "/images/ey-photo.jpg";
const IMG_UXREACTOR_LOGO = "/images/uxreactor-logo.png";
const IMG_INFOSYS_LOGO   = "/images/infosys-logo.png";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Renders a monochrome logo via CSS mask-image technique */
function MaskedLogo({
  src, color, width, height,
  maskW, maskH, maskX = 0, maskY = 0,
}: {
  src: string; color: string;
  width: number; height: number;
  maskW: number; maskH: number;
  maskX?: number; maskY?: number;
}) {
  return (
    <div style={{
      width, height, flexShrink: 0,
      backgroundColor: color,
      maskImage: `url('${src}')`,
      WebkitMaskImage: `url('${src}')`,
      maskSize: `${maskW}px ${maskH}px`,
      WebkitMaskSize: `${maskW}px ${maskH}px`,
      maskPosition: `${maskX}px ${maskY}px`,
      WebkitMaskPosition: `${maskX}px ${maskY}px`,
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
    } as React.CSSProperties} />
  );
}

// ─── Work Experience Accordion Item ───────────────────────────────────────────

interface WorkItemProps {
  role: string;
  period: string;
  logo: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
  hasBorder?: boolean;
  description?: string;
  photo?: { src: string; caption: string };
}

function WorkItem({ role, period, logo, expanded, onToggle, hasBorder = true, description, photo }: WorkItemProps) {
  return (
    <div style={{
      borderBottom: hasBorder ? "1.5px solid #f0e8d0" : "none",
      display: "flex",
      flexDirection: "column",
      width: "100%",
    }}>
      {/* Header row — always visible */}
      <div
        onClick={onToggle}
        style={{
          display: "flex", gap: 9, alignItems: "flex-start",
          width: "100%",
          paddingTop: 12, paddingBottom: expanded ? 0 : 12,
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      >
        {expanded
          ? <Minus size={24} weight="light" color="#1a1a14" style={{ flexShrink: 0 }} />
          : <Plus  size={24} weight="light" color="#1a1a14" style={{ flexShrink: 0 }} />
        }
        <div style={{ flex: "1 0 0", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <p style={{
              flex: "1 0 0",
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: 18, lineHeight: "28px",
              color: "#1a1a14", margin: 0,
            }}>
              {role}
            </p>
            {logo}
          </div>
          <p style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12, lineHeight: "18px",
            color: "rgba(107,107,88,0.7)",
            letterSpacing: "0.24px", margin: 0, marginTop: 4,
          }}>
            {period}
          </p>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && description && (
        <div style={{
          display: "flex", gap: 52, alignItems: "flex-start",
          paddingLeft: 32, paddingTop: 20, paddingBottom: 24, width: "100%",
        }}>
          <p style={{
            flex: "1 0 0", minWidth: 0,
            fontFamily: "var(--font-geist-sans), sans-serif",
            fontSize: 12, lineHeight: "16px",
            color: "#6b6b58", margin: 0,
          }}>
            {description}
          </p>
          {photo && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 211, flexShrink: 0 }}>
              <img
                src={photo.src}
                alt={photo.caption}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  filter: "grayscale(1)",
                }}
              />
              <p style={{
                fontFamily: "var(--font-geist-sans), sans-serif",
                fontSize: 10, lineHeight: "12px",
                color: "rgba(107,107,88,0.7)",
                textAlign: "right", margin: 0,
              }}>
                {photo.caption}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Left Page ────────────────────────────────────────────────────────────────
// Layout mirrors the Figma "Left Page" node: a flex row at left:28, top:28,
// height:634, items-end — portrait on the left, text column on the right.

export function AboutMeLeftPage() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>

      {/* Flex row anchored to bottom-left, matching Figma left:28 top:28 h:634 */}
      <div style={{
        position: "absolute",
        left: 28, top: 28,
        height: 634,
        display: "flex",
        flexDirection: "row",
        gap: 18,
        alignItems: "flex-end",
      }}>

        {/* Portrait — 285×634, grayscale, image cropped inside */}
        <div style={{
          width: 285, height: 634,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}>
          <img
            alt="Ipshita Chatterjee"
            src={IMG_PORTRAIT}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              display: "block",
              filter: "grayscale(1)",
            }}
          />
        </div>

        {/* Text column — PORTFOLIO 2026 at top, name+bio at bottom */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>

          {/* PORTFOLIO 2026 — top, right-aligned */}
          <p style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12, lineHeight: "18px",
            color: "rgba(107,107,88,0.7)",
            letterSpacing: "0.24px",
            margin: 0, whiteSpace: "nowrap",
          }}>
            PORTFOLIO 2026
          </p>

          {/* Name + Bio — bottom, left-aligned within column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
            <p style={{
              fontFamily: "'Geist Pixel', var(--font-geist-mono), monospace",
              fontSize: 24, lineHeight: "32px",
              color: "#1a1a14", margin: 0,
            }}>
              Ipshita Chatterjee
            </p>
            <div style={{
              fontFamily: "var(--font-geist-sans), sans-serif",
              fontSize: 14, lineHeight: "19px",
              color: "#6b6b58", width: 257,
            }}>
              <p style={{ margin: 0 }}>
                Design engineer and product designer with 7 years of experience in fintech and enterprise software domains.
              </p>
              <p style={{ margin: 0 }}>Finding my next chapter in Germany</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

// ─── Right Page ───────────────────────────────────────────────────────────────
// Single flex-column anchored at left:28, top:28 — mirrors the left page margin.

export function AboutMeRightPage() {
  const [expanded, setExpanded] = useState<number | null>(0);
  const toggle = (idx: number) => setExpanded(expanded === idx ? null : idx);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>

      {/* Outer flex column — starts at the same 28px margin as the left page */}
      <div style={{
        position: "absolute", left: 28, top: 28, right: 28, bottom: 78,
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>

        {/* Star icon + Main heading */}
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <div style={{
            width: 35, height: 36, flexShrink: 0,
            backgroundColor: "#6b6b58",
            maskImage: `url('${IMG_STAR}')`,
            WebkitMaskImage: `url('${IMG_STAR}')`,
            maskSize: "35px 36px",
            WebkitMaskSize: "35px 36px",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          } as React.CSSProperties} />
          <p style={{
            fontFamily: "'Geist Pixel', var(--font-geist-mono), monospace",
            fontSize: 40, lineHeight: "48px",
            color: "#1a1a14", margin: 0, fontStyle: "normal",
          }}>
            I build what I design
          </p>
        </div>

        {/* Work Experience Accordion */}
        <div style={{ display: "flex", flexDirection: "column" }}>
        <WorkItem
          role="Associate UX Designer"
          period="2025 - Present"
          logo={
            <MaskedLogo
              src={IMG_CHASE_LOGO} color="#1e1e1e"
              width={81} height={15}
              maskW={80.634} maskH={14.993}
              maskX={0} maskY={-0.009}
            />
          }
          expanded={expanded === 0}
          onToggle={() => toggle(0)}
          description="Designing employee tools for Chase's Home Lending vertical, helping advisors match customers with the right mortgage product. Led an AI-powered assistant POC that secured 5 years of additional team investment. Also converting Figma designs to code via Copilot for smoother developer handoffs."
          photo={{
            src: IMG_CHASE_PHOTO,
            caption: "Getting a challenge coin award from Chase's Chief Design Officer - Miki Van Cleave.",
          }}
        />
        <WorkItem
          role="Senior UX Consultant"
          period="2022 - 2025"
          logo={
            <MaskedLogo
              src={IMG_EY_LOGO} color="#1a1a14"
              width={28} height={28}
              maskW={27.719} maskH={28}
            />
          }
          expanded={expanded === 1}
          onToggle={() => toggle(1)}
          description="Designing employee tools for Chase's Home Lending vertical, helping advisors match customers with the right mortgage product. Led an AI-powered assistant POC that secured 5 years of additional team investment. Also converting Figma designs to code via Copilot for smoother developer handoffs."
          photo={{
            src: IMG_EY_PHOTO,
            caption: "Celebratory gathering with the EY client",
          }}
        />
        <WorkItem
          role="Senior Visual Designer"
          period="2021 - 2022"
          logo={
            <MaskedLogo
              src={IMG_UXREACTOR_LOGO} color="#1a1a14"
              width={24} height={29}
              maskW={23.177} maskH={28.364}
            />
          }
          expanded={expanded === 2}
          onToggle={() => toggle(2)}
          description="Description coming soon."
        />
        <WorkItem
          role="Systems Engineer"
          period="2018 - 2021"
          logo={
            <MaskedLogo
              src={IMG_INFOSYS_LOGO} color="#1a1a14"
              width={56} height={22}
              maskW={52.5} maskH={21}
              maskX={0.5} maskY={0.864}
            />
          }
          expanded={expanded === 3}
          onToggle={() => toggle(3)}
          hasBorder={false}
          description="Description coming soon."
        />
        </div>{/* end accordion */}
      </div>{/* end outer flex column */}

    </div>
  );
}
