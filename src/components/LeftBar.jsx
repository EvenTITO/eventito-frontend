import Logo from '../assets/logo.svg';
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Home,
  Settings,
  ShoppingCart,
} from "lucide-react"

export default function LeftBar() {
  const [selected, setSelected] = useState(null);

  const handleSelect = (name) => {
    setSelected(name);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <img src={Logo} alt="" className="size-6 transition-all group-hover:scale-110" />
        </Link>
        <Link
          href="#"
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === 'home' ? 'bg-accent' : ''}`}
          onClick={() => handleSelect('home')}
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Dashboard</span>
        </Link>
        <Link
          href="#"
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === 'cart' ? 'bg-accent' : ''}`}
          onClick={() => handleSelect('cart')}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Orders</span>
        </Link>
        <Link
          href="#"
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === 'notification' ? 'bg-accent' : ''}`}
          onClick={() => handleSelect('notification')}
        >
          <Bell className="h-5 w-5" />
          <span className="sr-only">Products</span>
        </Link>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${selected === 'settings' ? 'bg-accent' : ''}`}
          onClick={() => handleSelect('settings')}
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
