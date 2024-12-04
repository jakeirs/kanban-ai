export interface ShoppingItem {
  id: string;
  name: string;
  checked: boolean;
}

export interface ShoppingCategory {
  name: string;
  items: ShoppingItem[];
}

export const initialShoppingList: ShoppingCategory[] = [
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
