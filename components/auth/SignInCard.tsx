"use client";

import { signInSchema } from "@/schema/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import ProviderBtns from "./ProviderBtns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { LoadingState } from "../ui/LoadingState";

type SignInValues = z.infer<typeof signInSchema>;

const SignInCard = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInValues) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res) {
        throw new Error("No response from server");
      }

      if (res.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Signed in successfully");
      router.push("/onboarding"); // or "/"
      router.refresh();
    } catch (error) {
      console.error("Sign-in failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="relative overflow-hidden rounded-3xl p-8">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#0f172a] via-[#020617] to-[#020617]" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* OAuth */}
          <ProviderBtns intent="signin" onLoading={setLoading} />

          <div className="relative flex items-center gap-2 py-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            disabled={loading}
            className="mt-2 h-11 rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 font-semibold text-white hover:opacity-90"
            type="submit"
          >
            {loading ? (
              <LoadingState loadingText="Signing in" />
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-center text-sm text-white/60">
            Don’t have an account?{" "}
            <Link href="/sign-up" className="text-cyan-400 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </Form>
    </CardContent>
  );
};

export default SignInCard;
