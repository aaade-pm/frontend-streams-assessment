"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

/**
 * CardStack Component - Stacked Card Interaction with Mathematical Transformations
 *
 * This component creates a visually stacked card effect using mathematical transformations:
 *
 * STACKED CARD MATH EXPLANATION:
 *
 * 1. VERTICAL OFFSET (CARD_OFFSET):
 *    - Each card is positioned `index * CARD_OFFSET` pixels above the previous card
 *    - Formula: top = index * -CARD_OFFSET (negative for upward stacking)
 *    - Example: With CARD_OFFSET=10, cards stack at: 0px, -10px, -20px, -30px...
 *    - Creates the visual depth effect where cards appear to be stacked
 *
 * 2. SCALE TRANSFORMATION (SCALE_FACTOR):
 *    - Cards behind the first one are scaled down to create perspective
 *    - Formula: scale = 1 - (index * SCALE_FACTOR)
 *    - Example: With SCALE_FACTOR=0.06, scales are: 1.0, 0.94, 0.88, 0.82...
 *    - The first card (index 0) is full size (1.0), each subsequent card is 6% smaller
 *    - This creates a "zoom out" effect for cards further back
 *
 * 3. ROTATION TRANSFORMATION:
 *    - Cards behind the first one are slightly rotated for visual interest
 *    - Formula: rotate = index > 0 ? index * 2 : 0 (in degrees)
 *    - Example: Rotations are: 0°, 2°, 4°, 6°...
 *    - Only cards behind the first (index > 0) get rotated
 *    - Creates a subtle "fan" effect
 *
 * 4. Z-INDEX LAYERING:
 *    - Higher z-index means the card appears on top
 *    - Formula: zIndex = cards.length - index
 *    - Example: With 4 cards, z-indices are: 4, 3, 2, 1 (first card has highest)
 *    - Ensures proper visual stacking order
 *
 * 5. DRAG INTERACTION:
 *    - When the first card is dragged down past threshold (50px), it moves to the back
 *    - The card that was second becomes first (takes index 0)
 *    - All transformations recalculate based on new index positions
 *    - Creates a "flip through" interaction pattern
 *
 * TRANSFORMATION COMBINATIONS:
 * - First card (index 0): scale(1.0), rotate(0°), zIndex(highest), top(0px)
 * - Second card (index 1): scale(0.94), rotate(2°), zIndex(second), top(-10px)
 * - Third card (index 2): scale(0.88), rotate(4°), zIndex(third), top(-20px)
 *
 * These transformations work together to create a 3D-like stacked card effect
 * while maintaining smooth animations through Framer Motion's spring physics.
 */
export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  // CARD_OFFSET: Vertical spacing between stacked cards (in pixels)
  // Each card is offset by this amount, creating the stacked appearance
  const CARD_OFFSET = offset || 10;

  // SCALE_FACTOR: Percentage reduction in scale for each card behind the first
  // 0.06 means each card is 6% smaller than the one in front
  const SCALE_FACTOR = scaleFactor || 0.06;

  const [cards, setCards] = useState<Card[]>(items);

  // Memoized click handler to avoid unnecessary re-renders
  const handleCardClick = useCallback((index: number) => {
    if (index === 0) return;

    // Move clicked card to front
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards];
      const clickedCard = newArray[index];
      newArray.splice(index, 1);
      newArray.unshift(clickedCard);
      return newArray;
    });
  }, []);

  // Keyboard interaction support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Arrow keys to navigate through cards
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        // Move first card to back (simulate dragging down)
        setCards((prevCards: Card[]) => {
          if (prevCards.length <= 1) return prevCards;
          const newArray = [...prevCards];
          const firstCard = newArray.shift()!;
          newArray.push(firstCard);
          return newArray;
        });
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        // Move last card to front
        setCards((prevCards: Card[]) => {
          if (prevCards.length <= 1) return prevCards;
          const newArray = [...prevCards];
          const lastCard = newArray.pop()!;
          newArray.unshift(lastCard);
          return newArray;
        });
      } else if (event.key === "Home") {
        event.preventDefault();
        // Reset to original order
        setCards([...items]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items]);

  // Memoized drag handler to avoid unnecessary re-renders
  const handleDragEnd = useCallback(
    (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: {
        offset: { x: number; y: number };
        velocity: { x: number; y: number };
      }
    ) => {
      // If dragged down far enough (threshold of 50px), move card to back
      // This creates a "swipe down to dismiss" interaction pattern
      const threshold = 50;
      if (info.offset.y > threshold) {
        setCards((prevCards: Card[]) => {
          const newArray = [...prevCards];
          const firstCard = newArray.shift()!;
          newArray.push(firstCard);
          return newArray;
        });
      }
    },
    []
  );

  const getCardGradient = (cardId: number) => {
    const gradients: Record<number, string> = {
      1: "linear-gradient(90deg, #E0DEFE 0%, #EDEEF0 54.56%, #EFEFFF 100%)",
      2: "linear-gradient(90deg, #FFF4E6 0%, #FEF8F0 54.56%, #FFFBF5 100%)",
      3: "linear-gradient(90deg, #FFE8E8 0%, #FFF0F0 54.56%, #FFF8F8 100%)",
      4: "linear-gradient(90deg, #E0F5F0 0%, #E8F8F5 54.56%, #F0FBF8 100%)",
    };
    return gradients[cardId] || gradients[1];
  };

  return (
    <div className="relative  h-60 w-60 md:h-60 md:w-96">
      {cards.map((card, index) => {
        const isFirstCard = index === 0;
        return (
          <motion.div
            key={card.id}
            onClick={() => !isFirstCard && handleCardClick(index)}
            drag={isFirstCard ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={isFirstCard ? handleDragEnd : undefined}
            tabIndex={isFirstCard ? 0 : -1}
            role="button"
            aria-label={`Card ${index + 1} of ${cards.length}: ${
              card.designation
            }`}
            className="absolute dark:bg-black h-60 w-60 md:h-60 md:w-96 rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/10 shadow-black/10 dark:shadow-white/5 flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-none focus:ring-offset-none"
            style={{
              transformOrigin: "top center",
              background: getCardGradient(card.id),
            }}
            animate={{
              // Vertical offset: Each card is positioned CARD_OFFSET pixels above the previous
              // Negative value moves cards upward, creating stacked effect
              top: index * -CARD_OFFSET,

              // Scale transformation: Cards behind are progressively smaller
              // Formula: 1 - (index * SCALE_FACTOR)
              // First card (index 0) = 1.0 (100%), second = 0.94 (94%), third = 0.88 (88%)
              scale: 1 - index * SCALE_FACTOR,

              // Z-index: Higher index cards appear on top
              // Formula: cards.length - index ensures first card has highest z-index
              zIndex: cards.length - index,

              // Rotation: Cards behind the first are rotated for visual depth
              // Formula: index > 0 ? index * 2 : 0 (degrees)
              // First card = 0°, second = 2°, third = 4°
              rotate: index > 0 ? index * 2 : 0,

              // Reset positions after drag interaction
              x: 0,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <h3 className="font-display text-peppermint-indigo text-2xl font-semibold dark:text-neutral-200">
              {card.designation}
            </h3>
            <div className="space-y-3">
              <p className="text-peppermint-indigo text-xl font-medium dark:text-white">
                {card.name}
              </p>
              <div className="font-normal text-neutral-700 dark:text-neutral-200 line-clamp-4">
                {card.content}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
