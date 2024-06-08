import Logo from '../assets/logo.svg';
import { Link, Navigate, useLocation } from "react-router-dom"
import { logout } from "../redux/user/userSlice";
import { logOut } from "../services/AuthorizationService";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Bell,
  Home,
  Settings,
  ShoppingCart,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const { headers } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  async function handleLogout() {
    dispatch(logout());
    await logOut();
  }

  if (!currentUser) {
    <Navigate to={'/login'} />
  } else {
    return (
      <header className="top-0 z-30 flex h-14 items-center gap-4 border-0 bg-white p-2 px-6 static h-auto">
        <Link
          to={'/'}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base bg-gray-100 p-1"
        >
          <img src={Logo} alt="" className="size-6 transition-all group-hover:scale-110" />
        </Link>
        {
          (headers.length > 1) && (
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {headers.map((header, index) => (
                  <Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        {index === 0
                          ? (
                            <Link to={header.link}>
                              <Home className="size-4 text-black" />
                            </Link>
                          )
                          : (
                            <Link to={header.link} className="text-black">{header.name}</Link>
                          )
                        }
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index < headers.length - 1 && <BreadcrumbSeparator className={"text-black"} />}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )
        }

        {/* search bar */}
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar eventos..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>

        {/* profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{currentUser.name} {currentUser.lastname}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup onValueChange={handleLogout}>
              <DropdownMenuRadioItem value="logout">
                <span>Cerrar sesión</span>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    );
  }
}
