import React from 'react'
import ProviderBtn from './ProviderBtn'
import Image from 'next/image'
interface Props {
    SignInCard?: boolean
    disabled?: boolean
    intent: "signin" | "signup";
    onLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const ProviderBtns = ({ SignInCard, disabled, onLoading, intent }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <ProviderBtn
                onLoading={onLoading}
                providerName="google"
                disabled={disabled}
                intent={intent}
                className="w-full flex items-center gap-2 rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
            >
                <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                />
                Sign with Google
                {SignInCard ? "Continue with google" : ""}
            </ProviderBtn>

            <ProviderBtn
                onLoading={onLoading}
                disabled={disabled}
                providerName="github"
                intent={intent}
                className="w-full flex items-center gap-2 rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
            >
                <Image
                    src="/github.png"
                    alt="GitHub"
                    width={20}
                    height={20}
                />
                Sign with GitHub
                {SignInCard ? "continue with github" : ""}
            </ProviderBtn>
        </div>
    )
}

export default ProviderBtns
