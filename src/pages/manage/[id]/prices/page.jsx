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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "lucide-react";

export default function PricesPage() {
  const [prices, setPrices] = useState([
    {
      id: 1,
      name: "Early Bird",
      description: "Early registration discount",
      amount: 50,
      isFree: false,
    },
    {
      id: 2,
      name: "Regular",
      description: "Standard registration fee",
      amount: 100,
      isFree: false,
    },
    {
      id: 3,
      name: "Student",
      description: "Discounted rate for students",
      amount: 0,
      isFree: true,
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [newPrice, setNewPrice] = useState({
    name: "",
    description: "",
    amount: 0,
    isFree: false,
  });
  const [activeTab, setActiveTab] = useState("Registration");

  const handleAddPrice = (e) => {
    e.preventDefault();
    setPrices([...prices, { id: prices.length + 1, ...newPrice }]);
    setNewPrice({ name: "", description: "", amount: 0, isFree: false });
    setIsOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            {["Registration", "Submission"].map((tab) => (
              <button
                key={tab}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary hover:border-gray-300"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Price List</h2>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add New Price
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Price</SheetTitle>
              <SheetDescription>
                Enter the details for the new price below.
              </SheetDescription>
            </SheetHeader>
            <form onSubmit={handleAddPrice} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="priceName">Price Name</Label>
                <Input
                  id="priceName"
                  value={newPrice.name}
                  onChange={(e) =>
                    setNewPrice({ ...newPrice, name: e.target.value })
                  }
                  placeholder="Enter price name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceDescription">Description</Label>
                <Input
                  id="priceDescription"
                  value={newPrice.description}
                  onChange={(e) =>
                    setNewPrice({ ...newPrice, description: e.target.value })
                  }
                  placeholder="Enter price description"
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFree"
                  checked={newPrice.isFree}
                  onCheckedChange={(checked) => {
                    setNewPrice({
                      ...newPrice,
                      isFree: checked,
                      amount: checked ? 0 : newPrice.amount,
                    });
                  }}
                />
                <Label htmlFor="isFree">Free</Label>
              </div>
              {!newPrice.isFree && (
                <div className="space-y-2">
                  <Label htmlFor="priceAmount">Amount</Label>
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
                    placeholder="Enter price amount"
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                Add Price
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prices.map((price) => (
            <TableRow key={price.id}>
              <TableCell className="font-medium">{price.name}</TableCell>
              <TableCell>{price.description}</TableCell>
              <TableCell>
                {price.isFree ? "Free" : `$${price.amount.toFixed(2)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
