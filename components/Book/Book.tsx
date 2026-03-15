"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TabStrip, { Section } from "@/components/Tabs/TabStrip";
import PageNav from "@/components/Navigation/PageNav";

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_PAGES   = 12;
const TOTAL_SPREADS = TOTAL_PAGES / 2; // 6

const FLIP_DURATION = 0.6; // seconds — Apple Books is ~0.5–0.65s
const FLIP_EASE     = [0.4, 0, 0.15, 1] as const; // snappy start, soft landing

const PAPER_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")";

// ─── Shared page surface style ─────────────────────────────────────────────────

const pageSurface = (extra?: React.CSSProperties): React.CSSProperties => ({
  backgroundColor: "#faf8f0",
  backgroundImage: PAPER_TEXTURE,
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  ...extra,
});

// ─── Component ────────────────────────────────────────────────────────────────

interface BookProps {
  /** Optional array of up to 12 page contents, one per page index */
  pages?: React.ReactNode[];
}

export default function Book({ pages = [] }: BookProps) {
  const [spread,        setSpread]        = useState(0);
  const [isFlipping,    setIsFlipping]    = useState(false);
  const [flipDir,       setFlipDir]       = useState<"next" | "prev" | null>(null);
  const [pendingSpread, setPendingSpread] = useState(0);
  const [activeTab,     setActiveTab]     = useState<Section>("ABOUT ME");

  const get = (idx: number) => pages[idx] ?? null;

  // ── During animation, base pages already show the destination spread
  //    so they're visible the moment the flipping page passes 90° and reveals them.
  const baseLeft  = isFlipping && flipDir === "prev" ? pendingSpread * 2     : spread * 2;
  const baseRight = isFlipping && flipDir === "next" ? pendingSpread * 2 + 1 : spread * 2 + 1;

  // ── The flipping element: front = the page leaving, back = the page arriving
  const flipFront = flipDir === "next" ? spread * 2 + 1   : spread * 2;
  const flipBack  = flipDir === "next" ? pendingSpread * 2 : pendingSpread * 2 + 1;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleNext = () => {
    if (isFlipping || spread >= TOTAL_SPREADS - 1) return;
    setPendingSpread(spread + 1);
    setFlipDir("next");
    setIsFlipping(true);
  };

  const handlePrev = () => {
    if (isFlipping || spread <= 0) return;
    setPendingSpread(spread - 1);
    setFlipDir("prev");
    setIsFlipping(true);
  };

  const handleFlipComplete = () => {
    setSpread(pendingSpread);
    setIsFlipping(false);
    setFlipDir(null);
  };

  const isNext = flipDir === "next";

  return (
    <div style={{ backgroundColor: "#e8e4dc" }} className="book-backdrop">
      <div className="book-scale-wrapper">

        {/* ── Outer book shell — 1263×749px matching Figma ── */}
        <div style={{ width: "1263px", height: "749px", position: "relative" }}>

          {/* ── Perspective wrapper — 3D context for flip ── */}
          <div style={{
            position: "absolute", inset: 0,
            perspective: "1800px",
            perspectiveOrigin: "50% 50%",
          }}>

            {/* ── Left base page ──────────────────────────────────────────── */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: "51.07%", bottom: "1.2%",
              backgroundColor: "#faf8f0",
              backgroundImage: PAPER_TEXTURE,
              boxShadow: "-8px 0px 24px 0px rgba(26,26,20,0.12)",
            }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                boxShadow: "inset -8px 0px 12px 0px rgba(26,26,20,0.04)" }} />
              {get(baseLeft)}
            </div>

            {/* ── Right base page ─────────────────────────────────────────── */}
            <div style={{
              position: "absolute", top: 0, left: "48.93%", right: "2.53%", bottom: "1.2%",
              backgroundColor: "#faf8f0",
              backgroundImage: PAPER_TEXTURE,
              boxShadow: "8px 0px 24px 0px rgba(26,26,20,0.12)",
            }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
                boxShadow: "inset 8px 0px 12px 0px rgba(26,26,20,0.04)" }} />
              {get(baseRight)}
            </div>

            {/* ── Flipping element (only mounted during animation) ─────────── */}
            {isFlipping && flipDir && (
              <>
                {/* The 3D rotating page ─────────────────────────────────── */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: "1.2%",
                    // Positioned over the half that's turning;
                    // transform-origin on the spine edge so it rotates around it.
                    ...(isNext
                      ? { left: "48.93%", right: "2.53%", transformOrigin: "left center" }
                      : { left: 0, right: "51.07%", transformOrigin: "right center" }),
                    transformStyle: "preserve-3d",
                    zIndex: 20,
                  }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isNext ? -180 : 180 }}
                  transition={{ duration: FLIP_DURATION, ease: FLIP_EASE }}
                  onAnimationComplete={handleFlipComplete}
                >
                  {/* Front face — the page turning away ─────────────────── */}
                  <div style={pageSurface({ backfaceVisibility: "hidden" })}>
                    {get(flipFront)}

                    {/* Spine-edge crease shadow (permanent, subtle) */}
                    <div style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: isNext
                        ? "linear-gradient(to right, rgba(26,26,20,0.06) 0%, transparent 20%)"
                        : "linear-gradient(to left,  rgba(26,26,20,0.06) 0%, transparent 20%)",
                    }} />

                    {/* Darkening sweep — builds as page turns to 90° ────── */}
                    <motion.div
                      style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: isNext
                          ? "linear-gradient(to right, rgba(26,26,20,0.04) 20%, rgba(26,26,20,0.28) 100%)"
                          : "linear-gradient(to left,  rgba(26,26,20,0.04) 20%, rgba(26,26,20,0.28) 100%)",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: FLIP_DURATION * 0.5 }}
                    />
                  </div>

                  {/* Back face — the page arriving ──────────────────────── */}
                  <div style={pageSurface({
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  })}>
                    {get(flipBack)}

                    {/* Highlight from spine — fades as page lands ─────── */}
                    <motion.div
                      style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: isNext
                          ? "linear-gradient(to right, rgba(26,26,20,0.24) 0%, rgba(26,26,20,0.04) 50%, transparent 100%)"
                          : "linear-gradient(to left,  rgba(26,26,20,0.24) 0%, rgba(26,26,20,0.04) 50%, transparent 100%)",
                      }}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: FLIP_DURATION * 0.5, delay: FLIP_DURATION * 0.5 }}
                    />
                  </div>
                </motion.div>

                {/* Cast shadow on the static opposite page ─────────────── */}
                {/* Peaks at 90° (mid-flip), then dissolves as page lands. */}
                <motion.div
                  style={{
                    position: "absolute", top: 0, bottom: "1.2%",
                    ...(isNext
                      ? {
                          left: 0, right: "51.07%",
                          background: "linear-gradient(to left, rgba(26,26,20,0.18) 0%, transparent 60%)",
                        }
                      : {
                          left: "48.93%", right: "2.53%",
                          background: "linear-gradient(to right, rgba(26,26,20,0.18) 0%, transparent 60%)",
                        }),
                    pointerEvents: "none",
                    zIndex: 15,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: FLIP_DURATION, times: [0, 0.48, 1] }}
                />

                {/* Revealed-page edge shadow — sweeps off as page settles */}
                <motion.div
                  style={{
                    position: "absolute", top: 0, bottom: "1.2%",
                    ...(isNext
                      ? {
                          left: "48.93%", right: "2.53%",
                          background: "linear-gradient(to right, rgba(26,26,20,0.14) 0%, transparent 45%)",
                        }
                      : {
                          left: 0, right: "51.07%",
                          background: "linear-gradient(to left, rgba(26,26,20,0.14) 0%, transparent 45%)",
                        }),
                    pointerEvents: "none",
                    zIndex: 5,
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: FLIP_DURATION * 0.55, delay: FLIP_DURATION * 0.45 }}
                />
              </>
            )}
          </div>

          {/* ── Spine — always on top of page layers ── */}
          <div style={{
            position: "absolute",
            top: 0, left: "48.93%", right: "50.91%", bottom: "1.2%",
            backgroundColor: "rgba(196,184,152,0.2)",
            pointerEvents: "none",
            zIndex: 30,
          }} />

          {/* ── Page stack strips ── */}
          <div style={{ position: "absolute", top: "98.8%", left: "0.24%", right: "2.69%", bottom: "0.8%", backgroundColor: "#d8d4c4" }} />
          <div style={{ position: "absolute", top: "99.2%", left: "0.63%", right: "2.85%", bottom: "0.4%", backgroundColor: "#c8c4b4" }} />
          <div style={{ position: "absolute", top: "99.6%", left: "0.79%", right: "3.01%", bottom:  0,    backgroundColor: "#b8b4a4" }} />

          {/* ── Navigation ── */}
          <div style={{ position: "absolute", left: "28px",   top: "690px", zIndex: 35 }}>
            <PageNav side="left"  onPrev={handlePrev} disabled={isFlipping || spread <= 0} />
          </div>
          <div style={{ position: "absolute", left: "1131px", top: "690px", zIndex: 35 }}>
            <PageNav side="right" onNext={handleNext} disabled={isFlipping || spread >= TOTAL_SPREADS - 1} />
          </div>

          {/* ── Tab strip — direct child so left:1231px resolves to book container ── */}
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
