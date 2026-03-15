"use client";

interface BookPageProps {
  children?: React.ReactNode;
}

export default function BookPage({ children }: BookPageProps) {
  return (
    <div className="book-page">
      {children}
    </div>
  );
}
