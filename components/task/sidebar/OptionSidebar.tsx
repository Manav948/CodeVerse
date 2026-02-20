"use client";

import { ActiveSection } from "./SidebarContainer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  active: ActiveSection;
}

const OptionSidebar = ({ active }: Props) => {
  const router = useRouter();

  return (
    <div className="w-64 border-r border-white/10 bg-black p-6 text-white">
      <h1 className="mb-6 text-xl font-semibold capitalize">
        {active}
      </h1>

      {active === "tasks" && (
        <div className="space-y-4">
          <Button
            className="w-full justify-start gap-2"
            onClick={() =>
              router.push("/task/new")
            }
          >
            <Plus size={16} />
            New Task
          </Button>

          <Separator className="bg-white/10" />

          <div className="space-y-2 text-sm text-white/70">
            <button
              onClick={() =>
                router.push("/dashboard/tasks")
              }
              className="block w-full text-left hover:text-white"
            >
              All Tasks
            </button>

            <button className="block w-full text-left hover:text-white">
              Pending
            </button>

            <button className="block w-full text-left hover:text-white">
              Completed
            </button>

            <button className="block w-full text-left hover:text-white">
              Overdue
            </button>
          </div>
        </div>
      )}

      {active === "dashboard" && (
        <div className="space-y-3 text-sm text-white/70">
          <button
            onClick={() =>
              router.push("/dashboard/analytics")
            }
            className="block w-full text-left hover:text-white"
          >
            Overview
          </button>

          <button className="block w-full text-left hover:text-white">
            Productivity
          </button>

          <button className="block w-full text-left hover:text-white">
            Activity
          </button>
        </div>
      )}

      {active === "calendar" && (
        <div className="text-sm text-white/60">
          Calendar View
        </div>
      )}

      {active === "home" && (
        <div className="text-sm text-white/60">
          Welcome Home
        </div>
      )}
    </div>
  );
};

export default OptionSidebar;