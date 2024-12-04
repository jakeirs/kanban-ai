"use client";

import { Suspense } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useShoppingList } from "./hook";
import { ShoppingListPanel } from "./panel";
import { ChatDrawer } from "./chat-drawer";

export default function OperationsPage() {
  const { shoppingList, handleCheckboxChange, isLoading } = useShoppingList();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Shopping List Manager</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Shopping List Manager</h1>

      {/* Management Panel */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Management Panel</h2>
        <Suspense fallback={<div>Loading panel...</div>}>
          <ShoppingListPanel />
        </Suspense>
      </section>

      {/* Shopping List Display */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Shopping List</h2>
        <div className="space-y-8">
          {shoppingList.map((category, categoryIndex) => (
            <div key={category.name} className="bg-card rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
              <div className="space-y-3">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 hover:bg-accent/50 p-2 rounded-md transition-colors"
                  >
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={() =>
                        handleCheckboxChange(categoryIndex, itemIndex)
                      }
                      className="data-[state=checked]:bg-primary"
                    />
                    <label
                      htmlFor={item.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {item.name}
                      <span className="ml-2 text-xs text-muted-foreground">
                        (ID: {item.id})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Drawer */}
      <ChatDrawer />
    </div>
  );
}
