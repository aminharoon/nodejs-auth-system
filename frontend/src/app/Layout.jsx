import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <h1 className="py-3 px-2 bg-red-400 text-4xl text-center"> HEADER</h1>
      <Outlet />
      <h1 className="py-3 px-2 bg-blue-400 text-4xl text-center">FOOTER</h1>
    </div>
  );
};

export default Layout;
