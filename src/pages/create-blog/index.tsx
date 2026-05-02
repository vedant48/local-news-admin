import { useForm } from "react-hook-form";
import { useCreate } from "@refinedev/core";
import Layout from "@/components/layout/layout";

type FormValues = {
  videoUrl: string;
};

export default function CreateBlog() {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { mutate, mutation } = useCreate();

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        resource: "blogs/generate",
        values: {
          videoUrl: data.videoUrl,
          location: "Patna",
          tags: ["local"],
        },
      },
      {
        onSuccess: () => {
          alert("Blog created!");
          reset();
        },
        onError: () => {
          alert("Error creating blog");
        },
      },
    );
  };

  return (
    <Layout>
      <div className="space-y-4 max-w-xl">
        <h1 className="text-xl font-bold">Create Blog</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("videoUrl", { required: true })}
            className="border p-2 w-full rounded"
            placeholder="YouTube / FB Video URL"
          />

          <button type="submit" disabled={mutation.isPending} className="bg-black text-white px-4 py-2 rounded w-full">
            {mutation.isPending ? "Generating..." : "Generate Blog"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
