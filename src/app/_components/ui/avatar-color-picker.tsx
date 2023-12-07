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
  name = "-",
}: {
  name: string;
  background: [string, Dispatch<SetStateAction<string>>];
  textColor: [string, Dispatch<SetStateAction<string>>];
}) {
  const solids = [
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#09203f",
    "#272E3F",
    "#F1F5F9",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("relative mx-auto flex h-16 w-16 flex-col")}
        >
          <Avatar>
            <AvatarFallback
              className=" flex h-16 w-16 items-center justify-center rounded-full text-lg font-semibold uppercase"
              style={{
                backgroundColor: bg,
                color: color,
              }}
            >
              <span>{getInitials(name)}</span>
            </AvatarFallback>
          </Avatar>
          <Pipette className="absolute bottom-0 right-[-10px] h-4 w-4" />

          {!name && (
            <span className="absolute bottom-[-25px] text-xs font-semibold italic">
              Ange ett namn för att se initialerna
            </span>
          )}
        </Button>
      </PopoverTrigger>

      {/* Color content */}
      <PopoverContent className="w-64">
        <Tabs defaultValue={"text-color"} className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger className="flex-1" value="text-color">
              Text
            </TabsTrigger>

            <TabsTrigger className="flex-1" value="background">
              Bakground
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text-color" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => (
              <div
                onClick={() => setColor(s)}
                key={s}
                style={{ background: s }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
              />
            ))}
          </TabsContent>

          <TabsContent value="background" className="mt-0 flex flex-wrap gap-1">
            {solids.map((s) => (
              <div
                onClick={() => setBg(s)}
                key={s}
                style={{ background: s }}
                className="h-6 w-6 cursor-pointer rounded-md active:scale-105"
              />
            ))}
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
