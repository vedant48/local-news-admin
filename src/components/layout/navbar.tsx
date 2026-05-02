import { LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageTitles: Record<string, string> = {
  "/blogs": "Blogs",
  "/create": "Create Blog",
  "/issues": "Issues",
  "/issues/create": "Report Issue",
};

export default function Navbar() {
  const pathname = window.location.pathname;
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="h-14 bg-background border-b flex items-center px-6 justify-between shrink-0">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
          <Bell className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive gap-1.5"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
