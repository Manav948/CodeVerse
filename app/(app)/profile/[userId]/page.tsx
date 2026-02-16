import ProfileContainer from '@/components/profile/ProfileContainer'
import React from 'react'

interface Props {
    params: Promise<{ userId: string }>
}
const page = async ({ params }: Props) => {
    const { userId } = await params
    return (
        <div>
            <ProfileContainer userId={userId} />
        </div>
    )
}

export default page
