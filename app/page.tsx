import Book from "@/components/Book/Book";
import { AboutMeLeftPage, AboutMeRightPage } from "@/components/pages/AboutMeContent";

export default function Home() {
  const pages = [
    <AboutMeLeftPage key="about-left" />,   // page 0 — About Me left
    <AboutMeRightPage key="about-right" />, // page 1 — About Me right
    // pages 2–11 are undefined → Book renders blank cream pages
  ];
  return <Book pages={pages} />;
}
