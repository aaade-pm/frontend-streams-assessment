"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function AskBar() {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 160;
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  };

  React.useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <div className="space-y-6 my-14 text-center md:text-left md:pl-[20%] md:pr-[17%]">
      {/* Ask Stream heading and subheading*/}
      <div className="mb-8">
        <h1
          className="font-display font-bold md:font-semibold text-[45px] md:text-[57px] leading-[64px] tracking-[-0.25px] bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(90deg, #625afa 0.05%, #272464 22.24%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          Ask Stream
        </h1>
        <span className="block font-display font-bold md:font-semibold text-[#cac4d0] text-[45px] md:text-[57px] leading-[64px] tracking-[-0.25px]">
          lorem ipsum
        </span>
      </div>

      {/* Bordered container with input, badges, and button */}
      <div className="border border-peppermint-heavy-violet-90 rounded-2xl py-2 px-4 ml-4 mr-4 md:mr-0 md:ml-0">
        <div className="flex flex-col gap-1">
          <textarea
            ref={textareaRef}
            placeholder="Ask anything"
            onInput={adjustTextareaHeight}
            className={cn(
              "min-h-[40px] max-h-40 w-full rounded-xl border-none shadow-none",
              "focus-visible:ring-0 focus-visible:outline-none text-base",
              "resize-none overflow-y-auto px-3 py-2",
              "bg-transparent placeholder:text-slate-400"
            )}
            rows={1}
          />
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-0">
            <div className="flex items-center gap-2">
              <Badge className="bg-peppermint-indigo-90 text-peppermint-base text-xs px-3 py-1 rounded-sm border-0">
                <Sparkle className="size-2.5 mr-1" fill="#625afa" />
                Beta
              </Badge>
              <Badge className="text-xs text-peppermint-heavy-violet-40 shadow-none">
                Conversational Analytics
              </Badge>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-between gap-0 lg:justify-end lg:gap-4">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Handle file upload logic here
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 w-8 p-0 text-peppermint-indigo/80 hover:bg-peppermint-base hover:text-white  border-0 rounded-sm flex items-center justify-center"
              >
                <Plus className="size-6" strokeWidth={2.5} />
              </Button>
              <Button
                variant="secondary"
                className="h-8 px-6 bg-peppermint-indigo/80 text-white hover:bg-peppermint-indigo border-0 rounded-sm"
              >
                Analyze
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
