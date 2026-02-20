"use client"
import { taskCreateSchema, TaskCreateSchema } from '@/schema/taskCreateSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form'
import { Card } from '../../ui/card'
import { Input } from '../../ui/input'
import { Button } from '../../ui/button'
import { Switch } from '../../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Textarea } from '../../ui/textarea'

const AddTask = () => {
    const router = useRouter()
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
        }
    })

    const { mutate: addTask, isPending } = useMutation({
        mutationFn: async (data: TaskCreateSchema) => {
            const res = await axios.post("/api/task/add", data)
            return res.data
        },
        onSuccess: (data) => {
            toast.success("Task added successfully!")
            form.reset()
            router.push("/task")
        },
        onError: () => {
            toast.error("Failed to add task. Please try again.")
        }
    })

    const onSubmit = (data: TaskCreateSchema) => {
        addTask(data)
    }

    const isStudent = form.watch("isStudent")
    return (
        <div className='max-w-3xl mx-auto py-8'>
            <Card className='p-8 bg-black text-white border border-white/10 rounded-2xl space-y-6'>
                <h2 className='text-2xl font-semibold text-white'>
                    Create new Task
                </h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name='title' render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter Task Title' {...field} className='mb-5' />
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
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your task..."
                                            className='mb-5'
                                            rows={4}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="datetime-local"
                                            className='mb-5'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority"  />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="LOW">
                                                Low
                                            </SelectItem>
                                            <SelectItem value="MEDIUM">
                                                Medium
                                            </SelectItem>
                                            <SelectItem value="HIGH">
                                                High
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isStudent"
                            render={({ field }) => (
                                <FormItem className="flex items-center justify-between rounded-lg border border-white/10 p-4 mt-4 mb-5">
                                    <div>
                                        <FormLabel>
                                            Is this a GitHub-tracked task?
                                        </FormLabel>
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
                        {isStudent && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="githubRepo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>GitHub Repo URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="https://github.com/username/repo"
                                                    {...field}
                                                    className='mb-5'
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
                                                    className='mb-5'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-red-500/60 text-white"
                        >
                            {isPending ? "Creating..." : "Create Task"}
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}

export default AddTask
