import BottomNavigation from '@/components/navigation/BottomNavigation'
import DashboardContainer from '@/components/task/dashboard/DashboardContainer'
import Sidebar from '@/components/task/sidebar/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className='bg-black text-white min-h-screen'>
      <DashboardContainer />
      <BottomNavigation />
    </div>
  )
}

export default page
