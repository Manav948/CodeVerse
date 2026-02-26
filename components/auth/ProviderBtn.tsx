"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "../ui/button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  providerName: "google" | "github";
  intent: "signin" | "signup";
  onLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProviderBtn = ({
  children,
  providerName,
  intent,
  onLoading,
  disabled,
  ...props
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const signInHandler = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      onLoading?.(true);

      await signIn(providerName, {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("OAuth Sign-In Error:", error);
    } finally {
      setIsLoading(false);
      onLoading?.(false);
    }
  };

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={signInHandler}
      disabled={isLoading || disabled}
      className="w-full relative"
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Connecting...
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default ProviderBtn;