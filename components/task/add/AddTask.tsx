"use client";

import { taskCreateSchema, TaskCreateSchema } from "@/schema/taskCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../ui/form";
import { Card } from "../../ui/card";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Switch } from "../../ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { TaskMetaFields } from "../TaskMetaFields";

const AddTask = () => {
    const router = useRouter();

    const form = useForm<TaskCreateSchema>({
        resolver: zodResolver(taskCreateSchema),
        defaultValues: {
            title: "",
            content: "",
            dueDate: "",
            isStudent: false,
            priority: "MEDIUM",
            githubRepo: "",
            githubUserName: "",
        },
    });

    const { mutate: addTask, isPending } = useMutation({
        mutationFn: async (data: TaskCreateSchema) => {
            const formattedData = {
                ...data,
                dueDate: data.dueDate
                    ? new Date(data.dueDate).toISOString()
                    : null,
            };

            const res = await axios.post("/api/task/add", formattedData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Task created successfully");
            form.reset();
            router.push("/task");
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message || "Failed to create task"
            );
        },
    });

    const onSubmit = (data: TaskCreateSchema) => {
        addTask(data);
    };

    const isStudent = form.watch("isStudent");

    return (
        <div className="max-w-2xl mx-auto ">
            <Card className="p-10 bg-black border border-white/10  shadow-2xl space-y-8 text-white">

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Create New Task
                    </h2>
                    <p className="text-sm text-white/50">
                        Organize your work efficiently and track GitHub progress if needed.
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
                                            placeholder="Build authentication system"
                                            {...field}
                                            className="bg-black/40 border-white/10 focus:ring-1 focus:ring-red-500"
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
                                            placeholder="Describe your task in detail..."
                                            rows={4}
                                            {...field}
                                            className="bg-black/40 border-white/10 focus:ring-1 focus:ring-red-500"
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
                                                        placeholder="https://github.com/username/repo"
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
                                                        placeholder="username"
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
                            className="w-full h-10 rounded-xl bg-red-500/60 hover:opacity-90 transition-all font-semibold"
                        >
                            {isPending ? "Creating Task..." : "Create Task"}
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default AddTask;