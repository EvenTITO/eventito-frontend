import React, {useState} from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import RegisterTab from "./_components/RegisterTab";
import PaymentsTab from "./_components/PaymentsTab";

export default function Page({inscription}) {
  const [error, setError] = useState("");
  return (
    <ContainerPage>
      <TitlePage title={"Mi inscripción"}/>
      <div className="flex flex-col gap-6">
        <RegisterTab error={error} inscription={inscription}/>
        <PaymentsTab inscription={inscription}/>
      </div>
    </ContainerPage>
  );
}
