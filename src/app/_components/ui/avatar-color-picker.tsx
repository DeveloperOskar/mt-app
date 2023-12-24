"use client";

import { Pipette } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Button } from "./button";
import { cn, getInitials } from "~/app/_lib/utils";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

export const AVATAR_BASE_TEXT_COLOR = "#272E3F";
export const AVATAR_BASE_BACKGROUND_COLOR = "#F1F5F9";

export function AvatarColorPicker({
  background: [bg, setBg],
  textColor: [color, setColor],
  name,
}: {
  name: string;
  background: [string, Dispatch<SetStateAction<string>>];
  textColor: [string, Dispatch<SetStateAction<string>>];
}) {
  const colorCombinations = [
    { text: "#FFFFFF", background: "#2E3A87" },
    { text: "#FFFFFF", background: "#18181B" },
    { text: "#FFFFFF", background: "#E4335A" },
    { text: "#FFFFFF", background: "#3A72EC" },
    { text: "#FFFFFF", background: "#F97316" },
    { text: "#FFFFFF", background: "#7C3AED" },
    { text: "#000000", background: "#F1F5F9" },
    { text: "#000000", background: "#FACC15" },
  ] as const;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("relative mx-auto flex h-20 w-20 flex-col")}
        >
          <Avatar>
            <AvatarFallback
              className=" flex h-20 w-20 items-center justify-center rounded-full text-lg font-semibold uppercase"
              style={{
                backgroundColor: bg,
                color: color,
              }}
            >
              <span>{name ? getInitials(name) : ""}</span>
            </AvatarFallback>
          </Avatar>
          <Pipette className="absolute bottom-0 right-[-10px] h-4 w-4" />
        </Button>
      </PopoverTrigger>

      {/* Color content */}
      <PopoverContent className="w-64">
        <div className="mt-0 flex flex-wrap gap-1">
          {colorCombinations.map((color, i) => (
            <div
              onClick={() => {
                setColor(color.text);
                setBg(color.background);
              }}
              key={i}
              style={{ background: color.background }}
              className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
