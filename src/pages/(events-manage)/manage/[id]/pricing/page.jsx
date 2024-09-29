import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import PricesTable from "./_components/PricesTable";
import { useAddOrModifyFareInEventPricing, useDeletePayment } from "@/hooks/manage/pricingHooks";
import { toast } from "@/hooks/use-toast";
import PriceDialog from "./_components/PriceDialog";

export default function Page({ prices }) {
  const [expandedPrices, setExpandedPrices] = useState(new Set());
  const addOrModifyFare = useAddOrModifyFareInEventPricing();
  const deletePayment = useDeletePayment();

  const togglePriceExpansion = (priceId) => {
    setExpandedPrices(prev => {
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
      await addOrModifyFare.mutateAsync({ newFare: newPrice });
      toast({
        title: "Price Added",
        description: `${newPrice.name} has been added to the price list.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add price. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdatePrice = async (updatedPrice) => {
    try {
      await addOrModifyFare.mutateAsync({ newFare: updatedPrice });
      toast({
        title: "Price Updated",
        description: `${updatedPrice.name} has been updated.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update price. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePrice = async (priceId) => {
    try {
      await deletePayment.mutateAsync({ fareName: priceId });
      toast({
        title: "Price Removed",
        description: "The price has been removed from the list.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete price. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <ContainerPage>
      <TitlePage
        title={"Tarifas del evento"}
        rightComponent={
          <PriceDialog onSave={handleAddPrice} />
        }
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
