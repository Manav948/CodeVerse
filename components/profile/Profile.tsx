"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import Loader from "../ui/Loading"
import NotFoundState from "../ui/notFound"
import { Card } from "../ui/card"
import { UserAvatar } from "../ui/user-avatar"
import Image from "next/image"
import { Calendar } from "lucide-react"
import { Separator } from "../ui/separator"

interface Props {
    userId: string
}

const Profile = ({ userId }: Props) => {
    const [activeTab, setActiveTab] = useState("posts")

    const { data, isLoading } = useQuery({
        queryKey: ["profile", userId],
        queryFn: async () => {
            const res = await axios.get(`/api/user/profile/${userId}`)
            return res.data
        }
    })

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader />
            </div>
        )
    }

    if (!data) {
        return <NotFoundState type="post" />
    }

    return (
        <div className="space-y-10">

            <Card className="relative overflow-hidden bg-black border border-white/10 p-8 rounded-3xl backdrop-blur-xl">

                <div className="flex flex-col md:flex-row md:items-center gap-8">

                    <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full"></div>
                        <UserAvatar
                            profileImage={data.image}
                            username={data.username}
                            size={120}
                            className="relative ring-4 ring-white/10"
                        />
                    </div>
                    <div className="flex-1 space-y-3">
                        <div>
                            <h1 className="text-3xl font-bold text-white">{data.name}</h1>
                            <p className="text-white/50">@{data.username}</p>
                        </div>

                        {data.bio && (
                            <p className="text-white/70 max-w-xl">{data.bio}</p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-white/60">
                            <Calendar size={16} />
                            Joined {new Date(data.createdAt).toLocaleDateString()}
                        </div>

                        <div className="flex gap-8 pt-4">
                            <Stat label="Posts" value={data._count.posts} />
                            <Stat label="Snippets" value={data._count.snippets} />
                            <Stat label="Questions" value={data._count.questions} />
                            <Stat label="Articles" value={data._count.articles} />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex gap-8 border-b border-white/10 pb-3">
                {["posts", "snippets", "questions", "articles"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative capitalize text-sm transition-all duration-200 ${activeTab === tab
                            ? "text-white"
                            : "text-white/40 hover:text-white"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <span className="absolute -bottom-3.5 left-0 right-0 h-0.5 bg-cyan-500 rounded-full"></span>
                        )}
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {activeTab === "posts" && (
                    <PostSection posts={data.posts} />
                )}
                {activeTab === "snippets" && (
                    <SnippetSection snippets={data.snippets} />
                )}
                {activeTab === "questions" && (
                    <QuestionSection questions={data.questions} />
                )}
                {activeTab === "articles" && (
                    <ArticleSection articles={data.articles} />
                )}
            </div>
        </div>
    )
}

export default Profile


const Stat = ({ label, value }: { label: string; value: number }) => (
    <div className="hover:text-cyan-400 transition cursor-pointer">
        <div className="text-white font-semibold text-lg">{value}</div>
        <div className="text-xs text-white/50 uppercase tracking-wide">
            {label}
        </div>
    </div>
)

const PostSection = ({ posts }: any) => {
    if (!posts?.length) return <NotFoundState type="post" />

    return posts.map((post: any) => (
        <ContentCard
            key={post.id}
            title={post.title}
            description={post.description}
            images={post.image}
        />
    ))
}

const ArticleSection = ({ articles }: any) => {
    if (!articles?.length) return <NotFoundState type="article" />

    return articles.map((article: any) => (
        <ContentCard
            key={article.id}
            title={article.title}
            description={article.description}
            images={article.image}
        />
    ))
}

const QuestionSection = ({ questions }: any) => {
    if (!questions?.length) return <NotFoundState type="question" />

    return questions.map((question: any) => (
        <div>

            <Card
                key={question.id}
                className="bg-black/60 p-6 border-none "
            >
                <h3 className="text-white font-semibold text-lg">
                    {question.title}
                </h3>
                <p className="text-white/60 bg-white/5 p-6 rounded-xl text-sm mt-4 line-clamp-3">
                    {question.description}
                </p>
            </Card>
            <Separator className="bg-white/10 mt-5" />
        </div>
    ))
}

const SnippetSection = ({ snippets }: any) => {
    if (!snippets?.length) return <NotFoundState type="snippet" />

    return snippets.map((snippet: any) => (
        <div>
        <Card
            key={snippet.id}
            className="bg-black/60 border-none p-6 "
        >
            <h3 className="text-white font-semibold text-lg">
                {snippet.title}
            </h3>

            <p className="text-white/60 mt-2">
                {snippet.description}
            </p>

            <pre className="mt-4 bg-white/10 rounded-2xl max-h-100 overflow-auto border-none p-5 text-sm font-mono text-white/80">
                <code>{snippet.code}</code>
            </pre>
            <Separator className="bg-white/10" />
        </Card>
        <Separator className="bg-white/10 mt-5" />
        </div>
    ))
}

const ContentCard = ({
    title,
    description,
    images
}: {
    title: string
    description: string
    images?: string[]
}) => (
    <Card className="bg-black border-none p-6 rounded-2xl  transition">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-white/60 text-sm mt-3 line-clamp-3">
            {description}
        </p>

        {images && images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                {images.slice(0, 4).map((img, idx) => (
                    <div
                        key={idx}
                        className="relative aspect-video overflow-hidden rounded-xl border border-white/10 group"
                    >
                        <Image
                            src={img}
                            alt="Content image"
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                        />
                    </div>
                ))}
            </div>
        )}
    </Card>
)
