import {
  ChevronRight,
  ChevronDown,
  X,
  Shield,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PriceDialog from "./PriceDialog";

export default function PricesTable({
  prices,
  expandedPrices,
  onToggleExpand,
  onUpdatePrice,
  onDeletePrice,
}) {
  return (
    <div className="space-y-2">
      {prices.map((price) => (
        <PriceItem
          key={price.name}
          price={price}
          isExpanded={expandedPrices.has(price.name)}
          onToggleExpand={() => onToggleExpand(price.name)}
          onUpdatePrice={onUpdatePrice}
          onDeletePrice={onDeletePrice}
        />
      ))}
    </div>
  );
}

function PriceItem({
  price,
  isExpanded,
  onToggleExpand,
  onUpdatePrice,
  onDeletePrice,
}) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div
        className="flex items-center p-4 bg-white hover:bg-gray-50 cursor-pointer"
        onClick={onToggleExpand}
      >
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 mr-2 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 mr-2 text-gray-500" />
        )}
        <span className="font-medium mr-2">{price.name}</span>
        <span className="text-sm text-gray-500 mr-2">{price.description}</span>
        <span className="font-semibold">${price.value}</span>
        {price.need_verification && (
          <Shield className="h-4 w-4 ml-2 text-blue-500" />
        )}
        {price.related_date && (
          <Calendar className="h-4 w-4 ml-2 text-green-500" />
        )}
      </div>
      {isExpanded && (
        <div className="p-4 bg-gray-50 flex justify-between items-center">
          <div className="space-y-2">
            <p>
              <strong>Roles:</strong>{" "}
              {price.roles.length > 0
                ? price.roles.join(", ")
                : "No specific roles"}
            </p>
            <p>
              <strong>Verification Required:</strong>{" "}
              {price.need_verification ? "Yes" : "No"}
            </p>
            <p>
              <strong>Related Date:</strong>{" "}
              {price.related_date || "Not specified"}
            </p>
          </div>
          <div className="space-x-2">
            <PriceDialog price={price} onSave={onUpdatePrice} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeletePrice(price.name)}
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
