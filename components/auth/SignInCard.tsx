"use client";

import { signInSchema } from "@/schema/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ProviderBtns from "./ProviderBtns";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoadingState } from "../ui/LoadingState";

type SignInValues = z.infer<typeof signInSchema>;

const SignInCard = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: SignInValues) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (!res) { toast.error("Server did not respond."); return; }
      if (res.error) { toast.error("Invalid email or password."); return; }
      if (res.ok) { toast.success("Signed in successfully."); router.replace("/dashboard"); return; }
      toast.error("Unexpected authentication response.");
    } catch (error) {
      console.error("Sign-in failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

        
        <ProviderBtns intent="signin" onLoading={setLoading} disabled={loading} />

       
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/[0.08]" />
          <span className="text-xs text-white/30 tracking-widest">OR</span>
          <div className="h-px flex-1 bg-white/[0.08]" />
        </div>

       
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-1.5">
              <FormLabel className="text-xs font-medium text-white/60">
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  disabled={loading}
                  autoComplete="email"
                  {...field}
                  className="h-11 bg-white/[0.04] border-white/[0.1] text-white placeholder:text-white/20 focus:border-red-500/50 focus:ring-0 rounded-lg text-sm"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

       
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="gap-1.5">
              <div className="flex items-center justify-between">
                <FormLabel className="text-xs font-medium text-white/60">
                  Password <span className="text-red-500">*</span>
                </FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs text-red-500/70 hover:text-red-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  disabled={loading}
                  autoComplete="current-password"
                  {...field}
                  className="h-11 bg-white/[0.04] border-white/[0.1] text-white placeholder:text-white/20 focus:border-red-500/50 focus:ring-0 rounded-lg text-sm"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

    
        <Button
          type="submit"
          disabled={loading}
          className="mt-1 h-11 rounded-lg bg-red-600 hover:bg-red-500 font-semibold text-white text-sm transition-all duration-200 shadow-lg shadow-red-600/20 disabled:opacity-50"
        >
          {loading ? <LoadingState loadingText="Signing in" /> : "Continue"}
        </Button>

      </form>
    </Form>
  );
};

export default SignInCard;