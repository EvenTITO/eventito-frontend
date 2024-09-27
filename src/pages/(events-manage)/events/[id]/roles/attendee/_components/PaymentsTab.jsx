import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {PlusIcon} from "lucide-react";
import {format} from "@formkit/tempo";
import {useNavigator} from "@/lib/navigation";
import {PAYMENT_STATUS_LABELS} from "@/lib/Constants.js";
import {useNavigate} from "react-router-dom";

export default function PaymentsTab({inscription}) {
  const navigator = useNavigator();
  const navigate = useNavigate();


  const payments = inscription.payments;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Mis pagos</span>
          <Button onClick={() => navigator.fowardWithState('/new-payment', {state: {inscriptionId: inscription.id}})}>
            <PlusIcon className="mr-2 h-4 w-4"/>
            Nuevo pago
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {payments.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-2">Ningun pago cargado</h2>
            <p className="text-gray-500 mb-4">
              Agregar un nuevo para para visualizarlo
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarifa pagada</TableHead>
                <TableHead>Fecha de pago</TableHead>
                <TableHead>Trabajos asociados</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.name}</TableCell>
                  <TableCell>{format(payment.date, "long")}</TableCell>
                  <TableCell>
                    {payment.works.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {payment.works.map((work) => (
                          <li key={work.id}>{work.title}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">
                        Sin trabajos asociados
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{PAYMENT_STATUS_LABELS[payment.status]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
