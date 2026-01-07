"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { AskStreamHeader } from "@/components/askstream/AskStreamHeader";
import { AskBar } from "@/components/askstream/AskBar";
import { SectionCard } from "@/components/askstream/SectionCard";
import { StackedCards } from "@/components/askstream/StackedCards";
import { DataSourceList } from "@/components/askstream/DataSourceList";
import { BookmarksSection } from "@/components/history/BookmarksSection";
import { HistorySection } from "@/components/history/HistorySection";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkle, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleMobile } from "@/store/iconRailSlice";
import { useIsMobile } from "@/hooks/use-mobile";
import askStreamData from "@/data/askStream.json";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { EmptyState } from "@/components/ui/empty-state";
import {
  SectionCardSkeleton,
  BookmarksSkeleton,
  HistorySkeleton,
  DataSourceSkeleton,
  StackedCardsSkeleton,
  AskBarSkeleton,
} from "@/components/ui/loading-skeletons";

// Loading state - simulate async data loading
const LOADING_DELAY = 1000; // 1 second for demo purposes

export default function Streams() {
  const isIconRailExpanded = useAppSelector(
    (state) => state.iconRail.isExpanded
  );
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();

  // Loading state
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState(askStreamData);
  const [error, setError] = React.useState<Error | null>(null);

  // Simulate data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setData(askStreamData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to load data"));
        setIsLoading(false);
      }
    }, LOADING_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = React.useCallback(() => {
    dispatch(toggleMobile());
  }, [dispatch]);

  // State management
  const [activePanel] = React.useState<"none" | "history">("history");
  const [activeBookmarkId, setActiveBookmarkId] = React.useState<string | null>(
    null
  );
  const [activeHistoryId, setActiveHistoryId] = React.useState<string | null>(
    null
  );
  const [historyOpenGroups, setHistoryOpenGroups] = React.useState<
    Record<string, boolean>
  >({
    today: false,
    last7: false,
    november: false,
  });
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = React.useState(false);

  // Memoized callbacks to prevent unnecessary re-renders
  const handleShowHistory = React.useCallback(() => {
    setIsHistoryDialogOpen(true);
  }, []);

  const handleSeeMore = React.useCallback(() => {
    setIsHistoryDialogOpen(true);
  }, []);

  const handleBookmarkClick = React.useCallback((id: string) => {
    setActiveBookmarkId(id);
    setActiveHistoryId(null);
  }, []);

  const handleHistoryItemClick = React.useCallback((id: string) => {
    setActiveHistoryId(id);
    setActiveBookmarkId(null);
  }, []);

  const handleHistoryGroupToggle = React.useCallback((id: string) => {
    setHistoryOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  // Memoize stacked cards data to avoid recreating on every render
  const stackedCardsData = React.useMemo(
    () => data.stackedCards || [],
    [data.stackedCards]
  );

  const hasBookmarks = data.bookmarks && data.bookmarks.length > 0;
  const hasHistory = data.historyGroups && data.historyGroups.length > 0;
  const hasDataSources = data.dataSources && data.dataSources.length > 0;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <EmptyState
          title="Failed to load data"
          description={error.message}
          icon={<Menu className="w-12 h-12 text-red-500" />}
        />
      </div>
    );
  }

  return (
    <AppShell
      bookmarks={data.bookmarks}
      historyGroups={data.historyGroups}
      activePanel={activePanel}
      activeBookmarkId={activeBookmarkId}
      activeHistoryId={activeHistoryId}
      historyOpenGroups={historyOpenGroups}
      onBookmarkClick={handleBookmarkClick}
      onHistoryItemClick={handleHistoryItemClick}
      onHistoryGroupToggle={handleHistoryGroupToggle}
    >
      <div className="flex flex-col h-full w-full">
        {/* Mobile Menu Bar */}
        {isMobile && (
          <div className="sticky top-0 z-50 bg-white border-b border-peppermint-chapeau-violet">
            <button
              onClick={handleMenuClick}
              className="w-full p-3 hover:bg-slate-100 transition-colors flex items-center justify-start"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-peppermint-heavy-violet-base" />
            </button>
          </div>
        )}
        <AskStreamHeader onShowHistory={handleShowHistory} />
        <ScrollArea className="flex-1">
          <section className="flex flex-col min-h-[30vh] justify-start pt-6">
            {isLoading ? <AskBarSkeleton /> : <AskBar />}
          </section>

          {/* Dashboard Grid */}
          <div
            className={cn(
              "w-full flex flex-col gap-6 border-t border-peppermint-heavy-violet-90",
              activePanel === "history" &&
                !isIconRailExpanded &&
                "xl:grid xl:grid-cols-[20%_1fr]"
            )}
          >
            {/* Left Sidebar - Bookmarks & History (Desktop only, inside main content) */}
            {activePanel === "history" && !isIconRailExpanded && (
              <div className="hidden xl:block">
                <div className="sticky h-full top-14 pt-3 pb-12 px-1 border-r shadow-sm border-peppermint-heavy-violet-90 flex flex-col">
                  <ScrollArea className="flex-1">
                    <div className="space-y-8 pr-4">
                      {isLoading ? (
                        <>
                          <BookmarksSkeleton />
                          <HistorySkeleton />
                        </>
                      ) : (
                        <>
                          {hasBookmarks ? (
                            <BookmarksSection
                              bookmarks={data.bookmarks}
                              activeBookmarkId={activeBookmarkId}
                              onBookmarkClick={handleBookmarkClick}
                            />
                          ) : (
                            <EmptyState
                              title="No bookmarks"
                              description="Your saved bookmarks will appear here"
                              icon="bookmarks"
                            />
                          )}
                          {hasHistory ? (
                            <HistorySection
                              historyGroups={data.historyGroups}
                              activeHistoryId={activeHistoryId}
                              historyOpenGroups={historyOpenGroups}
                              onGroupToggle={handleHistoryGroupToggle}
                              onItemClick={handleHistoryItemClick}
                              showMore={false}
                              onSeeMore={handleSeeMore}
                            />
                          ) : (
                            <EmptyState
                              title="No history"
                              description="Your search history will appear here"
                              icon="history"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </ScrollArea>
                  <div className="pt-4 px-4 flex items-center gap-2.5 shrink-0">
                    <Badge className="bg-peppermint-indigo-90 text-peppermint-base text-xs px-3 py-1 rounded-sm border-0">
                      <Sparkle className="size-2.5 mr-1" fill="#625afa" />
                      Beta
                    </Badge>
                    <p className="text-xs text-peppermint-heavy-violet-40 font-medium">
                      Knowledge Base
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content Sections */}
            <div
              className={cn(
                "w-full flex flex-col h-full gap-8 lg:gap-0 py-8 px-8 xl:px-0",
                "xl:w-[92%] 2xl:w-[85%]",
                isIconRailExpanded && "xl:mx-auto"
              )}
            >
              {/* Top Row: Section 1 and Section 2 */}
              <div className="min-h-[350px] lg:h-[350px] w-full flex flex-col gap-8 lg:gap-0 lg:flex-row">
                {/* Section 1 */}
                <div className="h-full w-full lg:w-1/2 py-8 lg:py-4 rounded-xl lg:rounded-tl-2xl lg:rounded-bl-none lg:rounded-br-none lg:rounded-tr-none border border-peppermint-heavy-violet-90 lg:shadow-[-2px_-2px_4px_rgba(0,0,0,0.08)]">
                  {isLoading ? (
                    <SectionCardSkeleton />
                  ) : (
                    <ErrorBoundary>
                      <SectionCard
                        title={data.sections.section1.title}
                        headline={data.sections.section1.headline}
                        body={data.sections.section1.body}
                        showChip
                      />
                    </ErrorBoundary>
                  )}
                </div>

                {/* Section 2 */}
                <div className="h-full w-full lg:w-1/2 py-8 lg:py-4 px-6 rounded-xl lg:rounded-tr-2xl lg:rounded-bl-none lg:rounded-br-none lg:rounded-tl-none border border-peppermint-heavy-violet-90 lg:shadow-[2px_-2px_4px_rgba(0,0,0,0.08)]">
                  {isLoading ? (
                    <StackedCardsSkeleton />
                  ) : (
                    <ErrorBoundary>
                      <StackedCards cards={stackedCardsData} />
                    </ErrorBoundary>
                  )}
                </div>
              </div>

              {/* Bottom Row: Section 3 and Data Source */}
              <div className="min-h-[350px] lg:h-[350px] w-full flex flex-col gap-8 lg:gap-0 lg:flex-row">
                {/* Section 3 */}
                <div className="h-full w-full lg:w-1/2 py-8 lg:py-4 rounded-xl lg:rounded-bl-2xl lg:rounded-br-none lg:rounded-tl-none lg:rounded-tr-none border border-peppermint-heavy-violet-90 lg:shadow-[-2px_2px_4px_rgba(0,0,0,0.08)] flex flex-col">
                  {isLoading ? (
                    <SectionCardSkeleton />
                  ) : (
                    <ErrorBoundary>
                      <SectionCard
                        title={data.sections.section3.title}
                        headline={data.sections.section3.headline}
                        body={data.sections.section3.body}
                      />
                    </ErrorBoundary>
                  )}
                </div>

                {/* Data Source */}
                <div className="h-full w-full lg:w-1/2 px-6 py-8 lg:py-4 rounded-xl lg:rounded-br-2xl lg:rounded-bl-none lg:rounded-tl-none lg:rounded-tr-none border border-peppermint-heavy-violet-90 lg:shadow-[2px_2px_4px_rgba(0,0,0,0.08)] flex flex-col">
                  {isLoading ? (
                    <DataSourceSkeleton />
                  ) : hasDataSources ? (
                    <ErrorBoundary>
                      <DataSourceList dataSources={data.dataSources} />
                    </ErrorBoundary>
                  ) : (
                    <EmptyState
                      title="No data sources"
                      description="Data sources will appear here"
                      icon="dataSource"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>History</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(80vh-4rem)]">
            <div className="space-y-6 mt-4 pr-4">
              {isLoading ? (
                <>
                  <BookmarksSkeleton />
                  <HistorySkeleton />
                </>
              ) : (
                <>
                  {hasBookmarks ? (
                    <BookmarksSection
                      bookmarks={data.bookmarks}
                      activeBookmarkId={activeBookmarkId}
                      onBookmarkClick={handleBookmarkClick}
                    />
                  ) : (
                    <EmptyState
                      title="No bookmarks"
                      description="Your saved bookmarks will appear here"
                      icon="bookmarks"
                    />
                  )}
                  {hasHistory ? (
                    <HistorySection
                      historyGroups={data.historyGroups}
                      activeHistoryId={activeHistoryId}
                      historyOpenGroups={historyOpenGroups}
                      onGroupToggle={handleHistoryGroupToggle}
                      onItemClick={handleHistoryItemClick}
                      showMore={true}
                    />
                  ) : (
                    <EmptyState
                      title="No history"
                      description="Your search history will appear here"
                      icon="history"
                    />
                  )}
                </>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
