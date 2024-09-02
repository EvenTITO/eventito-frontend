import { Button } from "@/components/ui/button";
import { List, User } from "lucide-react";

export default function Header({ headerTitle, toggleSidebar }) {
  const title = headerTitle.length < 50 ? headerTitle : `${headerTitle.slice(0,50)}...`;

  return (
    <header className="h-16 bg-[#121827] border-b flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50 text-white">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="mr-4 md:hidden"
          onClick={toggleSidebar}
        >
          <List className="h-4 w-4" />
        </Button>
        <h1 className="text-lg">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}

