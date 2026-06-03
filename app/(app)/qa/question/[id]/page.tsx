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

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-3xl py-10 px-4">
                        {isLoading ? (
                            <div className="py-20 text-center text-white/50">
                                <Loader />
                            </div>
                        ) : !question ? (
                            <div className="text-center py-20 text-white/50">
                                Question not found
                            </div>
                        ) : (
                            <ViewQuestion question={question} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}