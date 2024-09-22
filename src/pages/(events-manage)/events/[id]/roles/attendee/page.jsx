import React, { useState } from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import RegisterTab from "./_components/RegisterTab";
import PaymentsTab from "./_components/PaymentsTab";

export default function Page({ registerData, payments }) {
  const [error, setError] = useState("");

  return (
    <ContainerPage>
      <TitlePage title={"Mi inscripción"} />
      <div className="flex flex-col gap-6">
        <RegisterTab error={error} registerData={registerData} />
        <PaymentsTab payments={payments} />
      </div>
    </ContainerPage>
  );
}
