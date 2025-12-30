import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet/>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
