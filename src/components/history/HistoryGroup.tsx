"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface HistoryItem {
  id: string;
  title: string;
}

interface HistoryGroupProps {
  id: string;
  title: string;
  items: HistoryItem[];
  isOpen: boolean;
  activeHistoryId: string | null;
  onToggle: (id: string) => void;
  onItemClick: (id: string) => void;
  showMore?: boolean;
  onSeeMore?: () => void;
}

export function HistoryGroup({
  id,
  title,
  items,
  isOpen,
  activeHistoryId,
  onToggle,
  onItemClick,
  showMore = false,
  onSeeMore,
}: HistoryGroupProps) {
  const displayItems = showMore ? items : items.slice(0, 3);
  const hasMoreItems = items.length > 3;

  return (
    <Collapsible open={isOpen} onOpenChange={() => onToggle(id)}>
      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-slate-50 transition-colors">
        <span className="text-sm text-peppermint-heavy-violet-base">
          {title}
        </span>
        {items.length > 0 && (
          <ChevronDown
            className={cn(
              "size-3 text-peppermint-heavy-violet-bases transition-transform",
              isOpen && "rotate-180"
            )}
            fill="#4f566b"
            strokeWidth={2.5}
          />
        )}
      </CollapsibleTrigger>
      {displayItems.length > 0 && (
        <CollapsibleContent>
          <div className="mt-1 space-y-1">
            {displayItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={cn(
                  "w-full text-left px-4 py-2 rounded-lg transition-colors text-sm text-peppermint-heavy-violet-base",
                  activeHistoryId === item.id
                    ? "bg-peppermint-indigo-90 py-3"
                    : "hover:bg-slate-50 hover:py-3"
                )}
              >
                {item.title}
              </button>
            ))}
            {hasMoreItems && !showMore && onSeeMore && (
              <button
                onClick={onSeeMore}
                className="w-full text-left px-4 py-2 text-sm text-peppermint-heavy-violet-base hover:bg-slate-50 rounded-lg transition-colors mt-1"
              >
                See more
              </button>
            )}
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
}
