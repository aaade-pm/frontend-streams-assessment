"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AskStreamHeaderProps {
  onShowHistory: () => void;
}

export function AskStreamHeader({ onShowHistory }: AskStreamHeaderProps) {
  const [selectedValue, setSelectedValue] = React.useState("ask-stream-beta");
  const [isOpen, setIsOpen] = React.useState(false);
  const selectTriggerRef = React.useRef<HTMLButtonElement>(null);

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectTriggerRef.current) {
      selectTriggerRef.current.focus();
      selectTriggerRef.current.click();
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center justify-between h-14 px-6 border-b border-peppermint-chapeau-violet">
      <div className="relative flex items-center">
        <Select
          value={selectedValue}
          onValueChange={setSelectedValue}
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <SelectTrigger
            ref={selectTriggerRef}
            className="text-peppermint-heavy-violet-base border-none shadow-none p-0 pr-4 [&>svg]:hidden focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none cursor-pointer"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="ask-stream-beta">Ask Stream (Beta)</SelectItem>
            <SelectItem value="ask-stream-v1.0">Ask Stream (v1.0)</SelectItem>
            <SelectItem value="ask-stream-v1.1">Ask Stream (v1.1)</SelectItem>
            <SelectItem value="ask-stream-v1.2">Ask Stream (v1.2)</SelectItem>
            <SelectItem value="ask-stream-v1.3">Ask Stream (v1.3)</SelectItem>
          </SelectContent>
        </Select>
        <button
          type="button"
          onClick={handleIconClick}
          className="absolute -right-2 p-1 cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Open dropdown"
        >
          <ChevronDown
            className={cn(
              "size-3 text-peppermint-heavy-violet-base transition-transform",
              isOpen && "rotate-180"
            )}
            fill="#4f566b"
            strokeWidth={2.5}
          />
        </button>
      </div>
      <button
        onClick={onShowHistory}
        className="text-sm font-medium text-peppermint-heavy-violet-base transition-colors"
      >
        Show History
      </button>
    </div>
  );
}
