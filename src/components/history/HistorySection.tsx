"use client";

import * as React from "react";
import { HistoryGroup } from "./HistoryGroup";

interface HistoryItem {
  id: string;
  title: string;
}

interface HistoryGroupData {
  id: string;
  title: string;
  items: HistoryItem[];
}

interface HistorySectionProps {
  historyGroups: HistoryGroupData[];
  activeHistoryId: string | null;
  historyOpenGroups: Record<string, boolean>;
  onGroupToggle: (id: string) => void;
  onItemClick: (id: string) => void;
  showMore?: boolean;
  onSeeMore?: () => void;
}

export function HistorySection({
  historyGroups,
  activeHistoryId,
  historyOpenGroups,
  onGroupToggle,
  onItemClick,
  showMore = false,
  onSeeMore,
}: HistorySectionProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm text-peppermint-heavy-violet-40 font-medium px-4">
        History
      </h3>
      <div className="space-y-1">
        {historyGroups.map((group) => (
          <HistoryGroup
            key={group.id}
            id={group.id}
            title={group.title}
            items={group.items}
            isOpen={historyOpenGroups[group.id] || false}
            activeHistoryId={activeHistoryId}
            onToggle={onGroupToggle}
            onItemClick={onItemClick}
            showMore={showMore}
            onSeeMore={onSeeMore}
          />
        ))}
      </div>
    </div>
  );
}
