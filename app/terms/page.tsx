import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/home/MarketingPageShell";

export const metadata: Metadata = {
  title: "Terms of Service | CodeVerse",
  description: "Terms for using CodeVerse and contributing to its developer community.",
};

const sections = [
  { title: "Using CodeVerse", body: "CodeVerse provides tools for developers to publish and discover posts, articles, code snippets, questions and answers, and to manage coding tasks. You must provide accurate account information, keep your credentials secure, and use the service lawfully." },
  { title: "Your contributions", body: "You retain rights to content you create. By submitting content, you give CodeVerse permission to host, store, display, and distribute it as needed to operate the features you use. You are responsible for having the rights to anything you upload. Remember that public posts and profile details may be visible to other users." },
  { title: "Community rules", body: "Do not use CodeVerse to break the law, threaten or harass others, infringe intellectual property, distribute malicious code, interfere with the service, or access accounts or data without permission. Do not submit content that you do not have permission to share." },
  { title: "Accounts and availability", body: "We may restrict or suspend access when reasonably needed to protect users, the service, or comply with law. Features may change, be interrupted, or become unavailable. Keep copies of content that you cannot afford to lose." },
  { title: "Third-party services", body: "Sign-in and image features may rely on services such as Google, GitHub, and Cloudinary. Their terms and privacy practices apply to your use of those services." },
  { title: "Disclaimers and liability", body: "CodeVerse is provided as available. Community content is shared by its authors and is not professional or security advice. To the extent permitted by applicable law, CodeVerse is not responsible for indirect or consequential loss arising from use of the service. Nothing in these terms limits rights or liability that cannot legally be limited." },
  { title: "Changes and contact", body: "We may update these terms as the service changes. Continued use after an update means you accept the revised terms where permitted by law. For questions, use the contact channel provided by the CodeVerse operator where you accessed the service; this project does not currently publish a dedicated support email address." },
];

export default function TermsPage() {
  return (
    <MarketingPageShell>
      <main className="relative min-h-screen overflow-hidden bg-[#050505] px-5 pb-24 pt-28 text-white sm:px-8">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-180 -translate-x-1/2 rounded-full bg-red-600/10 blur-[140px]" />
        <article className="relative mx-auto max-w-4xl">
          <Link href="/" className="text-sm text-red-400 hover:text-red-300">← Back to CodeVerse</Link>
          <p className="mt-10 text-xs uppercase tracking-[0.2em] text-red-400">CodeVerse · Legal</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-white/50">Effective date: November 6, 2026</p>
          <p className="mt-8 leading-7 text-white/70">These terms apply when you access or use CodeVerse. By creating an account or using the service, you agree to them.</p>
          <div className="mt-14 border-t border-white/10">
            {sections.map(({ title, body }, index) => (
              <section key={title} className="grid gap-3 border-b border-white/10 py-7 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-8">
                <span className="font-mono text-sm text-red-400/70">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-white/65">{body}</p>
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
    </MarketingPageShell>
  );
}
