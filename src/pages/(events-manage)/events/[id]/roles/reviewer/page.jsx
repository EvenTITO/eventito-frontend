import React from 'react'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import { useNavigator } from '@/lib/navigation'
import AssignmentsTable from './_components/AssignmentsTable'
import TableContent from '@/components/TableContent'

export default function Page({ assignments }) {
  const navigator = useNavigator()

  const handleRowClick = (assignment) => {
    const path = `assignments/${assignment.id}`
    navigator.foward(path)
  }

  return (
    <ContainerPage>
      <TitlePage title={'Asignaciones de revisión'} />
      <TableContent title="Entregas a revisar">
        <AssignmentsTable
          assignments={assignments}
          handleRowClick={handleRowClick}
        />
      </TableContent>
    </ContainerPage>
  )
}
