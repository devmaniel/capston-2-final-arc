// screens components
import Nav from "../screen/admin/common/Nav";
import Drawer from "@screen/admin/common/Drawer";
import Breadcrumps from "@screen/admin/common/Breadcrumbs";
import Notifications from "@screen/admin/common/Notifications";
import ColorMode from "../../colors/colorMode";
import Base1 from "../screen/admin/default/Base1";

// styles
import "@styles/admin/AdminLand.scss";

const page = () => {
  return (
    <>
      <div className="flex">
        <Drawer />
        <div className="dashboard w-full">
          <nav className="flex p-5 justify-between ">
            <Breadcrumps links={["Dashboards", "Default"]} />
            <div className="flex items-center gap-2 right-nav">
              <Notifications />
              <ColorMode />
            </div>
          </nav>

          <Base1 />
        </div>
      </div>
      <footer className="w-full h-10 mt-[1600px]">
        
      </footer>
    </>
  );
};

export default page;
