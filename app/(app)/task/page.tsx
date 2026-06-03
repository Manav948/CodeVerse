import BottomNavigation from '@/components/navigation/BottomNavigation'
import TaskContainer from '@/components/task/TaskContainer'
import React from 'react'

const page = () => {
  return (
    <div className='bg-[#090909] text-white min-h-screen'>
      <TaskContainer />
      <BottomNavigation />
    </div>
  )
}

export default page
