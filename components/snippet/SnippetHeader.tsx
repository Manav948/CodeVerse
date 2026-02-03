"use client"
import { useSession } from 'next-auth/react'
import User from '../dashboard/Header/User'

const SnippetHeader = () => {
    const { data: session } = useSession()
    const user = session?.user
    return (
        <div>
            <div>
                <User />
                {user?.image}
                {user?.name}
                {user?.username}
            </div>
        </div>
    )
}

export default SnippetHeader
