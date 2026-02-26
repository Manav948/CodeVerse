"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import SignUpCard from "./SignUpCard";
import SignInCard from "./SignInCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  mode: "signin" | "signup";
}

const AuthCard = ({ mode }: Props) => {
  const isSignIn = mode === "signin";
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-75">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  if (status === "authenticated") return null;

  return (
    <div className="w-full max-w-md">
      <Card className="relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
        <div className="absolute inset-0 bg-black pointer-events-none" />

        <CardHeader className="relative flex flex-col items-center gap-3 text-center">
          <Image
            className="rounded-full object-cover shadow-lg ring-2 ring-cyan-500/30"
            alt="CodeVerse logo"
            width={56}
            height={56}
            src="/logo.jpg"
            priority
          />

          <CardTitle className="text-2xl font-semibold text-white tracking-tight">
            {isSignIn ? "Welcome back" : "Create your account"}
          </CardTitle>

          <CardDescription className="text-sm text-white/60">
            {isSignIn
              ? "Sign in to continue to CodeVerse"
              : "Get started with CodeVerse in seconds"}
          </CardDescription>
        </CardHeader>

        <div className="relative px-6 pb-6">
          {isSignIn ? <SignInCard /> : <SignUpCard />}
        </div>
      </Card>

      <p className="mt-6 text-center text-sm text-white/60">
        {isSignIn ? "Don’t have an account?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-medium text-red-500 hover:text-red-500/80 transition-colors duration-200"
        >
          {isSignIn ? "Create one" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthCard;