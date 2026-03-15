"use client";

import Tab from "./Tab";

export const SECTIONS = [
  "ABOUT ME",
  "CASE STUDIES",
  "COMPENDIUM",
  "TRAVEL",
  "READING",
  "ART",
] as const;

export type Section = (typeof SECTIONS)[number];

interface TabStripProps {
  activeTab: Section;
  onTabChange: (tab: Section) => void;
}

export default function TabStrip({ activeTab, onTabChange }: TabStripProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: "1231px",
        top: 0,
        width: "32px",
        height: "667px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        paddingTop: "12px",
      }}
    >
      {SECTIONS.map((section) => (
        <Tab
          key={section}
          label={section}
          active={activeTab === section}
          onClick={() => onTabChange(section)}
        />
      ))}
    </div>
  );
}
