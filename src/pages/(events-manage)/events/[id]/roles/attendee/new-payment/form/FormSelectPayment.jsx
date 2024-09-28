import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentChoice } from "@/state/events/newPaymentSlice";
import { cn } from "@/lib/utils";

export default function FormSelectPayment({ eventPricing }) {
  const { pricing } = useSelector((state) => state.newPayment);
  const [price, setPrice] = useState(pricing);
  const dispatch = useDispatch();

  function changePrice(fareName) {
    setPrice(fareName.name);
    dispatch(addPaymentChoice(fareName.name));
  }

  return (
    <div className="space-y-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Seleccione su tarifa</h2>
      <div className="flex flex-col space-y-4">
        {eventPricing.map((fareOption) => (
          <div
            key={fareOption.name}
            className={cn(
              "p-4 border rounded-lg cursor-pointer transition-all",
              price === fareOption.name
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-primary",
            )}
            onClick={() => changePrice(fareOption)}
          >
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2",
                  price === fareOption.name
                    ? "border-primary bg-primary"
                    : "border-gray-400",
                )}
              ></div>
              <h3 className="font-semibold">{fareOption.name}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {fareOption.description}
            </p>
            <p className="mt-1 text-sm font-semibold">
              Precio: ${fareOption.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
