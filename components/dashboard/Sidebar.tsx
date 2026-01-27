import SidebarContainer from "../sidebar/SidebarContainer";
import SidebarMobile from "../sidebar/SidebarMobile";

const Sidebar = () => {
  return (
    <>
      {/* Mobile hamburger */}
      <div className="md:hidden">
        <SidebarMobile />
      </div>

      {/* Desktop sidebar */}
      <SidebarContainer />
    </>
  );
};

export default Sidebar;
