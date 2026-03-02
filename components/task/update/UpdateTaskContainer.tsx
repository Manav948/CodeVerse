"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "@/components/ui/Loading";
import UpdateTask from "./UpdateTask";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import { ActiveSection } from "../sidebar/SidebarContainer";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  taskId: string;
}

const UpdateTaskContainer = ({ taskId }: Props) => {
  const [active, setActive] =
    useState<ActiveSection>("tasks");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await axios.get(`/api/task/update/${taskId}`);
      return res.data;
    },
    enabled: !!taskId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Task not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex relative">
      <aside className="hidden lg:flex w-16 ">
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
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <UpdateTask task={data} />
        </main>

      </div>
    </div>
  );
};

export default UpdateTaskContainer;