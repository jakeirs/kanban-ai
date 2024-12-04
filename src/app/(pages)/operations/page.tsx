"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useShoppingList } from "./hook";

export default function OperationsPage() {
  const { shoppingList, handleCheckboxChange } = useShoppingList();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shopping List</h1>
      <div className="space-y-8">
        {shoppingList.map((category, categoryIndex) => (
          <div key={category.name} className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 hover:bg-accent/50 p-2 rounded-md transition-colors"
                >
                  <Checkbox
                    id={item.id}
                    checked={item.checked}
                    onCheckedChange={() => handleCheckboxChange(categoryIndex, itemIndex)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <label
                    htmlFor={item.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
