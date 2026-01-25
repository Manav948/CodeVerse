import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
interface Props {
    loadingText?: string;
    hideLoaderIcon?: boolean;
    className?: string;
}

export const LoadingState = ({ loadingText, hideLoaderIcon = false, className, ...props }: Props) => {
    return (
        <>
            {!hideLoaderIcon && (<Loader2 className={cn(`mr-2 h-4 2-4 animate-spin`, className)} {...props} />)}{loadingText && <p>{loadingText}</p>}
        </>
    )
}