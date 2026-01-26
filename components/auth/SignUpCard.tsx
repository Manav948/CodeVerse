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
import Link from "next/link";
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
  });

  const onSubmit = async (values: SignUpValues) => {
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
        router.push("/sign-in");
        return;
      }

      router.push("/");
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast.error("Email already exists");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContent className="relative overflow-hidden rounded-3xl p-3">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-[#0f172a] via-[#020617] to-[#020617]" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <ProviderBtns intent="signup" onLoading={setLoading} />

          <div className="relative flex items-center gap-2 py-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

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
                    className="h-8 bg-white/5 border-white/10 text-white placeholder:text-white/40"
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
                    {...field}
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
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
                    {...field}
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            className="mt-2 h-11 rounded-xl bg-linear-to-r from-purple-500 to-cyan-500 font-semibold text-white hover:opacity-90"
            type="submit"
          >
            {loading ? <LoadingState loadingText="Creating account" /> : "Create account"}
          </Button>

          {/* <p className="text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-cyan-400 hover:underline"
            >
              Sign in
            </Link>
          </p> */}
        </form>
      </Form>
    </CardContent>
  );
};

export default SignUpCard;
