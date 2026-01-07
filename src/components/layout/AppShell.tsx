"use client";

import * as React from "react";
import { IconRail } from "./IconRail";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookmarksSection } from "@/components/history/BookmarksSection";
import { HistorySection } from "@/components/history/HistorySection";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggle, setMobileOpen } from "@/store/iconRailSlice";
import { usePathname } from "next/navigation";
import {
  Home,
  Binoculars,
  List,
  Grid3x3,
  Waves,
  Users,
  Settings,
} from "lucide-react";

interface Bookmark {
  id: string;
  title: string;
}

interface HistoryGroup {
  id: string;
  title: string;
  items: { id: string; title: string }[];
}

interface AppShellProps {
  children: React.ReactNode;
  bookmarks: Bookmark[];
  historyGroups: HistoryGroup[];
  activePanel: "none" | "history";
  activeBookmarkId: string | null;
  activeHistoryId: string | null;
  historyOpenGroups: Record<string, boolean>;
  onBookmarkClick: (id: string) => void;
  onHistoryItemClick: (id: string) => void;
  onHistoryGroupToggle: (id: string) => void;
}

/**
 * AppShell renders the three-zone layout:
 * 1. IconRail (primary sidebar) - fixed left
 * 2. ContextPanel (secondary sidebar) - fixed, shows Bookmarks + History
 * 3. MainContent (fluid) - Ask Stream page content
 *
 * Desktop: Shows all three zones side by side
 * Mobile: Hides IconRail and ContextPanel, shows MainContent full width
 */
export function AppShell({
  children,
  bookmarks,
  historyGroups,
  activePanel,
  activeBookmarkId,
  activeHistoryId,
  historyOpenGroups,
  onBookmarkClick,
  onHistoryItemClick,
  onHistoryGroupToggle,
}: AppShellProps) {
  const isMobile = useIsMobile();
  const [isPanelOpenMobile, setIsPanelOpenMobile] = React.useState(false);
  const isIconRailExpanded = useAppSelector(
    (state) => state.iconRail.isExpanded
  );
  const isMobileSidebarOpen = useAppSelector(
    (state) => state.iconRail.isMobileOpen
  );
  const dispatch = useAppDispatch();

  const handleIconRailToggle = () => {
    dispatch(toggle());
  };

  const handleMobileSidebarClose = (open: boolean) => {
    dispatch(setMobileOpen(open));
  };

  const contextPanelContent = (
    <>
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
    </>
  );

  // IconRail content for mobile drawer
  const IconRailContent = () => {
    const pathname = usePathname();

    const iconItems = [
      { icon: Home, url: "/dashboard", label: "Dashboard" },
      { icon: Binoculars, url: "/dashboard/tests", label: "Studies" },
      { icon: List, url: "/dashboard/tests", label: "Studies" },
      { icon: Grid3x3, url: "/dashboard/tests", label: "Studies" },
      { icon: Waves, url: "/dashboard/streams", label: "Streams" },
      { icon: Users, url: "/dashboard/team", label: "Team" },
      { icon: Settings, url: "/dashboard/settings", label: "Settings" },
    ];

    const isActive = (url: string) => {
      if (url === "/dashboard") {
        return pathname === "/dashboard";
      }
      return pathname?.startsWith(url);
    };

    return (
      <div className="flex flex-col gap-2">
        {iconItems.map((item, index) => {
          const active = isActive(item.url);
          const Icon = item.icon;
          return (
            <a
              key={index}
              href={item.url}
              onClick={() => handleMobileSidebarClose(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-xl transition-colors",
                active
                  ? "bg-[#EDEDFF] text-[#623BA5]"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-white">
      {/* IconRail - Desktop only */}
      {!isMobile && (
        <IconRail
          isExpanded={isIconRailExpanded}
          onToggle={handleIconRailToggle}
        />
      )}

      {/* ContextPanel - Mobile: drawer only (Desktop renders inline in main content) */}

      {/* Mobile drawer for IconRail (Sidebar) */}
      {isMobile && (
        <Sheet
          open={isMobileSidebarOpen}
          onOpenChange={handleMobileSidebarClose}
        >
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader className="p-6 pb-0">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <IconRailContent />
            </div>
          </SheetContent>
        </Sheet>
      )}

      {/* Mobile drawer for ContextPanel */}
      {isMobile && (
        <Sheet open={isPanelOpenMobile} onOpenChange={setIsPanelOpenMobile}>
          <SheetContent side="left" className="w-[280px] p-0">
            <SheetHeader className="p-6 pb-0">
              <SheetTitle>History</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">{contextPanelContent}</div>
          </SheetContent>
        </Sheet>
      )}

      {/* MainContent - fluid, adjusts based on IconRail state only */}
      <main
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-300",
          !isMobile && isIconRailExpanded && "ml-[240px]", // 240px (IconRail expanded)
          !isMobile && !isIconRailExpanded && "ml-[72px]" // 72px (IconRail only)
        )}
      >
        <div className="p-0">{children}</div>
      </main>
    </div>
  );
}
