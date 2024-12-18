import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import Icon from '@/components/Icon'
import Logo from '@/components/Logo'

export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-50">
      <Separator />
      <ContainerPage>
        <div className="flex flex-col items-center text-sm text-muted-foreground gap-2">
          <div className="flex items-center gap-2 text-base">
            <Logo showName={false} bgColor="white" />
            <p>Eventito</p>
          </div>
          Trabajo Profesional propiedad de la Facultad de Ingeniería de la
          Universidad de Buenos Aires
          <Button size="icon" variant="ghost">
            <Icon name="Github" />
          </Button>
        </div>
      </ContainerPage>
    </footer>
  )
}
