"use client";

import Header from "@/components/dashboard/Header/Header";
import { useState } from "react";
import AddTask from "./AddTask";
import { ActiveSection } from "../sidebar/SidebarContainer";
import Sidebar from "../sidebar/Sidebar";

export default function AddTaskContainer() {
    const [active, setActive] =
        useState<ActiveSection>("tasks");

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <aside className="hidden md:flex bg-black">
                    <Sidebar
                        active={active}
                        setActive={setActive}
                    />
                </aside>
                <main className="flex-1 overflow-y-auto bg-black">
                    <div className="mx-auto max-w-5xl px-6 py-10">
                        <AddTask />
                    </div>
                </main>
            </div>
        </div>
    );
}