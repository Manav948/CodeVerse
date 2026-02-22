"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../ui/Loading";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Task } from "@/types/task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

const AllTask = () => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const { data: tasks, isLoading, isError } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("/api/task/get");
      return res.data;
    },
  });

  const {mutate : completeTask , variables} = useMutation({
    mutationFn: async (taskId: string) => {
      await axios.post(`/api/task/complete/${taskId}`);
      return taskId;
    },

    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) =>
          t.id === taskId ? { ...t, status: "COMPLETED" } : t
        )
      );

      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["tasks"], context.previous);
      }
      toast.error("Failed to complete task");
    },

    onSuccess: () => toast.success("Task completed"),
  });

  // delete Task
  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await axios.delete(`/api/task/delete/${taskId}`);
      return taskId;
    },

    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previous = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((t) => t.id !== taskId)
      );

      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["tasks"], context.previous);
      }
      toast.error("Failed to delete task");
    },

    onSuccess: () => toast.success("Task deleted"),
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Error fetching tasks
      </div>
    );

  if (!tasks?.length)
    return (
      <div className="text-center text-white/50 mt-20">
        No tasks available
      </div>
    );

  return (
    <div className="space-y-4 overflow-y-hidden">
      {tasks.map((task) => {
        const isOverdue =
          task.dueDate &&
          dayjs(task.dueDate).isBefore(dayjs()) &&
          task.status !== "COMPLETED";

        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="relative p-5  bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:border-white/30 transition">
              <div className="flex justify-between items-start gap-4">

                <div className="min-w-0">
                  <h3 className="text-lg font-semibold wrap-break-words">
                    {task.title}
                  </h3>

                  <p className="text-white/60 text-sm mt-1 wrap-break-words">
                    {task.content}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1 hover:bg-white/10 rounded-md">
                      <EllipsisVertical size={18} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="bg-black border border-white/10 text-white"
                  >
                    <DropdownMenuItem
                    onClick={() => router.push(`/task/edit/${task.id}`)}
                    >
                      Update
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-400"
                      onClick={() => deleteMutation.mutate(task.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <Badge variant="outline" className="text-white">
                  {task.priority}
                </Badge>

                <Badge
                  className={
                    task.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-400 border-green-500/40"
                      : "bg-white/10 text-white/70 border-white/20"
                  }
                >
                  {task.status}
                </Badge>
              </div>

              {task.dueDate && (
                <div className="mt-4 text-sm flex justify-between">
                  <span
                    className={
                      isOverdue
                        ? "text-red-400 font-medium"
                        : "text-white/50"
                    }
                  >
                    Due: {dayjs(task.dueDate).format("DD MMM YYYY")}
                  </span>
                  {task.status !== "COMPLETED" && (
                    <Button
                      size="sm"
                      className="w-full sm:w-auto bg-red-500/70 text-white hover:opacity-90"
                      disabled={variables === task.id}
                      onClick={() => completeTask(task.id)}
                    >
                      {variables === task.id ? "Updating..." : "Mark Complete"}
                    </Button>)}
                </div>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AllTask;