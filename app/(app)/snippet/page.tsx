import BottomNavigation from '@/components/navigation/BottomNavigation'
import SnippetContainer from '@/components/snippet/SnippetContainer'

const page = async() => {
  return (
    <div className='bg-black text-white min-h-screen'>
        <SnippetContainer />
        <BottomNavigation />
    </div>
  )
}

export default page
