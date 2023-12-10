import Sidebar from "../sidebar/bar/Sidebar";


interface LayoutSidebarProps {
    children: any
}

const LayoutSidebar: React.FC<LayoutSidebarProps> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <main id="mainSection" className="home-section">{children}</main>
    </div>
  );
};

export default LayoutSidebar;