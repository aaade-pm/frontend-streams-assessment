"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Skeleton loader for section cards
 */
export function SectionCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("p-6 space-y-4", className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  );
}

/**
 * Skeleton loader for bookmarks list
 */
export function BookmarksSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-5 w-32 mb-4" />
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}

/**
 * Skeleton loader for history groups
 */
export function HistorySkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-5 w-32 mb-4" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton loader for data source list
 */
export function DataSourceSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-16" />
      </div>
      <div className="space-y-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4 rounded" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton loader for stacked cards
 */
export function StackedCardsSkeleton() {
  return (
    <div className="relative flex h-full place-items-center justify-center w-full pt-7">
      <div className="relative h-60 w-60 md:h-60 md:w-96">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="absolute h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 border border-slate-200 bg-white shadow-xl"
            style={{
              top: `${index * -10}px`,
              transform: `scale(${1 - index * 0.06}) rotate(${index * 2}deg)`,
              zIndex: 3 - index,
            }}
          >
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton loader for ask bar
 */
export function AskBarSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-14 w-64" />
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="border border-slate-200 rounded-xl p-4 space-y-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
