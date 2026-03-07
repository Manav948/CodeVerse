import Dashboard from '@/components/dashboard/Dashboard'
import BottomNavigation from '@/components/navigation/BottomNavigation'
import PostContainer from '@/components/post/PostContainer'

const page = () => {
    return (
        <div className='bg-black  text-white'>
            <PostContainer />
            <BottomNavigation />
        </div>
    )
}

export default page
