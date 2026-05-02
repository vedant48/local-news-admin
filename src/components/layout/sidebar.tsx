export default function Sidebar() {
  return (
    <div className="w-60 bg-black text-white p-4 space-y-4">
      <h2 className="text-lg font-bold">LocalNews</h2>

      <div className="space-y-2">
        <a href="/blogs" className="block hover:text-gray-300">
          Blogs
        </a>
        <a href="/create" className="block hover:text-gray-300">
          Create Blog
        </a>
        <a href="/issues" className="block hover:text-gray-300">
          Issues
        </a>

        <a href="/issues/create" className="block hover:text-gray-300">
          Report Issue
        </a>
      </div>
    </div>
  );
}
