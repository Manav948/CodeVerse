import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | CodeVerse",
  description: "How CodeVerse handles account information and community content.",
};

const sections = [
  { title: "Information you provide", body: "When you register or use CodeVerse, we process account details such as your name, username, email address, profile image, and authentication data. You can sign in with email credentials or a connected Google or GitHub account. You may also submit profile details, posts, articles, questions, answers, snippets, comments, task information, images, likes, and bookmarks. Public community content and profile details can be seen by other users." },
  { title: "How we use information", body: "We use information to create and secure accounts, show your profile and community contributions, provide features such as bookmarks and task tracking, store preferences, respond to requests, prevent abuse, and maintain the service. We do not sell personal information." },
  { title: "Service providers", body: "CodeVerse relies on third-party services to operate. Google or GitHub may handle sign-in according to your chosen provider. Images are uploaded to and delivered through Cloudinary. Hosting, database, and infrastructure providers may process information needed to run the site, including technical logs. Those providers handle data under their own terms and privacy notices." },
  { title: "Cookies and technical data", body: "Authentication and essential site functions may use cookies or similar browser storage. Requests may also generate technical information such as IP address, browser or device details, and diagnostic logs. Blocking cookies may prevent sign-in or other features from working." },
  { title: "Your choices and requests", body: "You can update profile information in CodeVerse settings and stop using the service at any time. You may request access to, correction of, or deletion of your personal information. Use the contact channel provided by the CodeVerse operator where you accessed the service; this project does not currently publish a dedicated support email address. Some information may be retained for security, backups, legal obligations, or dispute resolution." },
  { title: "Retention and security", body: "We keep information while needed to provide and protect CodeVerse and meet applicable obligations. Backups and security logs may persist for a limited period after an account or item is changed or removed. We use reasonable safeguards, but no online service can guarantee absolute security." },
  { title: "Children and international processing", body: "CodeVerse is a developer community and is not intended for children under 13. Information may be processed in countries other than where you live, depending on the service providers used to operate the site." },
  { title: "Changes", body: "This policy may change as CodeVerse or its providers change. The latest version and effective date will appear on this page." },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black px-5 py-16 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm text-red-400 hover:text-red-300">← Back to CodeVerse</Link>
        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-red-400">CodeVerse · Legal</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-white/50">Effective date: November 6, 2026</p>
        <p className="mt-8 leading-7 text-white/70">This policy describes the information handled when you use CodeVerse, a community for sharing developer content and managing coding tasks.</p>
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
