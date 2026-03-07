import BookmarkContainer from '@/components/bookmark/BookMarkContainer'
import BottomNavigation from '@/components/navigation/BottomNavigation'
import React from 'react'

const page = () => {

  return (
    <div className='bg-black text-white min-h-screen'>
      <BookmarkContainer />
      <BottomNavigation />
    </div>
  )
}

export default page
