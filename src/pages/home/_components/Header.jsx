import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <Logo showName={false} bgColor="white" />
        <span className="sr-only">Eventos, charlas y conferencias</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Inicio
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Mis eventos
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
