import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BriefcaseBusiness,
  Calendar,
  ClipboardPenLine,
  FileCheck,
  FileStack,
  Info,
  Settings,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Component({ isSidebarOpen = true, roles = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const filteredItemList = itemList.filter((parent) =>
    parent.children.some((child) =>
      child.requiredRoles.some((role) => roles.includes(role)),
    ),
  );

  return (
    <aside
      className={`w-64 bg-[#f7f7fa] border-r fixed top-16 bottom-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <ScrollArea className="h-full">
        <div className="p-4">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={filteredItemList.map((p) => p.label.toLowerCase())}
          >
            {filteredItemList.map((parent, index) => (
              <AccordionItem key={index} value={parent.label.toLowerCase()}>
                <AccordionTrigger className="py-2">
                  <span className="flex items-center">
                    {parent.icon}
                    {parent.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {parent.children
                    .filter((child) =>
                      child.requiredRoles.some((role) => roles.includes(role)),
                    )
                    .map((child, idx) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        className="w-full justify-start pl-6 hover:bg-[#e8e9ef]"
                        onClick={() =>
                          child.absolute
                            ? navigate(`/manage/${id}/${child.to}`)
                            : navigate(`/events/${id}/${child.to}`)
                        }
                      >
                        {child.icon}
                        {child.label}
                      </Button>
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </aside>
  );
}

const classNameIcons = "mr-2 h-4 w-4";

const itemList = [
  {
    label: "Evento",
    children: [
      {
        label: "Información",
        icon: <Info className={classNameIcons} />,
        to: "view/general",
        requiredRoles: ["ORGANIZER", "CHAIR", "REVIEWER", "ATTENDEE", "AUTHOR"],
      },
      {
        label: "Calendario",
        icon: <Calendar className={classNameIcons} />,
        to: "view/calendar",
        requiredRoles: ["ORGANIZER", "CHAIR", "REVIEWER", "ATTENDEE", "AUTHOR"],
      },
    ],
  },
  {
    label: "Mis actividades",
    children: [
      {
        label: "Inscripcion",
        icon: <ClipboardPenLine className={classNameIcons} />,
        to: "panel/assistant/inscription",
        requiredRoles: ["ATTENDEE", "AUTHOR"],
      },
      {
        label: "Entregas",
        icon: <BriefcaseBusiness className={classNameIcons} />,
        to: "panel/author",
        requiredRoles: ["AUTHOR"],
      },
      {
        label: "Asignaciones de revision",
        icon: <FileCheck className={classNameIcons} />,
        to: "panel/reviewer",
        requiredRoles: ["REVIEWER"],
      },
    ],
  },
  {
    label: "Acciones de miembros",
    children: [
      {
        label: "Tracks",
        icon: <FileStack className={classNameIcons} />,
        to: "panel/chair",
        requiredRoles: ["ORGANIZER", "CHAIR"],
      },
      {
        label: "Panel de organizador",
        icon: <Settings className={classNameIcons} />,
        to: "members",
        requiredRoles: ["ORGANIZER"],
        absolute: true,
      },
    ],
  },
];