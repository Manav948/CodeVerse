"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const onSubmit = () => {
      router.push("/sign-in")
  }
   const onSubmit2 = () => {
      router.push("/sign-up")
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black gap-3">
      <div>
        <Button onClick={onSubmit}>
          Sign in
        </Button>
          <Button onClick={onSubmit2}>
          Sign up
        </Button>
      </div>
    </div>
  );
}