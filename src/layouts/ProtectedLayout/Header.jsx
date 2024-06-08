import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import {
  Home,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react";
import AvatarDropdown from '@/components/AvatarDropdown';
import SearchBar from '@/components/SearchBar';
import EventitoLogo from '@/components/ui/EventitoLogo';

export default function Header() {
  const { headers } = useSelector((state) => state.event);

  return (
    <header className="top-0 z-30 flex h-14 items-center gap-4 border-0 bg-white p-2 px-6 static h-auto">
      {/* app logo */}
      <EventitoLogo />

      {/* show links */}
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
      <SearchBar placeholder={"Buscar eventos..."} />

      {/* profile dropdown */}
      <AvatarDropdown />

    </header>
  );
}
