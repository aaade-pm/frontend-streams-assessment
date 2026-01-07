"use client";

import * as React from "react";
import { FileX, BookOpen, History, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode | string;
  title: string;
  description?: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  bookmarks: BookOpen,
  history: History,
  dataSource: Database,
  default: FileX,
};

/**
 * EmptyState component for displaying when there's no data to show
 * Provides consistent empty state UI across the application
 */
export const EmptyState = React.memo(function EmptyState({
  icon,
  title,
  description,
  className,
}: EmptyStateProps) {
  let IconComponent: React.ReactNode;

  if (typeof icon === "string" && iconMap[icon]) {
    const Icon = iconMap[icon];
    IconComponent = <Icon className="w-12 h-12 text-slate-400 mb-4" />;
  } else if (React.isValidElement(icon)) {
    IconComponent = icon;
  } else {
    const DefaultIcon = iconMap.default;
    IconComponent = <DefaultIcon className="w-12 h-12 text-slate-400 mb-4" />;
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        className
      )}
    >
      {IconComponent}
      <h3 className="text-base font-medium text-slate-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 max-w-sm">{description}</p>
      )}
    </div>
  );
});
