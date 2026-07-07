import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-base-100">

      <Navbar />

      <main>{children}</main>

      <Footer />

    </div>
  );
}

export default MainLayout;