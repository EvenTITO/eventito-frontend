import AvatarDropdown from '@/components/AvatarDropdown';
import EventitoLogo from '@/components/ui/EventitoLogo';

export default function Header() {

    return (
        <header className="top-0 z-30 flex h-14 items-center gap-4 border-0 bg-white p-2 px-6 static h-auto">
            {/* app logo */}
            <EventitoLogo/>
            <div className="ml-auto"></div>
            <AvatarDropdown/>
        </header>
    );
}
