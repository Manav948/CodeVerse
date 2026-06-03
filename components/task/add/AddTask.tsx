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
import { Switch } from "../../ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
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

    const onClose = () => {
        router.push("/task")
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="relative p-6 sm:p-8 bg-[#111111] border border-white/5 rounded-2xl shadow-2xl space-y-8 text-white">

                <div className="space-y-2.5">
                    <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-white/95">
                        Create New Task
                    </h2>
                    <p className="text-xs sm:text-sm text-white/40 font-normal leading-relaxed">
                        Organize your work efficiently and track GitHub progress if needed.
                    </p>
                    <button
                        type="button"
                        className="top-6 absolute right-6 flex items-center h-8 w-8 rounded-lg justify-center text-white/30 hover:text-white/80 hover:bg-white/5 border border-white/5 transition cursor-pointer"
                        onClick={onClose}
                    >
                        <X size={15} />
                    </button>
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
                                    <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Task Title</FormLabel>
                                    <FormControl>
                                        <input
                                            placeholder="Build authentication system"
                                            {...field}
                                            className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0"
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
                                    <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Description</FormLabel>
                                    <FormControl>
                                        <textarea
                                            placeholder="Describe your task in detail..."
                                            rows={4}
                                            {...field}
                                            className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0 resize-none"
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
                                <FormItem className="flex items-center justify-between rounded-xl border border-white/5 p-4 sm:p-5 bg-[#090909]">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-sm font-medium text-white/90">
                                            Track with GitHub
                                        </FormLabel>
                                        <p className="text-[11px] text-white/40 leading-normal">
                                            Enable to monitor repository activity.
                                        </p>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="data-[state=checked]:bg-red-500"
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
                                                <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">GitHub Repository URL</FormLabel>
                                                <FormControl>
                                                    <input
                                                        placeholder="https://github.com/username/repo"
                                                        {...field}
                                                        className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0"
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
                                                <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">GitHub Username</FormLabel>
                                                <FormControl>
                                                    <input
                                                        placeholder="username"
                                                        {...field}
                                                        className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all cursor-pointer flex items-center justify-center gap-1.5 text-sm disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isPending ? "Creating Task..." : "Create Task"}
                        </button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AddTask;