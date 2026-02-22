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

type Task = {
  id: string;
  title: string;
  content: string;
  dueDate?: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  created_at: string;
};

const AllTask = () => {
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

      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((task) =>
          task.id === taskId
            ? { ...task, status: "COMPLETED" }
            : task
        )
      );

      return { previousTasks };
    },

    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
      toast.error("Failed to complete task");
    },

    onSuccess: () => {
      toast.success("Task completed");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
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
      <div className="text-center text-white/50 mt-20 text-lg">
        No tasks available
      </div>
    );

  return (
    <div className="space-y-5">
      {tasks.map((task) => {
        const isOverdue =
          task.dueDate &&
          dayjs(task.dueDate).isBefore(dayjs()) &&
          task.status !== "COMPLETED";

        const priorityVariant =
          task.priority === "HIGH"
            ? "destructive"
            : task.priority === "MEDIUM"
            ? "secondary"
            : "outline";

        const statusColor =
          task.status === "COMPLETED"
            ? "bg-green-500/20 text-green-400 border-green-500/40"
            : task.status === "IN_PROGRESS"
            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
            : "bg-white/10 text-white/70 border-white/20";

        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:border-white/30 transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {task.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">
                    {task.content}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Badge variant={priorityVariant}>
                    {task.priority}
                  </Badge>

                  <Badge className={statusColor}>
                    {task.status}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 text-sm">
                <div>
                  {task.dueDate && (
                    <span
                      className={
                        isOverdue
                          ? "text-red-400 font-medium"
                          : "text-white/50"
                      }
                    >
                      Due:{" "}
                      {dayjs(task.dueDate).format(
                        "DD MMM YYYY"
                      )}
                    </span>
                  )}
                </div>

                {task.status !== "COMPLETED" && (
                  <Button
                    size="sm"
                    disabled={variables === task.id}
                    onClick={() => completeTask(task.id)}
                    className="bg-red-500/60 text-white hover:opacity-90"
                  >
                    {variables === task.id
                      ? "Updating..."
                      : "Mark Complete"}
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AllTask;