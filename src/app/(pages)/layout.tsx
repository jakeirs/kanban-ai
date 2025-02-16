import "@/styles/globals.css";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/blocks/header";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "./providers";
import type { Metadata } from "next";

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
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          className={`${inter.className} min-h-screen bg-background font-sans antialiased`}
        >
          <ConvexClientProvider>
            <div className="relative flex flex-col min-h-screen">
              <div className="flex-1">{children}</div>
            </div>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
