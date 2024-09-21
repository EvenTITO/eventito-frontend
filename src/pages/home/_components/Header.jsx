import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ChevronDown, User, Settings } from "lucide-react"
import Logo from "@/components/Logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isAdmin, setIsAdmin] = useState(location.pathname.startsWith('/home'))
  const fixedHeader = "fixed top-0 left-0 right-0 z-50"
  const headerStyle = "px-4 lg:px-6 h-14 flex items-center bg-white"

  useEffect(() => {
    setIsAdmin(location.pathname.startsWith('/admin'))
  }, [location])

  const handleModeChange = (value) => {
    if (value === "admin") {
      navigate("/admin")
    } else {
      navigate("/home")
    }
  }

  return (
    <header className={cn(fixedHeader, headerStyle)}>
      <div className="flex items-center">
        <Logo showName={false} bgColor="white" />
        <Select onValueChange={handleModeChange} value={isAdmin ? "admin" : "regular"}>
          <SelectTrigger className="w-[180px] ml-2 border-none focus:ring-0">
            <SelectValue placeholder="Eventito" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">
              <span className="flex items-center">
                eventito
              </span>
            </SelectItem>
            <SelectItem value="admin">
              <span className="flex items-center text-orange-500 font-semibold">
                <Settings className="w-4 h-4 mr-2" />
                Administrador
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={isAdmin ? "/admin" : "/home"}
        >
          {isAdmin ? "Panel de Control" : "Inicio"}
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={isAdmin ? "/admin/events" : "/home/my-events"}
        >
          {isAdmin ? "Gestionar Eventos" : "Mis eventos"}
        </Link>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </nav>
    </header>
  )
}
