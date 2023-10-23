// Layout.js

import Sidebar from "../sidebar/Sidebar";

interface LayoutSidebarProps {
    children: any
}

const LayoutSidebar: React.FC<LayoutSidebarProps> = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <main className="home-section">{children}</main>
    </div>
  );
};

export default LayoutSidebar;