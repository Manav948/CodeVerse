
import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MarketingPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

