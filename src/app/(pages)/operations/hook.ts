import { useState } from "react";

export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface ShoppingCategory {
  name: string;
  items: ShoppingItem[];
}

const initialShoppingList: ShoppingCategory[] = [
  {
    name: "Groceries",
    items: [
      { id: "g1", name: "Milk", checked: false },
      { id: "g2", name: "Bread", checked: false },
      { id: "g3", name: "Eggs", checked: false },
      { id: "g4", name: "Fruits", checked: false },
    ],
  },
  {
    name: "Household",
    items: [
      { id: "h1", name: "Paper Towels", checked: false },
      { id: "h2", name: "Dish Soap", checked: false },
      { id: "h3", name: "Laundry Detergent", checked: false },
    ],
  },
  {
    name: "Electronics",
    items: [
      { id: "e1", name: "Batteries", checked: false },
      { id: "e2", name: "Phone Charger", checked: false },
    ],
  },
];

export const useShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<ShoppingCategory[]>(initialShoppingList);

  // Get all items from all categories
  const getAllItems = () => {
    return shoppingList.flatMap(category => category.items);
  };

  // Get items by category name
  const getItemsByCategory = (categoryName: string) => {
    const category = shoppingList.find(cat => cat.name === categoryName);
    return category?.items || [];
  };

  // Get specific items by their IDs
  const getItemsByIds = (itemIds: string[]) => {
    return getAllItems().filter(item => itemIds.includes(item.id));
  };

  // Add new items to a specific category
  const addItems = (categoryName: string, newItems: Omit<ShoppingItem, "id">[]) => {
    setShoppingList(prevList => {
      const newList = [...prevList];
      const categoryIndex = newList.findIndex(cat => cat.name === categoryName);
      
      if (categoryIndex === -1) return prevList;

      const items = newItems.map((item, index) => ({
        ...item,
        id: `${categoryName.toLowerCase()[0]}${Date.now()}${index}`,
      }));

      newList[categoryIndex] = {
        ...newList[categoryIndex],
        items: [...newList[categoryIndex].items, ...items],
      };

      return newList;
    });
  };

  // Create a new category with items
  const createCategory = (categoryName: string, items: Omit<ShoppingItem, "id">[]) => {
    setShoppingList(prevList => {
      if (prevList.some(cat => cat.name === categoryName)) return prevList;

      const newItems = items.map((item, index) => ({
        ...item,
        id: `${categoryName.toLowerCase()[0]}${Date.now()}${index}`,
      }));

      return [...prevList, { name: categoryName, items: newItems }];
    });
  };

  // Remove an item by ID
  const removeItem = (itemId: string) => {
    setShoppingList(prevList => {
      return prevList.map(category => ({
        ...category,
        items: category.items.filter(item => item.id !== itemId),
      }));
    });
  };

  // Edit an item by ID
  const editItem = (itemId: string, updates: Partial<Omit<ShoppingItem, "id">>) => {
    setShoppingList(prevList => {
      return prevList.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        ),
      }));
    });
  };

  // Toggle item checked status
  const toggleItemCheck = (itemId: string) => {
    setShoppingList(prevList => {
      return prevList.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        ),
      }));
    });
  };

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

  return {
    shoppingList,
    getAllItems,
    getItemsByCategory,
    getItemsByIds,
    addItems,
    createCategory,
    removeItem,
    editItem,
    toggleItemCheck,
    handleCheckboxChange,
  };
};
