import { Link, useLocation } from "react-router-dom";

export default function HomeNav() {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[1];
  if (subpage === undefined || subpage === '') {
    subpage = 'main';
  }
  function linkClasses(type = null) {
    let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
    if (type === subpage) {
      classes += ' primary-button text-white';
    } else {
      classes += ' bg-gray-200';
    }
    return classes;
  }
  return (
    <div className="w-full flex justify-center gap-2">
      <Link className={linkClasses('main')} to={'/'}>
        Explorar
      </Link>
      <Link className={linkClasses('inscriptions')} to={'/inscriptions'}>
        Inscripciones
      </Link>
      <Link className={linkClasses('events')} to={'/events'}>
        Mis eventos
      </Link>
    </div>
  );
}
