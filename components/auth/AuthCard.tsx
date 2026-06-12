"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

interface Props {
  mode: "signin" | "signup";
}

const AuthCard = ({ mode }: Props) => {
  const isSignIn = mode === "signin";
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111]">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
      </div>
    );
  }

  if (status === "authenticated") return null;

  return (
    
    <div className="min-h-screen w-full bg-[#111] flex flex-col items-center justify-center px-4 py-10">

      <div className="flex items-center justify-center gap-3 mb-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-white/30 group-hover:text-white/60 transition-colors text-lg">←</span>
        </Link>
        <Image src="/logo2.png" alt="CodeVerse" width={36} height={36} className="rounded-full" />
        <span className="text-base font-semibold text-white/80 tracking-tight">CodeVerse</span>
      </div>

 
      <div className="w-full max-w-[900px] flex rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">

       
        <div className="w-full lg:w-[48%] bg-[#161616] px-10 py-10 flex flex-col">

         
          <h1 className="text-2xl font-bold text-white mb-1">
            {isSignIn ? "Sign in to your account" : "Create your account"}
          </h1>
          <p className="text-sm text-white/35 mb-7">
            {isSignIn
              ? "Enter your credentials to access your workspace."
              : "Join thousands of developers building publicly."}
          </p>

          
          <div className="flex-1">
            {isSignIn ? <SignInCard /> : <SignUpCard />}
          </div>

        
          <p className="mt-6 text-center text-sm text-white/35">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="text-red-500 hover:text-red-400 font-semibold transition-colors"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </Link>
          </p>

      
          <p className="mt-3 text-center text-[11px] text-white/15 leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-white/30 transition-colors">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline hover:text-white/30 transition-colors">Privacy Policy</Link>.
          </p>
        </div>

        
        <div className="hidden lg:flex flex-col w-[52%] bg-[#0f0f0f] px-10 py-10 relative overflow-hidden border-l border-white/[0.06]">

          
          <div className="absolute -top-20 -right-20 w-[350px] h-[350px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-4 leading-snug">
              {isSignIn ? "Welcome back to CodeVerse" : "Start building publicly on CodeVerse"}
            </h2>

            <p className="text-sm text-white/45 leading-relaxed mb-3">
              {isSignIn
                ? "Pick up where you left off. Your posts, snippets, questions, and tasks are all waiting for you."
                : "Build your public developer identity — share your learning, save reusable code, and connect with real developers."}
            </p>

            <p className="text-sm text-white/20 leading-relaxed">
              CodeVerse is an all-in-one developer workspace with technical posts, a snippet library, community Q&amp;A, and developer task tracking built into one focused ecosystem.
            </p>
          </div>

      
          <div className="mt-6">
            <svg
              viewBox="0 0 380 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
            >
             
              <line x1="190" y1="110" x2="68"  y2="44"  stroke="#ef4444" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
              <line x1="190" y1="110" x2="312" y2="44"  stroke="#ef4444" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
              <line x1="190" y1="110" x2="62"  y2="178" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
              <line x1="190" y1="110" x2="318" y2="178" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />

          
              <circle cx="190" cy="110" r="34" fill="#0f0f0f" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="190" cy="110" r="24" fill="#0f0f0f" stroke="#ef4444" strokeWidth="0.6" strokeOpacity="0.2" />
              <text x="190" y="106" textAnchor="middle" fill="#ef4444" fontSize="9.5" fontWeight="700" fontFamily="monospace" opacity="0.9">CODE</text>
              <text x="190" y="119" textAnchor="middle" fill="#ef4444" fontSize="9.5" fontWeight="700" fontFamily="monospace" opacity="0.9">VERSE</text>

              <rect x="20"  y="10" width="97" height="68" rx="10" fill="#161616" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.4" />
              <rect x="32"  y="22" width="22" height="2.5" rx="1.2" fill="#ef4444" fillOpacity="0.55" />
              <rect x="32"  y="29" width="60" height="2"   rx="1"   fill="white"   fillOpacity="0.1" />
              <rect x="32"  y="34" width="50" height="2"   rx="1"   fill="white"   fillOpacity="0.07" />
              <rect x="32"  y="39" width="55" height="2"   rx="1"   fill="white"   fillOpacity="0.07" />
              <rect x="32"  y="44" width="42" height="2"   rx="1"   fill="white"   fillOpacity="0.05" />
              <circle cx="36" cy="66" r="3.5" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="0.8" strokeOpacity="0.4" />
              <text x="68" y="88" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="monospace" opacity="0.4">Posts</text>

             
              <rect x="263" y="10" width="97" height="68" rx="10" fill="#161616" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.4" />
              <rect x="274" y="22" width="14" height="2.5" rx="1.2" fill="#ef4444" fillOpacity="0.35" />
              <rect x="292" y="22" width="28" height="2.5" rx="1.2" fill="#ef4444" fillOpacity="0.2" />
              <rect x="274" y="30" width="70" height="2"   rx="1"   fill="white"   fillOpacity="0.08" />
              <rect x="274" y="35" width="58" height="2"   rx="1"   fill="white"   fillOpacity="0.06" />
              <rect x="274" y="40" width="64" height="2"   rx="1"   fill="white"   fillOpacity="0.06" />
              <rect x="274" y="45" width="48" height="2"   rx="1"   fill="white"   fillOpacity="0.05" />
              <circle cx="278" cy="66" r="3.5" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="0.8" strokeOpacity="0.4" />
              <text x="312" y="88" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="monospace" opacity="0.4">Snippets</text>

            
              <rect x="14"  y="144" width="97" height="68" rx="10" fill="#161616" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.4" />
              <circle cx="34" cy="164" r="7"  fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.45" />
              <circle cx="34" cy="164" r="2.5" fill="#ef4444" fillOpacity="0.35" />
              <rect x="48" y="160" width="46" height="2"   rx="1"   fill="white"   fillOpacity="0.1" />
              <rect x="48" y="165" width="36" height="2"   rx="1"   fill="white"   fillOpacity="0.07" />
              <rect x="24" y="174" width="70" height="2"   rx="1"   fill="white"   fillOpacity="0.06" />
              <rect x="24" y="179" width="58" height="2"   rx="1"   fill="white"   fillOpacity="0.05" />
              <text x="62" y="222" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="monospace" opacity="0.4">Q&amp;A</text>

            
              <rect x="269" y="144" width="97" height="68" rx="10" fill="#161616" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.4" />
            
              <rect x="280" y="158" width="9" height="9" rx="2" fill="none" stroke="#ef4444" strokeWidth="1.1" strokeOpacity="0.55" />
              <line x1="282" y1="163" x2="284" y2="165" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.7" />
              <line x1="284" y1="165" x2="289" y2="159" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.7" />
              <rect x="294" y="160" width="56" height="2"   rx="1"   fill="white"   fillOpacity="0.1" />
              <rect x="294" y="165" width="44" height="2"   rx="1"   fill="white"   fillOpacity="0.07" />

              <rect x="280" y="173" width="9" height="9" rx="2" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.2" />
              <rect x="294" y="175" width="60" height="2"   rx="1"   fill="white"   fillOpacity="0.07" />
              <rect x="294" y="180" width="46" height="2"   rx="1"   fill="white"   fillOpacity="0.05" />

              <text x="318" y="222" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="monospace" opacity="0.4">Tasks</text>
              <circle cx="68"  cy="44"  r="2.5" fill="#ef4444" fillOpacity="0.35" />
              <circle cx="312" cy="44"  r="2.5" fill="#ef4444" fillOpacity="0.35" />
              <circle cx="62"  cy="178" r="2.5" fill="#ef4444" fillOpacity="0.35" />
              <circle cx="318" cy="178" r="2.5" fill="#ef4444" fillOpacity="0.35" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;