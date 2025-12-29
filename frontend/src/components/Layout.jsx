import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
