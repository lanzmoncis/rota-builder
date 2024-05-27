"use client";

import { format } from "date-fns";
import { ChevronLeft, ChevronRight, RotateCcw, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WeeklyCalendarMenuProps {
  selectedDate: Date;
  handleDateSelect: (date: Date | undefined) => void;
  goToToday: () => void;
  changeWeekHandle: (btnType: "prev" | "next") => void;
}

export const WeeklyCalendarMenu: React.FC<WeeklyCalendarMenuProps> = ({
  selectedDate,
  handleDateSelect,
  goToToday,
  changeWeekHandle,
}) => {
  return (
    <div className="flex items-center gap-4 pt-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} size="sm">
            <span className="text-[16px] leading-4 text-gray-700 font-medium">
              {format(new Date(), "MMMM d yyyy")}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" onClick={goToToday} className="w-6">
          <RotateCcw strokeWidth={1.75} size={18} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => changeWeekHandle("prev")}
          className="w-6"
        >
          <ChevronLeft strokeWidth={1.25} size={24} />
        </Button>
        <Button
          size="icon"
          onClick={() => changeWeekHandle("next")}
          variant="ghost"
          className="w-6"
        >
          <ChevronRight strokeWidth={1.25} size={24} />
        </Button>
        <Button variant="outline" className="h-[30px] px-2 cursor-not-allowed">
          <Send className="mr-1" strokeWidth={1.5} size={16} />
          <span className="text-xs leading-4 text-gray-700">Publish</span>
        </Button>
      </div>
    </div>
  );
};
