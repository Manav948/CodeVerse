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
import { 
  Edit, 
  EllipsisVertical, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from "lucide-react";
import { useRouter } from "next/navigation";

const getPriorityStyle = (priority: string) => {
  switch (priority?.toUpperCase()) {
    case "HIGH":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    case "MEDIUM":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "LOW":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    default:
      return "bg-white/5 text-white/50 border-white/5";
  }
};

const getPriorityDot = (priority: string) => {
  switch (priority?.toUpperCase()) {
    case "HIGH":
      return "bg-red-500 shadow-[0_0_6px_#ef4444]";
    case "MEDIUM":
      return "bg-amber-500 shadow-[0_0_6px_#f59e0b]";
    case "LOW":
      return "bg-emerald-500 shadow-[0_0_6px_#10b981]";
    default:
      return "bg-white/30";
  }
};

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

  const { mutate: completeTask, variables } = useMutation({
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

  if (isLoading) return(
    <div className="py-20 text-center text-white/50">
      <Loader />
    </div>
  );
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
            <div className="relative p-5 bg-[#111111] border border-white/5 rounded-xl hover:border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.02)] transition-all duration-300 group flex flex-col space-y-4">

              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0 flex-1 space-y-1">
                  <h3 className="text-sm sm:text-base font-medium text-white/95 leading-snug tracking-tight font-sans hover:text-white transition-colors wrap-break-words">
                    {task.title}
                  </h3>
                  {task.content && (
                    <p className="text-xs sm:text-sm text-white/40 leading-relaxed font-sans wrap-break-words">
                      {task.content}
                    </p>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1.5 hover:bg-white/5 text-white/30 hover:text-white/70 rounded-lg shrink-0 transition-colors cursor-pointer outline-none">
                      <EllipsisVertical size={16} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="bg-[#111111] border border-white/5 text-white shadow-xl rounded-lg"
                  >
                    <DropdownMenuItem
                      onClick={() => router.push(`/task/edit/${task.id}`)}
                      className="cursor-pointer hover:bg-white/5 focus:bg-white/5 text-xs py-2"
                    >
                      <Edit size={14} className="mr-2 text-white/60" />
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-400 cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 text-xs py-2"
                      onClick={() => deleteMutation.mutate(task.id)}
                    >
                      <Trash2 size={14} className="mr-2 text-red-500" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Badges Section */}
              <div className="flex gap-2 flex-wrap items-center">
                {/* Priority */}
                {task.priority && (
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${getPriorityStyle(task.priority)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(task.priority)}`} />
                    {task.priority}
                  </span>
                )}

                {/* Status */}
                {task.status && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${
                    task.status === "COMPLETED"
                      ? "bg-green-500/10 text-green-400 border-green-500/10"
                      : "bg-white/5 text-white/50 border-white/5"
                  }`}>
                    {task.status === "COMPLETED" && <CheckCircle2 size={10} />}
                    {task.status}
                  </span>
                )}
              </div>

              {/* Due Date & Action Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3.5 border-t border-white/[0.04]">
                {task.dueDate ? (
                  <div className={`flex items-center gap-1.5 text-[11px] font-mono ${
                    isOverdue ? "text-red-400 font-medium" : "text-white/40"
                  }`}>
                    {isOverdue ? <AlertCircle size={13} className="animate-pulse" /> : <Calendar size={13} />}
                    <span>
                      {isOverdue ? "Overdue" : "Due"}: {dayjs(task.dueDate).format("DD MMM YYYY")}
                    </span>
                  </div>
                ) : (
                  <div className="text-[11px] text-white/30 font-mono flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>No deadline set</span>
                  </div>
                )}

                {task.status !== "COMPLETED" && (
                  <button
                    className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white rounded-lg px-4 py-1.5 text-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 font-medium disabled:opacity-50 disabled:pointer-events-none"
                    disabled={variables === task.id}
                    onClick={() => completeTask(task.id)}
                  >
                    {variables === task.id ? (
                      <span>Updating...</span>
                    ) : (
                      <>
                        <CheckCircle2 size={13} />
                        <span>Mark Complete</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AllTask;