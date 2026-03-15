"use client";

import { useState } from "react";
import TabStrip, { SECTIONS, Section } from "@/components/Tabs/TabStrip";
import PageNav from "@/components/Navigation/PageNav";

const PAPER_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")";

interface BookProps {
  leftPage?: React.ReactNode;
  rightPage?: React.ReactNode;
  totalPages?: number;
}

export default function Book({
  leftPage,
  rightPage,
  totalPages = 10,
}: BookProps) {
  const [activeTab, setActiveTab] = useState<Section>("ABOUT ME");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div
      style={{ backgroundColor: "#e8e4dc" }}
      className="book-backdrop"
    >
      <div className="book-scale-wrapper">
        {/* Book base: 1263×749px matching Figma exactly */}
        <div style={{ width: "1263px", height: "749px", position: "relative" }}>

          {/* ── Left page ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: "51.07%",
              bottom: "1.2%",
              backgroundColor: "#faf8f0",
              backgroundImage: PAPER_TEXTURE,
              boxShadow: "-8px 0px 24px 0px rgba(26,26,20,0.12)",
            }}
          >
            {/* inner shadow near spine */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                boxShadow: "inset -8px 0px 12px 0px rgba(26,26,20,0.04)",
              }}
            />
            {leftPage}
          </div>

          {/* ── Right page ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "48.93%",
              right: "2.53%",
              bottom: "1.2%",
              backgroundColor: "#faf8f0",
              backgroundImage: PAPER_TEXTURE,
              boxShadow: "8px 0px 24px 0px rgba(26,26,20,0.12)",
            }}
          >
            {/* inner shadow near spine */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                boxShadow: "inset 8px 0px 12px 0px rgba(26,26,20,0.04)",
              }}
            />
            {rightPage}
          </div>

          {/* ── Spine ── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "48.93%",
              right: "50.91%",
              bottom: "1.2%",
              backgroundColor: "rgba(196,184,152,0.2)",
            }}
          />

          {/* ── Page stack strips ── */}
          <div
            style={{
              position: "absolute",
              top: "98.8%",
              left: "0.24%",
              right: "2.69%",
              bottom: "0.8%",
              backgroundColor: "#d8d4c4",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "99.2%",
              left: "0.63%",
              right: "2.85%",
              bottom: "0.4%",
              backgroundColor: "#c8c4b4",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "99.6%",
              left: "0.79%",
              right: "3.01%",
              bottom: 0,
              backgroundColor: "#b8b4a4",
            }}
          />

          {/* ── Navigation ── */}
          <div style={{ position: "absolute", left: "28px", top: "690px" }}>
            <PageNav
              side="left"
              onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            />
          </div>
          <div style={{ position: "absolute", left: "1131px", top: "690px" }}>
            <PageNav
              side="right"
              onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            />
          </div>

          {/* ── Tab strip ── */}
          <TabStrip activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <style>{`
        .book-backdrop {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .book-scale-wrapper {
          transform-origin: center center;
        }
        @media (max-width: 1310px) {
          .book-backdrop {
            align-items: flex-start;
            padding: 24px;
          }
          .book-scale-wrapper {
            transform: scale(calc((100vw - 48px) / 1263));
            transform-origin: top center;
          }
        }
      `}</style>
    </div>
  );
}
