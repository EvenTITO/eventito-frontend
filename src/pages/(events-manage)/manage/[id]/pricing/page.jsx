import { useState } from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import PricesTable from "./_components/PricesTable";
import {
  useAddOrModifyFareInEventPricing,
  useDeletePayment,
} from "@/hooks/manage/pricingHooks";
import { toast } from "@/hooks/use-toast";
import PriceDialog from "./_components/PriceDialog";

export default function Page({ prices, dates }) {
  const [expandedPrices, setExpandedPrices] = useState(new Set());
  const addOrModifyFare = useAddOrModifyFareInEventPricing();
  const deletePayment = useDeletePayment();

  const togglePriceExpansion = (priceId) => {
    setExpandedPrices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(priceId)) {
        newSet.delete(priceId);
      } else {
        newSet.add(priceId);
      }
      return newSet;
    });
  };

  const handleAddPrice = async (newPrice) => {
    try {
      await addOrModifyFare.mutateAsync({
        newFare: newPrice,
        eventPrices: prices,
        eventDates: dates,
      });
      toast({
        title: "Tarifa agregada",
        description: `${newPrice.name} agregada con éxito.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al agregar la tarifa. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePrice = async (updatedPrice) => {
    try {
      await addOrModifyFare.mutateAsync({
        newFare: updatedPrice,
        eventPrices: prices,
        eventDates: dates,
      });
      toast({
        title: "Tarifa actualizada",
        description: `${updatedPrice.name} fue actualizada con éxito.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al actualizar la tarifa. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePrice = async (priceName) => {
    try {
      await deletePayment.mutateAsync({
        fareName: priceName,
        eventPricing: prices,
      });
      toast({
        title: "Tarifa eliminada",
        description: "La tarifa fue eliminada con éxito.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al eliminar la tarifa. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <ContainerPage>
      <TitlePage
        title={"Tarifas del evento"}
        rightComponent={<PriceDialog onSave={handleAddPrice} />}
      />
      <PricesTable
        prices={prices}
        expandedPrices={expandedPrices}
        onToggleExpand={togglePriceExpansion}
        onUpdatePrice={handleUpdatePrice}
        onDeletePrice={handleDeletePrice}
      />
      <div className="space-y-6 pt-6"></div>
    </ContainerPage>
  );
}
