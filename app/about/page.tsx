import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, BookOpen, Check, Code2, Compass, MessageCircleQuestion, Users } from "lucide-react";
import MarketingPageShell from "@/components/home/MarketingPageShell";

export const metadata: Metadata = {
  title: "About | CodeVerse",
  description: "A home for developers to share what they learn, find their next idea, and keep building.",
};

const pillars = [
  {
    number: "01",
    icon: BookOpen,
    title: "Share what you learn",
    description: "Turn notes, discoveries, and hard-won fixes into posts and articles that help the next developer.",
    href: "/article",
    link: "Explore articles",
  },
  {
    number: "02",
    icon: Code2,
    title: "Keep your best code close",
    description: "Collect reusable snippets in one place, ready for the next project and easy to share with others.",
    href: "/snippet",
    link: "Browse snippets",
  },
  {
    number: "03",
    icon: MessageCircleQuestion,
    title: "Get unstuck together",
    description: "Ask focused questions, trade perspectives, and make the kind of progress that is hard to make alone.",
    href: "/qa",
    link: "Join the conversation",
  },
  {
    number: "04",
    icon: Check,
    title: "Make room for the work",
    description: "Bring your coding goals and tasks into the same space where you learn and build.",
    href: "/task",
    link: "See your workspace",
  },
];

export default function AboutPage() {
  return (
    <MarketingPageShell>
      <main className="relative isolate overflow-hidden bg-[#050505] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-64 left-1/2 h-[38rem] w-[58rem] -translate-x-1/2 rounded-full bg-red-600/[0.13] blur-[150px]" />
          <div className="absolute right-[-14rem] top-[38rem] h-[28rem] w-[28rem] rounded-full bg-orange-500/[0.07] blur-[130px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
        </div>

        <section className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-16 px-6 pb-24 pt-28 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:pb-32 lg:pt-32">
          <div>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-xs text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
              A space for people who make things
            </div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-red-300/80">The CodeVerse idea</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Better things happen when we <span className="bg-gradient-to-r from-red-300 via-orange-200 to-white bg-clip-text text-transparent">build together.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/55 sm:text-lg">
              CodeVerse brings the everyday parts of being a developer into one place: sharing what you know, finding answers, saving useful code, and making steady progress on what you are building.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/community" className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-red-100">
                Find your community <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-white/70 transition hover:border-white/25 hover:text-white">
                Discover CodeVerse <ArrowDown size={15} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[490px]">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-red-500/20 via-transparent to-orange-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0b0b0c]/90 p-5 shadow-2xl shadow-black/40 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-300"><Code2 size={18} /></div>
                  <div><p className="text-sm font-medium">Your developer space</p><p className="mt-0.5 text-[11px] text-white/35">A little bit of everything</p></div>
                </div>
                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2.5 py-1 font-mono text-[10px] text-emerald-300/80">IN PROGRESS</span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-widest text-red-300/70">Recently shared</span><BookOpen size={15} className="text-white/30" /></div>
                  <p className="mt-3 text-sm text-white/85">Notes from building something real</p>
                  <p className="mt-1.5 text-xs text-white/35">A post, a lesson, a useful starting point.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"><Code2 size={16} className="text-orange-300" /><p className="mt-3 text-xs font-medium text-white/80">Snippets</p><p className="mt-1 text-[11px] text-white/35">Save what works</p></div>
                  <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"><MessageCircleQuestion size={16} className="text-sky-300" /><p className="mt-3 text-xs font-medium text-white/80">Questions</p><p className="mt-1 text-[11px] text-white/35">Learn out loud</p></div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-red-400/10 bg-red-500/[0.06] p-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-400/10 text-red-300"><Compass size={17} /></div>
                  <div><p className="text-xs font-medium text-white/80">One place to keep moving</p><p className="mt-1 text-[11px] text-white/40">Ideas become practice. Practice becomes progress.</p></div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-white/[0.07] pt-4 text-[11px] text-white/35"><Users size={14} /> Built around sharing, curiosity, and steady progress</div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-white/[0.018]">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:px-10 md:grid-cols-[0.75fr_1.25fr] md:items-center lg:px-12 lg:py-20">
            <div><p className="font-mono text-xs uppercase tracking-[0.22em] text-red-300/75">Why we made it</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">The work is easier when the pieces connect.</h2></div>
            <p className="max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">Learning to code is rarely a straight line. You read, try, get stuck, ask someone, find a better approach, and try again. CodeVerse is designed to support that whole loop, giving your ideas, knowledge, conversations, and plans a shared home.</p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
          <div className="mb-12 max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.22em] text-red-300/75">A toolkit for the journey</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">Make something. Learn something. Pass it on.</h2><p className="mt-5 text-sm leading-7 text-white/45 sm:text-base">Every part of CodeVerse connects back to one simple idea: your progress can help someone else make theirs.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pillars.map(({ number, icon: Icon, title, description, href, link }) => (
              <article key={number} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0b] p-6 transition duration-300 hover:-translate-y-1 hover:border-red-400/20 sm:p-8">
                <div className="absolute right-5 top-3 font-mono text-5xl font-semibold tracking-tighter text-white/[0.035] transition group-hover:text-red-300/[0.08]">{number}</div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-400/15 bg-red-500/[0.08] text-red-300"><Icon size={18} /></div>
                <h3 className="mt-7 text-lg font-medium text-white/90">{title}</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/45">{description}</p>
                <Link href={href} className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-white/65 transition group-hover:text-red-200">{link}<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" /></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-10 lg:px-12 lg:pb-32">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b0c] px-7 py-12 sm:px-12 sm:py-16">
            <div aria-hidden="true" className="absolute -right-20 -top-40 h-96 w-96 rounded-full bg-red-500/10 blur-[100px]" />
            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl"><p className="font-mono text-xs uppercase tracking-[0.22em] text-red-300/75">Your next step starts here</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Bring your curiosity. Build in good company.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/45">Whether you are sharing your first snippet or shipping your next big idea, there is room to grow here.</p></div>
              <Link href="/community" className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400">Explore CodeVerse <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" /></Link>
            </div>
          </div>
        </section>
      </main>
    </MarketingPageShell>
  );
}
