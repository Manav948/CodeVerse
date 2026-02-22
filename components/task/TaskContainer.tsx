import React from "react";
import SidebarContainer from "./sidebar/SidebarContainer";
import Header from "../dashboard/Header/Header";
import AllTask from "./AllTask";

const TaskContainer = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="flex">
        <div className="">
          <SidebarContainer />
        </div>
        <div className="flex-1 p-10">
          <AllTask />
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;