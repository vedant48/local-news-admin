import { useList } from "@refinedev/core";
import Layout from "@/components/layout/layout";

export default function Issues() {
  const { result, query } = useList({
    resource: "issues",
  });

  if (query.isLoading) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Issues</h1>

        {result.data?.map((issue: any, i: number) => (
          <div key={i} className="border p-4 rounded-lg bg-white space-y-2">
            <h2 className="font-semibold">{issue.title}</h2>
            <p className="text-sm text-gray-600">{issue.description}</p>

            <div className="text-xs text-gray-500">📍 {issue.location}</div>

            <div className="text-xs">
              Status: <span className="font-medium">{issue.status}</span>
            </div>

            {issue.imageUrl && (
              <img src={issue.imageUrl} alt="issue" className="w-full max-h-40 object-cover rounded" />
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
