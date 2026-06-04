"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "@/types/task";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col gap-1 overflow-y-auto max-h-[60vh] p-1.5 border border-white/5 bg-[#111111]/30 rounded-xl">
      {tasks.map((task) => {
        const isActive = pathname.includes(task.id);
        return (
          <button
            key={task.id}
            onClick={() => router.push(`/task/edit/${task.id}`)}
            className={cn(
              "w-full rounded-lg px-3 py-2 text-[11px] font-mono min-w-0 text-start transition-all duration-200 cursor-pointer outline-none border",
              isActive
                ? "bg-white/5 text-white border-white/5"
                : "text-white/40 bg-transparent hover:text-white/80 hover:bg-white/5 border-transparent"
            )}
          >
            <span className="truncate w-full block">
              {task.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ShowInSidebar;