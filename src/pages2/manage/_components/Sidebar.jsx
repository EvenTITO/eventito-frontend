import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, DollarSign, FileStack, FileText, Info, ListChecks, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function Sidebar({ isSidebarOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <aside
      className={`w-64 bg-[#f7f7fa] border-r fixed top-16 bottom-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <ScrollArea className="h-full">
        <div className="p-4">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={itemList.map((p) => p.label.toLowerCase())}
          >
            {itemList.map((parent, index) => (
              <AccordionItem key={index} value={parent.label.toLowerCase()}>
                <AccordionTrigger className="py-2">
                  <span className="flex items-center">
                    {parent.icon}
                    {parent.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  {parent.children.map((child, idx) => (
                    <Button
                      key={idx}
                      variant="ghost"
                      className="w-full justify-start pl-6 hover:bg-[#e8e9ef]"
                      onClick={() => navigate(`/manage/${id}/${child.to}`)}
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
        to: "general",
      },
      {
        label: "Miembros",
        icon: <Users className={classNameIcons} />,
        to: "members",
      },
      {
        label: "Tracks",
        icon: <FileStack className={classNameIcons} />,
        to: "tracks",
      },
      {
        label: "Presentaciones",
        icon: <FileText className={classNameIcons} />,
        to: "submissions",
      },
      {
        label: "Revisiones",
        icon: <ListChecks className={classNameIcons} />,
        to: "reviews",
      },
      {
        label: "Tarifas",
        icon: <DollarSign className={classNameIcons} />,
        to: "prices",
      },
    ],
  },
];
