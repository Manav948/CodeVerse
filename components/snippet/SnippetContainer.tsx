import Header from "../dashboard/Header/Header";
import Sidebar from "../dashboard/Sidebar";
import AllSnippet from "./AllSnippet";

const SnippetContainer = () => {
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
      
        <Sidebar />

        <main className="flex-1 overflow-y-auto relative">
          <div className="relative mx-auto max-w-4xl py-8 px-5">
            <AllSnippet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SnippetContainer;
