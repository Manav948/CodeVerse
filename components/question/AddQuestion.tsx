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
import { X } from 'lucide-react'

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

    const onClose = () => {
        router.push("/qa")
    }
    return (
        <div className='min-h-screen bg-[#090909] text-white overflow-hidden'>
            <Header />
            <div className='flex h-[calc(100vh-64px)]'>
                <Sidebar />
                <div className='relative flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 bg-[#090909]'>
                    <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-red-500/5 blur-3xl" />
                    <div className='relative mx-auto max-w-3xl'>
                        <div className='relative p-6 sm:p-8 bg-[#111111] border border-white/5 rounded-2xl shadow-2xl space-y-8 text-white'>
                            
                            <div className="space-y-2">
                                <h1 className='text-xl sm:text-2xl font-semibold tracking-tight text-white/95'>
                                    Ask a Question
                                </h1>
                                <p className="text-xs sm:text-sm text-white/40 font-normal leading-relaxed">
                                    Get help from the CodeVerse community by describing your question in detail.
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
                                    className='space-y-6'
                                >
                                    <FormField control={form.control} name="title" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Question Title</FormLabel>
                                            <FormControl>
                                                <input
                                                    {...field}
                                                    placeholder='Title'
                                                    className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0"
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
                                                <FormLabel className="text-xs font-mono uppercase tracking-wider text-white/45">Description</FormLabel>
                                                <FormControl>
                                                    <textarea
                                                        {...field}
                                                        placeholder="Write something about your question"
                                                        rows={5}
                                                        className="w-full bg-[#090909] border border-white/5 rounded-xl px-4 py-2.5 text-white focus:border-red-500/30 outline-none transition-colors text-sm placeholder-white/20 focus:ring-0 resize-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium shadow-[0_0_20px_rgba(239,68,68,0.15)] transition-all cursor-pointer flex items-center justify-center gap-1.5 text-sm disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        {isPending ? "Creating..." : "Ask Question"}
                                    </button>
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
