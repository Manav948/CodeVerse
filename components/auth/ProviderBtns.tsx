"use client";

import ProviderBtn from "./ProviderBtn";
import Image from "next/image";

interface Props {
  disabled?: boolean;
  intent: "signin" | "signup";
  onLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProviderBtns = ({ disabled, onLoading, intent }: Props) => {
  const isSignIn = intent === "signin";

  const baseStyles =
    "w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-sm sm:text-base h-12 transition-all duration-200 hover:border-white/30 hover:bg-white/10";

  return (
    <div className="flex flex-col gap-4 text-white">
      <ProviderBtn
        onLoading={onLoading}
        providerName="google"
        disabled={disabled}
        intent={intent}
        className={"text-white " + baseStyles}
      >
        <Image
          src="/google.svg"
          alt="Google logo"
          width={20}
          height={20}
        />
        {isSignIn ? "Continue with Google" : "Sign up with Google"}
      </ProviderBtn>

      <ProviderBtn
        onLoading={onLoading}
        providerName="github"
        disabled={disabled}
        intent={intent}
        className={baseStyles + " text-white"}
      >
        <Image
          src="/github.png"
          alt="GitHub logo"
          width={30}
          height={30}
          className="bg-white rounded-full"
        />
        {isSignIn ? "Continue with GitHub" : "Sign up with GitHub"}
      </ProviderBtn>
    </div>
  );
};

export default ProviderBtns;