import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, DollarSign, Clock, AlertCircle } from "lucide-react"

export function RegistrationTab({ event }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <CardTitle className="text-3xl font-bold">Información de Registro</CardTitle>
          <Button size="lg" className="mt-4 md:mt-0">
            Iniciar Registro
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Precios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.pricing.map((price, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{price.name}</TableCell>
                    <TableCell>{price.description}</TableCell>
                    <TableCell className="text-right">
                      {price.value} {price.currency}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Información Importante</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                <span>Acceso a todas las sesiones del evento</span>
              </li>
              <li className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
                <span>Opcion de subir comprobantes de pagos segun tu conveniencia</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-500" />
                <span>Registro anticipado recomendado para mejores tarifas</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿Tienes preguntas? Contáctanos en {event.contact}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
