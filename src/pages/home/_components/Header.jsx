import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  const fixedHeader = "fixed top-0 left-0 right-0 z-50"
  const headerStyle = "px-4 lg:px-6 h-14 flex items-center bg-white"

  return (
    <header className={cn(fixedHeader, headerStyle)}>
      <Link className="flex items-center justify-center" href="#">
        <Logo showName={false} bgColor="white" />
        <span className="sr-only">Eventos, charlas y conferencias</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={"/home"}
        >
          Inicio
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={"/home/my-events"}
        >
          Mis eventos
        </Link>
        <Button variant="table" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </nav>
    </header>
  );
}
