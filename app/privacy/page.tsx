import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CodeVerse",
  description: "Learn how CodeVerse collects, uses, and protects personal information.",
};

const sections = [
  {
    title: "Information we collect",
    body: "When you create or use an account, we process information such as your name, username, email address, profile image, and authentication details. If you sign in with Google or GitHub, those providers share account information with us according to your sign-in choices and their own privacy policies. We do not receive your third-party account password. You may also provide content such as posts, articles, questions, answers, code snippets, comments, profile details, images, links, task information, likes, and bookmarks. Some of this content and profile information may be visible to other users. We also receive technical information needed to operate and secure the service, such as request and device information, IP address, and information stored in necessary authentication or security cookies. The hosting and infrastructure providers used to run the live service may process server and diagnostic logs.",
  },
  {
    title: "How we use information",
    body: "We use information to create and secure accounts, provide CodeVerse features, display community content, store your preferences and activity, respond to requests, prevent abuse, maintain the service, and meet legal obligations. We use uploaded images to provide the image features you request. We do not sell personal information. We share information with service providers that help operate CodeVerse, including authentication providers, database and hosting providers, and Cloudinary for image uploads and delivery. These providers process information under their own terms and privacy practices.",
  },
  {
    title: "Cookies and similar technologies",
    body: "CodeVerse uses cookies or similar browser storage for sign-in, session management, security, and essential site functionality. Your browser can be configured to block or delete cookies, but some features may then stop working. If analytics or advertising technologies are enabled, those services may also use cookies, pixels, web beacons, IP addresses, or similar identifiers as described below and by the relevant providers.",
  },
  {
    title: "Advertising and Google AdSense",
    body: "If Google AdSense or other third-party advertising is enabled on CodeVerse, Google and its advertising partners may use cookies to serve, measure, and personalize ads based on a user's visits to this site or other sites. Third-party vendors may place and read cookies in your browser, or use web beacons, IP addresses, or similar identifiers to collect information as a result of ad serving. Google's use of advertising cookies enables Google and its partners to serve ads based on your visits to CodeVerse and/or other sites. You can manage Google's personalized advertising settings at Google Ads Settings, and learn how Google uses information on partner sites at How Google uses information from sites or apps that use its services. You can also visit aboutads.info to opt out of some participating third-party vendors' personalized advertising. If other ad networks serve ads, we will identify them here and link to their privacy and opt-out information.",
  },
  {
    title: "Choices and privacy rights",
    body: "You can review and update profile information through account settings. You can stop using the service at any time. To request access to, correction of, or deletion of personal information, or to ask a privacy question, contact the CodeVerse site operator using the contact details provided on the website where you accessed this policy. Depending on where you live, you may have additional rights under applicable privacy laws. We may need to retain some information where required by law, to resolve disputes, or to protect the service and its users.",
  },
  {
    title: "International visitors and advertising consent",
    body: "Information may be processed in countries other than the country where you live, subject to the safeguards required by applicable law. Where required by Google's EU User Consent Policy or local law, users in the European Economic Area, the United Kingdom, and Switzerland must receive the required disclosures and a valid consent choice before applicable advertising cookies or personal data are used for advertising. A privacy policy by itself does not collect that consent. The site operator must configure and maintain a compliant consent management platform and advertising settings before serving ads to those users.",
  },
  {
    title: "Children's privacy",
    body: "CodeVerse is a developer community and is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, contact the site operator so it can be reviewed and removed as appropriate. We do not knowingly use personalized advertising based on activity of users known to be under 13.",
  },
  {
    title: "Security and retention",
    body: "We use reasonable measures designed to protect information, but no online service can guarantee complete security. We retain account and content information for as long as needed to provide the service and for legitimate operational, safety, and legal purposes. Backups and logs may remain for a limited time after information is changed or deleted.",
  },
  {
    title: "Changes and contact",
    body: "We may update this policy when our practices or legal requirements change. The updated version will be posted on this page with a revised effective date. For privacy questions or requests, use the contact information published by the CodeVerse site operator on the website.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black px-5 py-16 text-white sm:px-8">
      <article className="mx-auto max-w-3xl">
        <a href="/" className="text-sm text-red-400 hover:text-red-300">← Back to CodeVerse</a>
        <p className="mt-10 text-xs uppercase tracking-[0.2em] text-red-400">CodeVerse · Legal</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-white/50">Effective date: November 5, 2026</p>
        <p className="mt-8 leading-7 text-white/70">
          This policy explains how CodeVerse handles information when you use the website and its community features. It should be reviewed and updated by the site operator to reflect the live services, providers, and contact details before publication.
        </p>
        <div className="mt-10 space-y-9">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 leading-7 text-white/65">{section.body}</p>
              {section.title === "Advertising and Google AdSense" && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-white/65">
                  <li><a className="text-red-300 underline underline-offset-4" href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google Ads Settings</a></li>
                  <li><a className="text-red-300 underline underline-offset-4" href="https://business.safety.google/privacy/" target="_blank" rel="noreferrer">How Google uses information from sites or apps that use its services</a></li>
                  <li><a className="text-red-300 underline underline-offset-4" href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer">Opt out of some participating third-party vendors</a></li>
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
