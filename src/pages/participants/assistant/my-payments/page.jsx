import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusIcon } from "lucide-react";
import { format } from "date-fns";

export default function MyPaymentsPage() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: new Date(2023, 5, 15),
      status: "Confirmado",
      name: "Asistente como alumno regular",
      works: [
        { id: 1, title: "Advancements in Quantum Computing" },
        { id: 2, title: "AI in Healthcare: A Comprehensive Review" },
      ],
    },
    {
      id: 2,
      date: new Date(2023, 5, 20),
      status: "Pendiente",
      name: "Tarifa gratuita para profesores",
      works: [{ id: 3, title: "Blockchain in Supply Chain Management" }],
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [newPayment, setNewPayment] = useState({
    date: new Date(),
    status: "Pendiente",
    name: "",
    works: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId =
      payments.length > 0 ? Math.max(...payments.map((p) => p.id)) + 1 : 1;
    setPayments([...payments, { ...newPayment, id: newId }]);
    setNewPayment({
      date: new Date(),
      status: "Pendiente",
      name: "",
      works: [],
    });
    setIsOpen(false);
  };

  const getStatusColor = (paymentStatus) => {
    return "bg-gray-500";
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis pagos</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Cargar nuevo pago
        </Button>
      </div>
      {payments.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">No payments yet</h2>
          <p className="text-muted-foreground mb-4">
            You haven't made any payments. Add a new payment to get started.
          </p>
          <Button onClick={() => setIsOpen(true)}>
            Add Your First Payment
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha de pago</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tarifa pagada</TableHead>
              <TableHead>Trabajos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{format(payment.date, "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{payment.name}</TableCell>
                <TableCell>
                  {payment.works.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {payment.works.map((work) => (
                        <li key={work.id}>{work.title}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-muted-foreground">
                      No associated works
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
