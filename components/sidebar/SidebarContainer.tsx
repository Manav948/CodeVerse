import OptionSidebar from "./OptionSidebar";

const SidebarContainer = () => {
  return (
    <aside
      className="
        hidden md:block sticky top-20 h-[calc(100vh-4.2rem)] w-64 shrink-0 border-r border-white/10  p-4
        backdrop-blur-xl
      "
    >
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-purple-500 to-cyan-500" />
        <h1
          className="
            text-lg font-bold
            bg-linear-to-r from-purple-400 via-cyan-400 to-purple-400
            bg-size-[200%_200%]
            bg-clip-text text-transparent
            animate-gradient
          "
        >
          Code Verse
        </h1>
      </div>

      <div className="mb-4 h-px bg-white/10" />

      <OptionSidebar />
    </aside>
  );
};

export default SidebarContainer;
