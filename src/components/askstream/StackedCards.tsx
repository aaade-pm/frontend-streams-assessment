"use client";

import * as React from "react";
import { CardStack } from "@/components/ui/card-stack";

interface StackedCardData {
  id: string;
  title: string;
  headline: string;
  body: string;
}

interface StackedCardsProps {
  cards: StackedCardData[];
}

export const StackedCards = React.memo(function StackedCards({
  cards,
}: StackedCardsProps) {
  const cardStackItems = React.useMemo(
    () =>
      cards.map((card, index) => ({
        id: parseInt(card.id.replace("card-", "")) || index,
        name: card.headline,
        designation: card.title,
        content: (
          <p className="text-sm leading-relaxed text-slate-500">{card.body}</p>
        ),
      })),
    [cards]
  );

  return (
    <div className="relative flex h-full place-items-center justify-center w-full pt-7">
      <CardStack items={cardStackItems} offset={10} scaleFactor={0.06} />
    </div>
  );
});
