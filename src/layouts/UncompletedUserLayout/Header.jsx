import EventitoLogo from '@/components/ui/EventitoLogo';

export default function Header() {
  return (
    <header className="top-0 z-30 flex h-14 items-center gap-4 border-0 bg-white p-4 px-6 static h-auto">
      <EventitoLogo />
      <div className='font-bold text-xl'>eventito</div>
    </header>
  );
}
