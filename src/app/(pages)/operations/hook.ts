import { useState, useEffect } from "react";
import { ShoppingCategory, initialShoppingList } from "./types";
import { createShoppingListCrud } from "./crud-hooks";

const STORAGE_KEY = "shopping-list";

export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingCategory[]>(initialShoppingList);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setShoppingList(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingList));
  }, [shoppingList]);

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
    ...crudOperations,
  };
}
