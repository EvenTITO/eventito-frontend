import React, { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import LineTabs from '@/components/LineTabs'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import { useNavigator } from '@/lib/navigation'
import { ReviewerForm } from './reviewForm'
import { useGetWorkDownloadURL } from '@/hooks/events/worksHooks.js'
import { DetailsTab } from './details.jsx'

export default function Page({ selectedWork, reviewForm }) {
  const navigator = useNavigator('/assignments')
  const { mutate: downloadWorkFile, isPending } = useGetWorkDownloadURL()

  function handleBack() {
    navigator.back()
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
      <TitlePage title={selectedWork.title} />

      <div className="mb-6">
        <LineTabs
          tabs={[
            {
              label: 'Entrega',
              component: (
                <DetailsTab
                  handleBack={handleBack}
                  selectedWork={selectedWork}
                  getFileData={downloadWorkFile}
                  isPending={isPending}
                />
              ),
            },
            {
              label: 'Formulario',
              component: (
                <ReviewerForm handleBack={handleBack} reviewForm={reviewForm} />
              ),
            },
          ]}
        />
      </div>
    </ContainerPage>
  )
}
