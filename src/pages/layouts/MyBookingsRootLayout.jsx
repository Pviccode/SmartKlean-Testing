import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer.jsx";

export default function MyBookingsRootLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}
