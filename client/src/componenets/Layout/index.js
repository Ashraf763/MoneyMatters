import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

function index() {
  return (
    <div className="container-fluid d-flex vh-100 p-0">
      <div style={{ maxWidth: "250px" }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default index;
