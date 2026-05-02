export default function Navbar() {
  return (
    <div className="h-14 bg-white border-b flex items-center px-4 justify-between">
      <h1 className="font-semibold">Dashboard</h1>

      <button
        className="text-sm text-red-500"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>
  );
}
