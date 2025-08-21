import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet key={location.pathname} />
      </main>
      <Footer />
    </div>
  );
}
