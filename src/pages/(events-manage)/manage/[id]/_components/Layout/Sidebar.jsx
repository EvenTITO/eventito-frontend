import { ORGANIZER_ROLE } from "@/lib/Constants";
import SideBar from "@/pages/(events-manage)/_components/Sidebar";
import { DollarSign, FilePenLine, Settings, Table, Users } from "lucide-react";

export default function OrganizationSidebar() {
  return (
    <SideBar
      itemList={itemList}
      isSidebarOpen={true}
      roles={[ORGANIZER_ROLE]}
    />
  );
}

const classNameIcons = "mr-2 h-4 w-4";
const itemList = [
  {
    label: "Configuración",
    children: [
      {
        label: "General",
        icon: <Settings className={classNameIcons} />,
        to: "general",
        requiredRoles: [ORGANIZER_ROLE],
      },
      {
        label: "Comité de miembros",
        icon: <Users className={classNameIcons} />,
        to: "members",
        requiredRoles: [ORGANIZER_ROLE],
      },
      {
        label: "Revisiones",
        icon: <FilePenLine className={classNameIcons} />,
        to: "reviews",
        requiredRoles: [ORGANIZER_ROLE],
      },
      {
        label: "Tracks",
        icon: <Table className={classNameIcons} />,
        to: "tracks",
        requiredRoles: [ORGANIZER_ROLE],
      },
      {
        label: "Tarifas",
        icon: <DollarSign className={classNameIcons} />,
        to: "pricing",
        requiredRoles: [ORGANIZER_ROLE],
      },
    ],
  },
];
