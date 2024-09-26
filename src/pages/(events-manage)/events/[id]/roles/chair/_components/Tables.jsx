import TableContent from "@/components/TableContent";
import ChairTable from "./ChairTable";

export default function Tables({ works, selectedTrack, handleRowClick }) {
  const history = works.filter((work) => work.published);
  const pendings = works.filter((work) => !work.published);

  return (
    <>
      <TableContent
        title={`Trabajos pendientes a revisar en track: ${selectedTrack}`}
      >
        <ChairTable works={pendings} handleRowClick={handleRowClick} />
      </TableContent>

      {history.length > 0 ? (
        <TableContent title={`Revisiones enviadas`}>
          <ChairTable works={history} handleRowClick={handleRowClick} />
        </TableContent>
      ) : null}
    </>
  );
}
