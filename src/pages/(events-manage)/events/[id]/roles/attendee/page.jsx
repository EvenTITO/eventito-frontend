import React, { useState } from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import RegisterTab from "./_components/RegisterTab";
import PaymentsTab from "./_components/PaymentsTab";

export default function Page() {
  const [error, setError] = useState("");

  return (
    <ContainerPage>
      <TitlePage title={"Mi inscripción"} />
      <RegisterTab error={error} />,
      <PaymentsTab error={error} />,
    </ContainerPage>
  );
}
