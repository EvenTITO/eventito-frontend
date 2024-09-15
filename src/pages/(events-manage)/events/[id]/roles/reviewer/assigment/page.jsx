import React from "react";
import { ArrowLeft } from "lucide-react";
import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { useNavigator } from "@/lib/navigation";
import { DetailsTab } from "./details";
import { ReviewerForm } from "./reviewForm";

export default function Page({ selectedAssignment, questions }) {
  const navigator = useNavigator("/assignments");

  function handleBack(e) {
    e.preventDefault();
    navigator.back();
  }

  return (
    <ContainerPage>
      <a
        href="#"
        onClick={handleBack}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a asignaciones
      </a>
      <TitlePage title={selectedAssignment.title} />

      <div className="mb-6">
        <LineTabs
          tabs={[
            {
              label: "Entrega",
              component: (
                <DetailsTab
                  handleBack={handleBack}
                  selectedAssignment={selectedAssignment}
                />
              ),
            },
            {
              label: "Formulario",
              component: (
                <ReviewerForm handleBack={handleBack} questions={questions} />
              ),
            },
          ]}
        />
      </div>
    </ContainerPage>
  );
}
