"use client"
import Header from "../dashboard/Header/Header";
import Sidebar from "../dashboard/Sidebar";
import AllPost from "./AllPost";

const PostContainer = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <div className="flex flex-1">

        <aside className="hidden md:block w-64 border-r border-white/10">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl  sm:px-6 sm:py-8">
            <AllPost />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostContainer;