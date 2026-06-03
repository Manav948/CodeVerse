"use client";
import { Control, FieldValues } from "react-hook-form";
import {FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Props<T extends FieldValues> {
  control: Control<T>;
}

export function TaskMetaFields<T extends FieldValues>({
  control,
}: Props<T>) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name={"dueDate" as any}
        render={({ field }) => {
          const selectedDate = field.value
            ? new Date(field.value)
            : undefined;

          return (
            <FormItem className="flex flex-col">
              <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Due Date</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-white/5 bg-[#090909] text-white hover:border-white/20 hover:bg-[#090909]/80 transition text-sm cursor-pointer outline-none"
                    >
                      {selectedDate
                        ? format(selectedDate, "PPP p")
                        : "Select date & time"}

                      <CalendarIcon className="w-4 h-4 opacity-60 text-white/40" />
                    </button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto p-4 bg-[#111111] text-white border border-white/5 rounded-2xl shadow-2xl"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (!date) return;

                      const currentTime =
                        selectedDate || new Date();

                      date.setHours(
                        currentTime.getHours(),
                        currentTime.getMinutes()
                      );

                      field.onChange(date.toISOString());
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />

                  <div className="mt-4">
                    <label className="text-xs text-white/40 block mb-1.5 font-mono uppercase tracking-wider">
                      Time
                    </label>
                    <input
                      type="time"
                      value={
                        selectedDate
                          ? format(selectedDate, "HH:mm")
                          : ""
                      }
                      onChange={(e) => {
                        if (!selectedDate) return;

                        const [hours, minutes] =
                          e.target.value.split(":");

                        const updated =
                          new Date(selectedDate);

                        updated.setHours(
                          Number(hours),
                          Number(minutes)
                        );

                        field.onChange(
                          updated.toISOString()
                        );
                      }}
                      className="w-full bg-[#090909] border border-white/5 rounded-xl px-3 py-2 text-white focus:border-red-500/30 outline-none text-sm transition-colors focus:ring-0"
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          );
        }}
      />

      <FormField
        control={control}
        name={"priority" as any}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Priority</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-[#090909] border border-white/5 p-3 rounded-xl text-white text-sm focus:border-red-500/30 focus:ring-0">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
              </FormControl>

              <SelectContent className="bg-[#111111] text-white border border-white shadow-2xl rounded-lg">
                <SelectItem value="LOW" className="cursor-pointer hover:bg-white  text-xs py-2">Low</SelectItem>
                <SelectItem value="MEDIUM" className="cursor-pointer hover:bg-white  text-xs py-2">Medium</SelectItem>
                <SelectItem value="HIGH" className="cursor-pointer hover:bg-white text-xs py-2">High</SelectItem>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}