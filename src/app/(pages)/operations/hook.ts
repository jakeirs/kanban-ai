import { useState } from "react";
import { ShoppingCategory, initialShoppingList } from "./types";
import { createShoppingListCrud } from "./crud-hooks";

export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingCategory[]>(initialShoppingList);

  // Legacy handler for checkbox changes (keeping for backward compatibility)
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
};
