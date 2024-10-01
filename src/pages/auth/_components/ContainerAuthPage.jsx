import { Link } from 'react-router-dom'
import Logo from '@/components/Logo'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function ContainerAuthPage({ title, children, isLogin = true }) {
  let footer = null
  if (isLogin) {
    footer = (
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          ¿No tenés cuenta?{' '}
          <Link to="/signup" className="text-primary hover:underline">
            Ir a registro
          </Link>
        </p>
      </CardFooter>
    )
  } else {
    footer = (
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Ir a inicio de sesión
          </Link>
        </p>
      </CardFooter>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <header className="mb-8 flex items-center space-x-2">
        <Logo showName={false} />
        <span className="text-2xl font-bold text-primary">eventito</span>
      </header>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer}
      </Card>
    </div>
  )
}
