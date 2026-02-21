"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import OptionSidebar from "./OptionSidebar";
import { motion } from "framer-motion";

export type ActiveSection =
    | "home"
    | "tasks"
    | "calendar"
    | "dashboard";

const SidebarContainer = () => {
    const [active, setActive] =
        useState<ActiveSection>("home");

    const pathname = usePathname();
    const isNewTask = pathname === "/task/new";

    const showOptionSidebar =
        !isNewTask &&
        (active === "tasks" ||
            active === "dashboard");

    return (
        <div className="flex h-screen">
            <Sidebar active={active} setActive={setActive} />

            {showOptionSidebar && (
                <motion.div
                    key={"option-sidebar"}
                    initial={{ width: 0, opacity: 0, x: -20 }}
                    animate={{ width: "auto", opacity: 1, x: 0 }}
                    exit={{ width: 0, opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden border-l border-white/10 h-full flex"
                >
                    <OptionSidebar active={active} />
                </motion.div>
            )}
        </div>
    );
};

export default SidebarContainer;