import { Inter } from "next/font/google";

import type { Metadata } from "next";
import BottomNav from "@/components/layout/nav";

export const metadata: Metadata = {
  title: "Kanban - AI",
  description: "Kanban AI with Anthropic Claude",
  icons: {
    icon: "/next.svg",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="flex-1">{children}</div>
      <BottomNav />
    </div>
  );
}
