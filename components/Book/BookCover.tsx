"use client";

interface BookCoverProps {
  title?: string;
}

export default function BookCover({ title }: BookCoverProps) {
  return (
    <div className="book-cover bg-forest text-parchment">
      {title && <h1 className="text-3xl font-sans">{title}</h1>}
    </div>
  );
}
