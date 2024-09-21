import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PricesPage() {
  const [prices, setPrices] = useState([
    {
      id: 1,
      name: "Tarifa con descuento",
      description: "Tarifa con descuento por registro antes del 20/09",
      amount: 50,
      isFree: false,
      role: "attendee",
      deadline: "2023-09-20",
    },
    {
      id: 2,
      name: "Regular",
      description: "Tarifa regular como asistente",
      amount: 100,
      isFree: false,
      role: "attendee",
    },
    {
      id: 3,
      name: "Estudiante",
      description: "Tarifa con descuento por estudiante de FIUBA",
      amount: 0,
      isFree: true,
      role: "attendee",
    },
    {
      id: 4,
      name: "Autor temprano",
      description: "Tarifa para autores que envían antes del 15/08",
      amount: 75,
      isFree: false,
      role: "author",
      deadline: "2023-08-15",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [newPrice, setNewPrice] = useState({
    name: "",
    description: "",
    amount: 0,
    isFree: false,
    role: "attendee",
  });
  const [activeTab, setActiveTab] = useState("attendee");

  const handleAddOrUpdatePrice = (e) => {
    e.preventDefault();
    if (editingPrice) {
      setPrices(
        prices.map((p) =>
          p.id === editingPrice.id ? { ...editingPrice, ...newPrice } : p,
        ),
      );
    } else {
      setPrices([...prices, { id: prices.length + 1, ...newPrice }]);
    }
    setNewPrice({
      name: "",
      description: "",
      amount: 0,
      isFree: false,
      role: "attendee",
    });
    setEditingPrice(null);
    setIsOpen(false);
  };

  const handleEditPrice = (price) => {
    setEditingPrice(price);
    setNewPrice(price);
    setIsOpen(true);
  };

  const filteredPrices = prices.filter(
    (price) => price.role === activeTab || price.role === "both",
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Tarifas del evento</h1>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {[
              { key: "attendee", label: "Tarifas de asistente" },
              { key: "author", label: "Tarifas de autor" },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Lista de precios</h2>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Nueva tarifa
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                {editingPrice ? "Editar tarifa" : "Nueva tarifa"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleAddOrUpdatePrice} className="space-y-4 mt-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Información básica</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Label htmlFor="priceName">Título de la tarifa</Label>
                      <Input
                        id="priceName"
                        value={newPrice.name}
                        onChange={(e) =>
                          setNewPrice({ ...newPrice, name: e.target.value })
                        }
                        placeholder="Ingresar título"
                        required
                      />
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="priceDescription">Descripción</Label>
                      <Input
                        id="priceDescription"
                        value={newPrice.description}
                        onChange={(e) =>
                          setNewPrice({
                            ...newPrice,
                            description: e.target.value,
                          })
                        }
                        placeholder="Ingresar descripción"
                        required
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Precio</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isFree"
                        checked={newPrice.isFree}
                        onCheckedChange={(checked) => {
                          setNewPrice({
                            ...newPrice,
                            isFree: Boolean(checked),
                            amount: checked ? 0 : newPrice.amount,
                          });
                        }}
                      />
                      <Label htmlFor="isFree">Gratuita</Label>
                    </div>
                    {!newPrice.isFree && (
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="priceAmount">Valor</Label>
                        <Input
                          id="priceAmount"
                          type="number"
                          value={newPrice.amount}
                          onChange={(e) =>
                            setNewPrice({
                              ...newPrice,
                              amount: parseFloat(e.target.value),
                            })
                          }
                          placeholder="Ingresar valor"
                          required
                        />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Rol y fechas</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <Label htmlFor="role">Rol aplicable</Label>
                      <Select
                        value={newPrice.role}
                        onValueChange={(value) =>
                          setNewPrice({ ...newPrice, role: value })
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Seleccionar rol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="attendee">Asistente</SelectItem>
                          <SelectItem value="author">Autor</SelectItem>
                          <SelectItem value="both">Ambos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="deadline">Fecha límite (opcional)</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newPrice.deadline || ""}
                        onChange={(e) =>
                          setNewPrice({ ...newPrice, deadline: e.target.value })
                        }
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Button type="submit" className="w-full">
                {editingPrice ? "Actualizar tarifa" : "Nueva tarifa"}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Fecha límite</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPrices.map((price) => (
            <TableRow key={price.id}>
              <TableCell className="font-medium">{price.name}</TableCell>
              <TableCell>{price.description}</TableCell>
              <TableCell>
                {price.isFree ? "Gratuita" : `$${price.amount.toFixed(2)}`}
              </TableCell>
              <TableCell>{price.deadline || "N/A"}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditPrice(price)}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
