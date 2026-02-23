"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "@/types/task";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";

const ShowInSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: tasks, isLoading, isError } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/task/get");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="px-3 py-2 text-sm text-white/50">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="px-3 py-2 text-sm text-red-500">
        Failed to load
      </div>
    );

  if (!tasks?.length)
    return (
      <div className="px-3 py-2 text-sm text-white/40">
        No tasks
      </div>
    );

  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[70vh] p-2 border border-white/10 rounded-xl ">
      {tasks.map((task) => {
        const isActive = pathname.includes(task.id);
        return (
          <Button
            key={task.id}
            onClick={() => router.push(`/task/edit/${task.id}`)}
            variant="ghost"
            className={cn(
              "w-full justify-start rounded-lg px-3 py-2 text-sm",
              "min-w-0 text-start ",
              isActive
                ? "bg-white/10 text-white border border-white/20"
                : "text-black bg-white hover:text-white hover:bg-gray-800"
            )}
          >
            <span className="truncate w-full">
              {task.title}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default ShowInSidebar;