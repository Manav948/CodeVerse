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
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <div className="w-full max-w-md">
      <Card className="relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          <Image
            className="rounded-full object-cover shadow-md"
            alt="Auth logo"
            width={56}
            height={56}
            src="/logo.jpg"
          />

          <CardTitle className="text-2xl font-semibold text-white">
            {isSignIn ? "Welcome back" : "Create your account"}
          </CardTitle>

          <CardDescription className="text-sm text-white/60">
            {isSignIn
              ? "Sign in to continue to CodeVerse"
              : "Get started with CodeVerse in seconds"}
          </CardDescription>
        </CardHeader>

        <div className="px-4 pb-6">
          {isSignIn ? <SignInCard /> : <SignUpCard />}
        </div>
      </Card>

      <p className="mt-4 text-center text-sm text-white/60">
        {isSignIn ? "Don’t have an account?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-medium text-cyan-400 hover:underline"
        >
          {isSignIn ? "Create one" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthCard;
