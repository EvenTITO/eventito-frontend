import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { format } from "date-fns";

export default function PaymentsTab({ error }) {
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: new Date(2023, 5, 15),
      status: "Confirmado",
      name: "Tarifa de alumno regular",
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
      name: "Tarifa gratuita de profesores",
      amount: 0,
      works: [{ id: 3, title: "Blockchain in Supply Chain Management" }],
    },
  ]);

  const totalAmount = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );
  const confirmedAmount = payments.reduce(
    (sum, payment) =>
      payment.status === "Confirmado" ? sum + payment.amount : sum,
    0,
  );
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis pagos</h2>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Cargar nuevo pago
        </Button>
      </div>
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
              <TableHead>Fecha de pago</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tarifa pagada</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Trabajos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{format(payment.date, "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <Badge className={"bg-gray-500"}>{payment.status}</Badge>
                </TableCell>
                <TableCell className="font-medium">{payment.name}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
