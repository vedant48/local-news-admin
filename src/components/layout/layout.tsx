import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function Layout({ children }: any) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 bg-gray-100 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
