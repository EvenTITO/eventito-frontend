import Logo from "@/assets/logo.svg";
import { Link } from "react-router-dom";

export default function EventitoLogo({bgColor="gray-100"}) {
  return (
    <Link
      to={'/'}
      className={`group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base bg-${bgColor}-100 p-1`}
    >
      <img src={Logo} alt="" className="size-6 transition-all group-hover:scale-110" />
    </Link>
  );
}
