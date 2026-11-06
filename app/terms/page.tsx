import type { Metadata } from "next";
import Link from "next/link";

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
    <main className="min-h-screen bg-black px-5 py-16 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-red-400 hover:text-red-300">← Back to CodeVerse</Link>
        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-red-400">CodeVerse · Legal</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-white/50">Effective date: November 6, 2026</p>
        <p className="mt-8 leading-7 text-white/70">These terms apply when you access or use CodeVerse. By creating an account or using the service, you agree to them.</p>
        <div className="mt-10 space-y-9">
          {sections.map(({ title, body }) => (
            <section key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-white/65">{body}</p>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
