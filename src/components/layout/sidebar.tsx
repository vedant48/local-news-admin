import { Newspaper, PenLine, AlertCircle, FilePlus, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Blogs", href: "/blogs", icon: Newspaper },
  { label: "Create Blog", href: "/create", icon: PenLine },
  { label: "Issues", href: "/issues", icon: AlertCircle },
  { label: "Report Issue", href: "/issues/create", icon: FilePlus },
];

export default function Sidebar() {
  const pathname = window.location.pathname;

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-sidebar-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary/10">
          <LayoutDashboard className="h-4 w-4 text-sidebar-primary" />
        </div>
        <span className="text-sm font-semibold tracking-wide text-sidebar-foreground">LocalNews Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Navigation
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <a
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-sidebar-primary" : "text-sidebar-foreground/40"
                )}
              />
              {label}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-sidebar-border">
        <p className="text-[10px] text-sidebar-foreground/30">© 2025 LocalNews</p>
      </div>
    </aside>
  );
}
