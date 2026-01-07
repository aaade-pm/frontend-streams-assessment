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
import { FaAppStoreIos } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
interface DataSource {
  id: string;
  name: string;
  date: string;
  summary: string;
}

interface DataSourceListProps {
  dataSources: DataSource[];
}

export function DataSourceList({ dataSources }: DataSourceListProps) {
  const [selectedValue, setSelectedValue] = React.useState("all");
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-peppermint-heavy-violet-40">
          Data Source
        </h3>
        <div className="relative flex items-center">
          <Select
            value={selectedValue}
            onValueChange={setSelectedValue}
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <SelectTrigger
              ref={selectTriggerRef}
              className="h-auto text-sm font-medium text-peppermint-heavy-violet-base  border-none shadow-none pr-4 [&>svg]:hidden focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none cursor-pointer"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <button
            type="button"
            onClick={handleIconClick}
            className="absolute right-0 p-0 cursor-pointer hover:opacity-80 transition-opacity"
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
      </div>

      <ScrollArea className="h-[250px]">
        <div className="space-y-6 md:pr-4">
          {dataSources.map((source) => (
            <div
              key={source.id}
              className="bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 md:gap-0">
                  <span className="text-base font-normal text-peppermint-indigo">
                    {source.name}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-medium text-peppermint-heavy-violet-40 whitespace-nowrap">
                      {source.date}
                    </span>
                    <FaAppStoreIos className="size-4 text-peppermint-heavy-violet-40" />
                  </div>
                </div>
                <p className="text-sm font-normal text-peppermint-heavy-violet-base leading-relaxed line-clamp-2">
                  {source.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
