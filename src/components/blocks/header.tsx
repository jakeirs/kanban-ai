import ThemeToggle from "./theme-toggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center h-16 space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <h1 className="text-lg font-bold">48hrs.Studio</h1>
        </div>
        <div className="flex items-center justify-end flex-1 space-x-4">
          <nav className="flex items-center space-x-1">
            <div className="p-2 m-2 font-bold bg-2"></div>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
