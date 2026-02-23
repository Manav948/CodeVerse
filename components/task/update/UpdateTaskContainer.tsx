"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "@/components/ui/Loading";
import UpdateTask from "./UpdateTask";
import Header from "@/components/dashboard/Header/Header";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import { ActiveSection } from "../sidebar/SidebarContainer";

interface Props {
  taskId: string;
}

const UpdateTaskContainer = ({ taskId }: Props) => {
  const [active, setActive] =
    useState<ActiveSection>("tasks");

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
      <div className="text-white/60 animate-pulse flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError || !data)
    return <div className="text-white p-10">Task not found</div>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="flex">
        <Sidebar active={active} setActive={setActive} />

        <main className="flex-1 p-5">
          <UpdateTask task={data} />
        </main>
      </div>
    </div>
  );
};

export default UpdateTaskContainer;