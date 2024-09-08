import LineTabs from "@/components/LineTabs";

export default function AuthorPage() {
  return <LineTabs tabs={tabs} selected={"General"} />;
}


const tabs = [
  { label: "General", component: <div>General</div> },
  { label: "Info", component: <div>Info</div> },
  { label: "Calendario", component: <div>Calendario</div> },
  { label: "Presentaciones", component: <div>Presentaciones</div> },
];
