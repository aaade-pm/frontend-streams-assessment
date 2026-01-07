"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Bookmark {
  id: string;
  title: string;
}

interface BookmarksSectionProps {
  bookmarks: Bookmark[];
  activeBookmarkId: string | null;
  onBookmarkClick: (id: string) => void;
}

export function BookmarksSection({
  bookmarks,
  activeBookmarkId,
  onBookmarkClick,
}: BookmarksSectionProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-sm text-peppermint-heavy-violet-40 font-medium px-4">
        Bookmarks
      </h3>
      <div className="space-y-1">
        {bookmarks.map((bookmark) => (
          <button
            key={bookmark.id}
            onClick={() => onBookmarkClick(bookmark.id)}
            className={cn(
              "w-full text-left px-4 py-2 rounded-sm transition-colors text-sm text-peppermint-heavy-violet-base",
              activeBookmarkId === bookmark.id
                ? "bg-peppermint-indigo-90 py-3"
                : "hover:bg-slate-50 hover:py-3"
            )}
          >
            {bookmark.title}
          </button>
        ))}
      </div>
    </div>
  );
}
