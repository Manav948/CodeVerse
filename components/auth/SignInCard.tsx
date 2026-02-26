"use client";

import { signInSchema } from "@/schema/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

      if (!res) {
        toast.error("Server did not respond.");
        return;
      }

      if (res.error) {
        toast.error("Invalid email or password.");
        return;
      }

      if (res.ok) {
        toast.success("Signed in successfully.");
        router.replace("/dashboard");
        return;
      }

      toast.error("Unexpected authentication response.");
    } catch (error) {
      console.error("Sign-in failed:", error);
      toast.error("Something went wrong. Please try again.");
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
            intent="signin"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    disabled={loading}
                    autoComplete="current-password"
                    {...field}
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400/40 focus:ring-purple-400/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 h-11 rounded-xl bg-red-500/60 font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <LoadingState loadingText="Signing in" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default SignInCard;