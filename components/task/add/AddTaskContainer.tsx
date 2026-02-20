import Header from "@/components/dashboard/Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import { ActiveSection } from "../sidebar/SidebarContainer";
import AddTask from "./AddTask";

const AddTaskContainer = () => {
    const [active, setActive] =
        useState<ActiveSection>("home");

    const showOptionSidebar =
        active === "tasks" ||
        active === "calendar" ||
        active === "dashboard";

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">

                <aside className="hidden md:block w-64 border-r border-white/10">
                    <Sidebar active={active} setActive={setActive}/>
                </aside>

                <main className="flex-1 overflow-y-auto relative">
                    <div className="relative mx-auto max-w-4xl py-8">
                        <AddTask />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddTaskContainer;
