import { useForm } from "react-hook-form";
import { useCreate } from "@refinedev/core";
import Layout from "@/components/layout/layout";

type FormValues = {
  title: string;
  description: string;
  location: string;
  imageUrl: string;
};

export default function CreateIssue() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { mutate, mutation } = useCreate();

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        resource: "issues",
        values: data,
      },
      {
        onSuccess: () => {
          alert("Issue submitted!");
          reset();
        },
        onError: () => {
          alert("Error submitting issue");
        },
      },
    );
  };

  return (
    <Layout>
      <div className="space-y-4 max-w-xl">
        <h1 className="text-xl font-bold">Report Issue</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("title", { required: true })} placeholder="Title" className="border p-2 w-full rounded" />

          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="border p-2 w-full rounded"
          />

          <input
            {...register("location", { required: true })}
            placeholder="Location"
            className="border p-2 w-full rounded"
          />

          <input {...register("imageUrl")} placeholder="Image URL (optional)" className="border p-2 w-full rounded" />

          <button type="submit" disabled={mutation?.isPending} className="bg-black text-white px-4 py-2 rounded w-full">
            {mutation?.isPending ? "Submitting..." : "Submit Issue"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
