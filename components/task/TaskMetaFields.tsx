"use client";

import { Control } from "react-hook-form";
import { TaskCreateSchema } from "@/schema/taskCreateSchema";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface Props {
  control: Control<TaskCreateSchema>;
}

export const TaskMetaFields = ({ control }: Props) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      <FormField
        control={control}
        name="dueDate"
        render={({ field }) => {
          const selectedDate = field.value
            ? new Date(field.value)
            : undefined;

          return (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <button
                      type="button"
                      className={`flex items-center justify-between w-full px-4 py-2 rounded-xl border border-white/10 bg-black text-white hover:border-white/30 transition ${
                        !selectedDate && "text-white"
                      }`}
                    >
                      {selectedDate
                        ? format(selectedDate, "PPP p")
                        : "Select date & time"}

                      <CalendarIcon className="w-4 h-4 opacity-60" />
                    </button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent
                  className="w-auto p-4 bg-black text-white border border-white/10 rounded-2xl"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (!date) return;

                      const currentTime = selectedDate || new Date();
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
                    <label className="text-xs text-white/50 block mb-1">
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

                        const updated = new Date(selectedDate);
                        updated.setHours(
                          Number(hours),
                          Number(minutes)
                        );

                        field.onChange(updated.toISOString());
                      }}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Priority Field */}
      <FormField
        control={control}
        name="priority"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Priority</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-black/40 border-white/10 p-3 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
              </FormControl>

              <SelectContent className="bg-black text-white border-white/10">
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};