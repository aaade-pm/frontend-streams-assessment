"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "lucide-react";

interface SectionCardProps {
  title: string;
  headline: string;
  body: string;
  showChip?: boolean;
}

export function SectionCard({
  title,
  headline,
  body,
  showChip = false,
}: SectionCardProps) {
  return (
    <Card className="border-none shadow-none p-0">
      <CardHeader>
        <CardTitle className="font-display text-2xl font-semibold text-peppermint-indigo">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <h2 className="text-xl font-medium text-peppermint-indigo mt-1">
          {headline}
        </h2>
        <p className="text-sm text-peppermint-heavy-violet-base leading-relaxed font-normal">
          {body}
        </p>
        {showChip && (
          <Badge className="bg-peppermint-indigo-90 text-peppermint-base w-16 text-center text-xs px-3 py-1 mt-8 rounded-sm border-0">
            <Sparkle className="size-2.5 mr-1" fill="#625afa" />
            Chip
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}
