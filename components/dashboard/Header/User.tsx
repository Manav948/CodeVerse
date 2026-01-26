import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from '@/components/ui/user-avatar'
import { LogOut, Settings, Settings2 } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
const User = () => {
    const logOutHandler = async () => {
        await signOut({ callbackUrl: "/sign-in" });
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="rounded-full ring-2 ring-transparent hover:ring-white/20 transition">
                        <UserAvatar />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    sideOffset={10}
                    className="w-56 rounded-xl border border-white/10 bg-black p-2 text-gray-400 shadow-xl"
                >
                    {/* User info */}
                    <div className="flex items-center gap-3 px-2 py-2">
                        <UserAvatar />
                        <div className="leading-tight">
                            <p className="text-sm font-medium">username</p>
                            <p className="text-xs text-white/50">guest@example.com</p>
                        </div>
                    </div>

                    <DropdownMenuSeparator className="my-2 bg-white/10" />

                    <DropdownMenuItem asChild>
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-white/10"
                        >
                            <Settings size={16} />
                            Settings
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={logOutHandler}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-red-400 hover:bg-red-500/10"
                    >
                        <LogOut size={16} />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

export default User
