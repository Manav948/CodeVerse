import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/home/MarketingPageShell";

export const metadata: Metadata = {
  title: "About | CodeVerse",
  description: "A community space for developers to share work, exchange ideas, and stay organized.",
};

export default function AboutPage() {
  return (
    <MarketingPageShell>
      <main className="relative flex min-h-[65vh] items-center overflow-hidden bg-[#050505] px-5 py-28 text-white sm:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-180 -translate-x-1/2 rounded-full bg-red-600/10 blur-[140px]" />
        <article className="relative mx-auto w-full max-w-5xl">
          <Link href="/" className="text-sm text-red-400 hover:text-red-300">← Back to CodeVerse</Link>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-red-400">About CodeVerse</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Build and learn in public</h1>
          <p className="mt-8 text-lg leading-8 text-white/70">CodeVerse brings developer publishing and project organization together. Share posts, articles, and code snippets; ask questions and help others; and keep coding tasks moving.</p>
          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <Link href="/article" className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-400">Explore the community</Link>
            <Link href="/terms" className="rounded-lg border border-white/15 px-4 py-2 text-white/70 hover:text-white">Terms of Service</Link>
          </div>
        </article>
      </main>
    </MarketingPageShell>
  );
}
