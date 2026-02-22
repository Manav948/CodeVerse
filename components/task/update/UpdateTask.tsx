"use client";
import { taskUpdateSchema, TaskUpdateSchema, } from "@/schema/taskUpdateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TaskMetaFields } from "../TaskMetaFields";

interface Props {
  task: any;
}

const UpdateTask = ({ task }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<TaskUpdateSchema>({
    resolver: zodResolver(taskUpdateSchema),
  });

  useEffect(() => {
    if (task) {
      form.reset({
        title: task.title,
        content: task.content,
        dueDate: task.dueDate
          ? dayjs(task.dueDate).format("YYYY-MM-DDTHH:mm")
          : "",
        isStudent: task.isStudent,
        priority: task.priority,
        githubRepo: task.githubRepo || "",
        githubUserName: task.githubUserName || "",
        status: task.status,
      });
    }
  }, [task, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TaskUpdateSchema) => {
      const formattedData = {
        ...data,
        dueDate: data.dueDate
          ? new Date(data.dueDate).toISOString()
          : null,
      };

      const res = await axios.patch(
        `/api/task/update/${task.id}`,
        formattedData
      );

      return res.data;
    },
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["task", task.id] });
      router.push("/task");
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const onSubmit = (data: TaskUpdateSchema) => {
    mutate(data);
  };

  const isStudent = form.watch("isStudent");

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-10 bg-black border border-white/10 shadow-2xl space-y-8 text-white">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Update Task
          </h2>
          <p className="text-sm text-white/50">
            Modify task details and GitHub tracking configuration.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-black/40 border-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      {...field}
                      className="bg-black/40 border-white/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <TaskMetaFields control={form.control} />
            <FormField
              control={form.control}
              name="isStudent"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-xl border border-white/10 p-5 bg-black/40">
                  <div>
                    <FormLabel className="text-base">
                      Track with GitHub
                    </FormLabel>
                    <p className="text-xs text-white/50">
                      Enable to monitor repository activity.
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <AnimatePresence>
              {isStudent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="githubRepo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Repository URL</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-black/40 border-white/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="githubUserName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Username</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-black/40 border-white/10"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-10 rounded-xl bg-red-500/60 hover:opacity-90 font-semibold"
            >
              {isPending ? "Updating Task..." : "Update Task"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateTask;  