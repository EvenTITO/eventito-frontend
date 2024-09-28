import { useState } from "react";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { addWorkId, removeWorkId } from "@/state/events/newPaymentSlice";

export default function FormSelectWorks({ works }) {
  const [selectedWorks, setSelectedWorks] = useState([]);
  const dispatch = useDispatch();

  function toggleWorkSelection(work) {
    if (selectedWorks.includes(work.id)) {
      setSelectedWorks(selectedWorks.filter((id) => id !== work.id));
      dispatch(removeWorkId(work.id));
    } else {
      setSelectedWorks([...selectedWorks, work.id]);
      dispatch(addWorkId(work.id));
    }
  }

  return (
    <div className="space-y-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">
        Seleccionar trabajos a vincular con el pago
      </h2>
      <div className="flex flex-col space-y-4">
        {works.map((work) => (
          <div
            key={work.id}
            className={cn(
              "p-4 border rounded-lg cursor-pointer transition-all",
              selectedWorks.includes(work.id)
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-primary",
            )}
            onClick={() => toggleWorkSelection(work)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={cn(
                    "w-5 h-5 rounded border-2 flex items-center justify-center",
                    selectedWorks.includes(work.id)
                      ? "border-primary bg-primary text-white"
                      : "border-gray-400",
                  )}
                >
                  {selectedWorks.includes(work.id) && (
                    <CheckIcon className="w-4 h-4" />
                  )}
                </div>
                <h3 className="font-semibold">{work.title}</h3>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
