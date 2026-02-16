"use client"
import Header from '../dashboard/Header/Header'
import Sidebar from '../dashboard/Sidebar'
import Community from './Community'

const CommunityContainer = () => {
    return (
        <div>
            <div className="h-screen bg-black text-white flex flex-col">
                <Header />
                <div className="flex flex-1 overflow-hidden">

                    <aside className="hidden md:block w-64 border-r border-white/10">
                        <Sidebar />
                    </aside>

                    <main className="flex-1 overflow-y-auto relative">
                        <div className="relative mx-auto max-w-4xl py-8">
                            <Community />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default CommunityContainer
