import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../../components/ui.css";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      <div className="flex flex-col">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}
