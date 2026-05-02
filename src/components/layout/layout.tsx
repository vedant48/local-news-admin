import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function Layout({ children }: any) {
  return (
    <div className="flex h-screen bg-muted/40">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
