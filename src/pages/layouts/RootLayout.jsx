import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavigationBar/Navbar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <main className='pt-16'>
        <Outlet />
      </main>
    </>
  )
}
