import { useState, useEffect } from "react";
import { ShoppingCategory, initialShoppingList } from "./types";
import { createShoppingListCrud } from "./crud-hooks";

const STORAGE_KEY = "shopping-list";

export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingCategory[]>(initialShoppingList);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage only on client side
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setShoppingList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse shopping list from localStorage:", e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save to localStorage whenever shoppingList changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingList));
    }
  }, [shoppingList, isLoading]);

  const handleCheckboxChange = (categoryIndex: number, itemIndex: number) => {
    setShoppingList(prevList => {
      const newList = [...prevList];
      newList[categoryIndex] = {
        ...newList[categoryIndex],
        items: [...newList[categoryIndex].items],
      };
      newList[categoryIndex].items[itemIndex] = {
        ...newList[categoryIndex].items[itemIndex],
        checked: !newList[categoryIndex].items[itemIndex].checked,
      };
      return newList;
    });
  };

  const crudOperations = createShoppingListCrud(shoppingList, setShoppingList);

  return {
    shoppingList,
    handleCheckboxChange,
    isLoading,
    ...crudOperations,
  };
}
