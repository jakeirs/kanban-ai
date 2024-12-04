"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useShoppingList } from "./hook";

export default function ShoppingListPanel() {
  const {
    getAllItems,
    getItemsByCategory,
    getItemsByIds,
    addItems,
    createCategory,
    removeItem,
    editItem,
    toggleItemCheck,
  } = useShoppingList();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemIdToEdit, setItemIdToEdit] = useState("");
  const [editItemName, setEditItemName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchIds, setSearchIds] = useState("");

  // Create Category with Item
  const handleCreateCategory = () => {
    if (newCategoryName && newItemName) {
      createCategory(newCategoryName, [{ name: newItemName, checked: false }]);
      setNewCategoryName("");
      setNewItemName("");
    }
  };

  // Add Item to Category
  const handleAddItem = () => {
    if (selectedCategory && newItemName) {
      addItems(selectedCategory, [{ name: newItemName, checked: false }]);
      setNewItemName("");
    }
  };

  // Edit Item
  const handleEditItem = () => {
    if (itemIdToEdit && editItemName) {
      editItem(itemIdToEdit, { name: editItemName });
      setItemIdToEdit("");
      setEditItemName("");
    }
  };

  // Display Items by Category
  const [categoryItems, setCategoryItems] = useState<Array<{ id: string; name: string; checked: boolean }>>([]);
  const handleShowCategoryItems = () => {
    if (searchCategory) {
      const items = getItemsByCategory(searchCategory);
      setCategoryItems(items);
    }
  };

  // Display Items by IDs
  const handleShowItemsByIds = () => {
    if (searchIds) {
      const ids = searchIds.split(",").map(id => id.trim());
      const items = getItemsByIds(ids);
      setCategoryItems(items);
    }
  };

  return (
    <div className="space-y-8 p-4 bg-card rounded-lg">
      {/* Create Category Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Create New Category</h3>
        <div className="flex gap-4">
          <Input
            placeholder="Category Name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Input
            placeholder="First Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <Button onClick={handleCreateCategory}>Create Category</Button>
        </div>
      </div>

      {/* Add Item Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Add Item to Category</h3>
        <div className="flex gap-4">
          <Input
            placeholder="Category Name"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          />
          <Input
            placeholder="Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <Button onClick={handleAddItem}>Add Item</Button>
        </div>
      </div>

      {/* Edit Item Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Edit Item</h3>
        <div className="flex gap-4">
          <Input
            placeholder="Item ID"
            value={itemIdToEdit}
            onChange={(e) => setItemIdToEdit(e.target.value)}
          />
          <Input
            placeholder="New Name"
            value={editItemName}
            onChange={(e) => setEditItemName(e.target.value)}
          />
          <Button onClick={handleEditItem}>Edit Item</Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Search Items</h3>
        <div className="flex gap-4">
          <Input
            placeholder="Category Name"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          />
          <Button onClick={handleShowCategoryItems}>Show Category Items</Button>
        </div>
        <div className="flex gap-4">
          <Input
            placeholder="Item IDs (comma-separated)"
            value={searchIds}
            onChange={(e) => setSearchIds(e.target.value)}
          />
          <Button onClick={handleShowItemsByIds}>Show Items by IDs</Button>
        </div>
      </div>

      {/* Results Section */}
      {categoryItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Results</h3>
          <div className="space-y-2">
            {categoryItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-2 bg-accent/50 rounded">
                <span>{item.name}</span>
                <span className="text-sm text-muted-foreground">ID: {item.id}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleItemCheck(item.id)}
                >
                  {item.checked ? "Uncheck" : "Check"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { ShoppingListPanel };
