import React, { useState } from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import LineTabs from "@/components/LineTabs";
import RegisterTab from "./_components/RegisterTab";
import PaymentsTab from "./_components/PaymentsTab";

export default function Page() {
  const [error, setError] = useState("");

  return (
    <ContainerPage>
      <TitlePage title={"Mi inscripción"} />

      <LineTabs
        tabs={[
          {
            label: "Registro",
            component: <RegisterTab error={error} />,
          },
          {
            label: "Pagos",
            component: <PaymentsTab error={error} />,
          },
        ]}
      />
    </ContainerPage>
  );
}
