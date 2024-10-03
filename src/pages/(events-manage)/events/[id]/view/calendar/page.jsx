import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/_components/PageStyles/TitlePage.jsx'

export default function Page({ event }) {
  return (
    <ContainerPage>
      <TitlePage title={'Calendario de presentaciones'} />
      {/* <div className="space-y-6 pt-6">
        Aca poner las talks con sus fechas. Vendria NOMBRE DE LA SALA. Adentro todas sus charlas (titulo trabajo + fecha), etc.
    </div> */}
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">
          El calendario aún no está disponible
        </h2>
        <p className="text-gray-500 mb-4">Será publicado a la brevedad</p>
      </div>
    </ContainerPage>
  )
}
