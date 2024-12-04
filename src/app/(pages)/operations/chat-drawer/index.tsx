"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useShoppingList } from "../hook";
import { DrawerWindowChat } from "./drawer-window-chat";
import { DrawerInputChat } from "./drawer-input-chat";

interface ToggleShoppingItemArgs {
  itemId: string;
}

export function ChatDrawer() {
  const { shoppingList, toggleItemCheck } = useShoppingList();

  const { messages, input, handleInputChange, handleSubmit, addToolResult } =
    useChat({
      maxSteps: 2,
      api: "/api/operations",
      async onToolCall({ toolCall }) {
        if (toolCall.toolName === "toggleShoppingItem") {
          const args = toolCall.args as ToggleShoppingItemArgs;
          toggleItemCheck(args.itemId);
          return "Toggle changed";
        }
        if (toolCall.toolName === "readAllShoppingItems") {
          console.log("readAllShoppingItems", toolCall, shoppingList);

          return JSON.stringify(shoppingList);
        }
      },
    });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="fixed bottom-4 right-4">
          Open Chat
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-3xl">
          <DrawerHeader>
            <DrawerTitle>Chat Assistant</DrawerTitle>
            <DrawerDescription>
              Ask questions or get help with your shopping list
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {/*  My component */}
            <DrawerWindowChat 
              messages={messages} 
              addToolResult={addToolResult} 
            />
            {/*  My component */}
            <DrawerInputChat
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
