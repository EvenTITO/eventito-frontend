import { GraduationCap, Calendar, Users, BookOpen } from 'lucide-react'
import { Image } from '@nextui-org/image'
import { Button } from '@nextui-org/button'
import { useNavigator } from '@/lib/navigation'

export default function HomeHero() {
  const navigator = useNavigator()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Eventito
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Organizar. Crear. Participar. La plataforma web para manejar
                eventos académicos.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button
                variant="solid"
                color="primary"
                radius="sm"
                size="lg"
                onClick={() => navigator.to('/home/new-event')}
              >
                Crear un evento
              </Button>
              <Button
                variant="flat"
                color="primary"
                radius="sm"
                size="lg"
                onClick={() => navigator.to('/home/public-events')}
              >
                Ver todos los eventos
              </Button>
            </div>
          </div>
          <RightLogo />
        </div>
      </div>
    </section>
  )
}

function RightLogo() {
  return (
    <div className="flex items-center justify-end">
      <Image
        src="https://www.fi.uba.ar/images/logo-fiuba.png"
        alt="FIUBA Logo"
        width={400}
        height={200}
        className="object-contain"
      />
    </div>
  )
}

function Icons() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="flex items-center justify-center p-4 bg-primary/5 rounded-lg">
          <GraduationCap size={40} className="text-primary" />
        </div>
        <div className="flex items-center justify-center p-4 bg-primary/5 rounded-lg">
          <Calendar size={40} className="text-primary" />
        </div>
        <div className="flex items-center justify-center p-4 bg-primary/5 rounded-lg">
          <Users size={40} className="text-primary" />
        </div>
        <div className="flex items-center justify-center p-4 bg-primary/5 rounded-lg">
          <BookOpen size={40} className="text-primary" />
        </div>
      </div>
    </div>
  )
}
