import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { format } from "@formkit/tempo";

export default function PaymentsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Mis pagos</span>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
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
            <Button>Agrega tu primer pago</Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tarifa pagada</TableHead>
                <TableHead>Fecha de pago</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Trabajos asociados</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.name}</TableCell>
                  <TableCell>{format(payment.date, "long")}</TableCell>
                  <TableCell>${payment.amount}</TableCell>
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
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

const payments = [
  {
    id: 1,
    date: new Date(2023, 5, 15),
    status: "Confirmado",
    name: "Presentador: descuento de profesores FIUBA",
    amount: 150,
    works: [
      { id: 1, title: "Advancements in Quantum Computing" },
      { id: 2, title: "AI in Healthcare: A Comprehensive Review" },
    ],
  },
  {
    id: 2,
    date: new Date(2023, 5, 20),
    status: "Pendiente",
    name: "Asistente: descuento de profesores FIUBA",
    amount: 0,
    works: [],
  },
];
