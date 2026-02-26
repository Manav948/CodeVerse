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
import { LoadingState } from "../ui/LoadingState";

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUpCard = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
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

      if (res?.error) {
        toast.error("Login failed. Please sign in manually.");
        router.replace("/sign-in");
        return;
      }

      // If login successful → go dashboard
      router.replace("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409) {
          toast.error("Email or username already exists.");
        } else if (status === 400) {
          toast.error("Invalid data submitted.");
        } else {
          toast.error("Server error. Please try again.");
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="relative overflow-hidden rounded-3xl p-8">

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
        
          <ProviderBtns
            intent="signup"
            onLoading={setLoading}
            disabled={loading}
          />

          <div className="relative flex items-center gap-2 py-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40 tracking-wide">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    disabled={loading}
                    autoComplete="email"
                    {...field}
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-cyan-400/40 focus:ring-cyan-400/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Username"
                    disabled={loading}
                    autoComplete="username"
                    {...field}
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400/40 focus:ring-purple-400/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    autoComplete="new-password"
                    {...field}
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400/40 focus:ring-purple-400/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            type="submit"
            className="mt-2 h-11 rounded-xl bg-red-500/60 font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <LoadingState loadingText="Creating account" />
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default SignUpCard;