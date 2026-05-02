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
    <aside className="w-64 bg-neutral-900 text-white flex flex-col border-r border-neutral-800 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-neutral-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
          <LayoutDashboard className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-semibold tracking-wide text-white">LocalNews Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
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
                  ? "bg-white/10 text-white"
                  : "text-neutral-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-white" : "text-neutral-500"
                )}
              />
              {label}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-neutral-800">
        <p className="text-[10px] text-neutral-600">© 2025 LocalNews</p>
      </div>
    </aside>
  );
}
