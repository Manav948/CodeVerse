"use client"
import { AddQuestion, addQuestion } from '@/schema/addQuestion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Header from '../dashboard/Header/Header'
import Sidebar from '../dashboard/Sidebar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const AddQuestions = () => {
    const router = useRouter()
    const form = useForm<AddQuestion>({
        resolver: zodResolver(addQuestion),
        defaultValues: {
            title: "",
            description: "",
        }
    })
    const { mutate: addQuestions, isPending } = useMutation({
        mutationFn: async (data: AddQuestion) => {
            const res = await axios.post("/api/Question/add", data)
            return res.data
        },
        onSuccess: () => {
            toast.success("Question is created Successfully")
            router.push("/qa")
        },
        onError: (err) => {
            console.log(err)
            toast.error("Question is not created, Please Try again")
        }
    })
    const onSubmit = (data: AddQuestion) => {
        addQuestions(data)
    }
    return (
        <div className='min-h-screen bg-black text-white overflow-hidden'>
            <Header />
            <div className='flex h-[calc(100vh-64px)]'>
                <div className='hidden md:block w-64 shrink-0 border-r border-white/10'>
                    <Sidebar />
                </div>
                <div className='relative flex-1 overflow-y-auto overflow-x-hidden'>
                    <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
                    <div className='relative mx-auto max-w-3xl p-8'>
                        <div className='rounded-3xl border-white/5 border bg-black backdrop-blur-xl p-8'>
                            <h1 className='mb-6 text-2xl font-semibold'>
                                Ask a Question
                            </h1>

                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(onSubmit)}
                                    className='space-y-6'
                                >
                                    <FormField control={form.control} name="title" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder='Title'
                                                    className='bg-white/5 border-white/10'
                                                />

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        placeholder="Write something about your post"
                                                        className="min-h-30 bg-white/5 border-white/10"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="
                      h-11 w-full rounded-xl
                      bg-linear-to-r from-purple-500 to-cyan-500
                      font-semibold text-white
                      hover:opacity-90
                    "
                                    >
                                        {isPending ? "Creating..." : "Ask Question"}
                                    </Button>
                                </form>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddQuestions
