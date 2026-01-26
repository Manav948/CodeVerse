import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { Button } from '../ui/button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    providerName: "google" | "github"
    intent: "signin" | "signup";
    onLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ProviderBtn = ({ children, providerName, onLoading, intent, ...props }: Props) => {
    const [showLoggedInfo, setShowLoggedInfo] = useState(false);
    const signInHandler = async () => {
        onLoading(true)
        setShowLoggedInfo(true)
        try {
            await signIn(providerName, { callbackUrl: intent === "signin" ? "/sign-in" : "/" })
        } catch (error) {
            console.error("Error in signHandler function")
        } finally {
            onLoading(false);
        }
    }
    return (
        <div>
            <Button onClick={signInHandler} {...props} variant={"secondary"} type={"button"}>
                {children}
            </Button>
        </div>
    )
}

export default ProviderBtn
