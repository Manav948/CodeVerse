import Header from "../dashboard/Header/Header";
import Sidebar from "../dashboard/Sidebar";
import AllSnippet from "./AllSnippet";

const SnippetContainer = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="flex p-2 pt-6">
        <aside className="">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <AllSnippet />
        </main>
      </div>
    </div>
  );
};

export default SnippetContainer;
