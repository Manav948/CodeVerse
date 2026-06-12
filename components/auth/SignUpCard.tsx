"use client";

import { signUpSchema } from "@/schema/signUpSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

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

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUpCard = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: "", email: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: SignUpValues) => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.post("/api/auth/register", values);
      toast.success("Account created successfully");
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (res?.error) { toast.error("Login failed. Please sign in manually."); router.replace("/sign-in"); return; }
      router.replace("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 409) toast.error("Email or username already exists.");
        else if (status === 400) toast.error("Invalid data submitted.");
        else toast.error("Server error. Please try again.");
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">

      
        <ProviderBtns intent="signup" onLoading={setLoading} disabled={loading} />

    
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
          name="username"
          render={({ field }) => (
            <FormItem className="gap-1.5">
              <FormLabel className="text-xs font-medium text-white/60">
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="your_username"
                  disabled={loading}
                  autoComplete="username"
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
              <FormLabel className="text-xs font-medium text-white/60">
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Create a strong password"
                  disabled={loading}
                  autoComplete="new-password"
                  {...field}
                  className="h-11 bg-white/[0.04] border-white/[0.1] text-white placeholder:text-white/20 focus:border-red-500/50 focus:ring-0 rounded-lg text-sm"
                />
              </FormControl>
              <FormMessage className="text-red-400 text-xs" />
            </FormItem>
          )}
        />

     
        <Button
          disabled={loading}
          type="submit"
          className="mt-1 h-11 rounded-lg bg-red-600 hover:bg-red-500 font-semibold text-white text-sm transition-all duration-200 shadow-lg shadow-red-600/20 disabled:opacity-50"
        >
          {loading ? <LoadingState loadingText="Creating account" /> : "Continue"}
        </Button>

      </form>
    </Form>
  );
};

export default SignUpCard;