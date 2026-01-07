"use client";

import * as React from "react";
import { BookmarksSection } from "@/components/history/BookmarksSection";
import { HistorySection } from "@/components/history/HistorySection";
import { cn } from "@/lib/utils";

interface Bookmark {
  id: string;
  title: string;
}

interface HistoryGroup {
  id: string;
  title: string;
  items: { id: string; title: string }[];
}

interface ContextPanelProps {
  bookmarks: Bookmark[];
  historyGroups: HistoryGroup[];
  activeBookmarkId: string | null;
  activeHistoryId: string | null;
  historyOpenGroups: Record<string, boolean>;
  onBookmarkClick: (id: string) => void;
  onHistoryItemClick: (id: string) => void;
  onHistoryGroupToggle: (id: string) => void;
  iconRailExpanded?: boolean;
}

/**
 * ContextPanel is a secondary sidebar. It is not part of main content.
 * It shows Bookmarks and History sections.
 */
export function ContextPanel({
  bookmarks,
  historyGroups,
  activeBookmarkId,
  activeHistoryId,
  historyOpenGroups,
  onBookmarkClick,
  onHistoryItemClick,
  onHistoryGroupToggle,
  iconRailExpanded = false,
}: ContextPanelProps) {
  return (
    <div
      className={cn(
        "fixed top-0 h-[] w-[280px] border-2 border-blue-600 bg-white overflow-y-auto z-10 transition-all duration-300",
        iconRailExpanded ? "left-[240px]" : "left-[72px]"
      )}
    >
      <div className="py-6 space-y-6">
        <BookmarksSection
          bookmarks={bookmarks}
          activeBookmarkId={activeBookmarkId}
          onBookmarkClick={onBookmarkClick}
        />
        <HistorySection
          historyGroups={historyGroups}
          activeHistoryId={activeHistoryId}
          historyOpenGroups={historyOpenGroups}
          onGroupToggle={onHistoryGroupToggle}
          onItemClick={onHistoryItemClick}
        />
      </div>
    </div>
  );
}
