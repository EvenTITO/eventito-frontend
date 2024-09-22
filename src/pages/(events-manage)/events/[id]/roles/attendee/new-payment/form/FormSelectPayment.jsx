import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentChoice } from "@/state/events/newPaymentSlice";
import { cn } from "@/lib/utils";

export default function FormSelectPayment() {
  const { pricing } = useSelector((state) => state.newPayment);
  const [price, setPrice] = useState(pricing);
  const dispatch = useDispatch();

  function changePrice(idPrice) {
    setPrice(idPrice);
    dispatch(addPaymentChoice(idPrice));
  }

  return (
    <div className="space-y-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Seleccione su tarifa</h2>
      <div className="flex flex-col space-y-4">
        {tarifas.map((tarifaOpcion) => (
          <div
            key={tarifaOpcion.id}
            className={cn(
              "p-4 border rounded-lg cursor-pointer transition-all",
              price === tarifaOpcion.id
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-primary",
            )}
            onClick={() => changePrice(tarifaOpcion.id)}
          >
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2",
                  price === tarifaOpcion.id
                    ? "border-primary bg-primary"
                    : "border-gray-400",
                )}
              ></div>
              <h3 className="font-semibold">{tarifaOpcion.titulo}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {tarifaOpcion.descripcion}
            </p>
            <p className="mt-1 text-sm font-semibold">
              Precio: ${tarifaOpcion.precio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// TODO: usarlo desde el evento
const tarifas = [
  {
    id: "basica",
    titulo: "Tarifa Básica",
    descripcion: "Acceso a eventos principales",
    precio: "100",
  },
  {
    id: "estandar",
    titulo: "Tarifa Estándar",
    descripcion: "Acceso a eventos principales y talleres",
    precio: "200",
  },
  {
    id: "premium",
    titulo: "Tarifa Premium",
    descripcion: "Acceso completo a todos los eventos y áreas VIP",
    precio: "300",
  },
  {
    id: "estudiante",
    titulo: "Tarifa Estudiante",
    descripcion: "Descuento especial para estudiantes",
    precio: "50",
  },
  {
    id: "grupal",
    titulo: "Tarifa Grupal",
    descripcion: "Descuento para grupos de 5 o más personas",
    precio: "80",
  },
];
