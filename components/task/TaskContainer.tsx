"use client";

import React, { useState } from "react";
import { ActiveSection } from "./sidebar/SidebarContainer";
import Header from "../dashboard/Header/Header";
import AllTask from "./AllTask";
import Sidebar from "./sidebar/Sidebar";
import { motion, AnimatePresence } from "framer-motion";

const TaskContainer = () => {
  const [active, setActive] =
    useState<ActiveSection>("tasks");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative flex">
      <aside className="hidden lg:flex w-16">
        <Sidebar active={active} setActive={setActive} />
      </aside>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -80 }}
              animate={{ x: 0 }}
              exit={{ x: -80 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 h-full w-16 bg-black border-r border-white/10 z-50 lg:hidden"
            >
              <Sidebar active={active} setActive={setActive} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        <Header  />
        <main className="flex-1 overflow-y-auto p-3 md:p-8">
          <AllTask />
        </main>

      </div>
    </div>
  );
};

export default TaskContainer;