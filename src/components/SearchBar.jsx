import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function SearchBar({ placeholder, value, handleSearchText }) {
  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={handleSearchText}
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  );
}
