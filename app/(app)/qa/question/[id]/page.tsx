"use client";

import ViewQuestion from "@/components/question/ViewQuestion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Loader from "@/components/ui/Loading";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Page() {
    const params = useParams();
    const questionId = params?.id as string;

    const { data: question, isLoading } = useQuery({
        queryKey: ["question", questionId],
        queryFn: async () => {
            const res = await axios.get(`/api/Question/view?questionId=${questionId}`);
            return res.data;
        },
        enabled: !!questionId,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <Loader />
            </div>
        );
    }

    if (!question) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                Question not found
            </div>
        );
    }

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:block w-64 border-r border-white/10">
                    <Sidebar />
                </aside>
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-3xl py-10">
                        <ViewQuestion question={question} />
                    </div>
                </main>

            </div>
        </div>
    );
}