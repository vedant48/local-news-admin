import { useList } from "@refinedev/core";
import Layout from "@/components/layout/layout";

export default function Blogs() {
  const { result, query } = useList({
    resource: "blogs",
  });

  if (query.isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Blogs</h1>

        {result.data?.map((b: any, i: number) => (
          <div key={i} className="border p-4 rounded-lg bg-white">
            <h2>{b.title}</h2>
            <p>{b.content}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
