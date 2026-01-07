"use client";

import * as React from "react";
import {
  Home,
  Binoculars,
  List,
  Grid3x3,
  Waves,
  Users,
  Settings,
  PanelRightClose,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const iconItems = [
  { icon: Home, url: "/dashboard", label: "Dashboard" },
  { icon: Binoculars, url: "/dashboard/tests", label: "Studies" },
  { icon: List, url: "/dashboard/tests", label: "Studies" },
  { icon: Grid3x3, url: "/dashboard/tests", label: "Studies" },
  { icon: Waves, url: "/dashboard/streams", label: "Streams" },
  { icon: Users, url: "/dashboard/team", label: "Team" },
  { icon: Settings, url: "/dashboard/settings", label: "Settings" },
];

interface IconRailProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function IconRail({ isExpanded, onToggle }: IconRailProps) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(url);
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-slate-200 bg-white z-10 transition-all duration-300",
        isExpanded ? "w-[240px]" : "w-[72px]"
      )}
    >
      <div
        className={cn(
          "flex flex-col py-4 gap-3 h-full",
          isExpanded ? "px-3" : "items-center px-2"
        )}
      >
        {/* Toggle button */}
        <div className={cn("mb-2", isExpanded ? "px-2" : "")}>
          <button
            onClick={onToggle}
            className="flex items-center justify-center"
            title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <PanelRightClose
              className={cn(
                "cursor-pointer w-[18px] h-[18px] text-slate-600/70 hover:text-slate-600 transition-colors",
                isExpanded ? "" : "rotate-180"
              )}
            />
          </button>
        </div>

        {iconItems.map((item, index) => {
          const active = isActive(item.url);
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.url}
              className={cn(
                "flex items-center gap-3 rounded-xl transition-colors",
                isExpanded ? "px-3 py-2 w-full" : "justify-center w-10 h-10",
                active
                  ? "bg-[#EDEDFF] text-[#623BA5]"
                  : "text-slate-600 hover:bg-slate-100"
              )}
              title={!isExpanded ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {isExpanded && (
                <span className="text-sm font-medium truncate">
                  {item.label}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
