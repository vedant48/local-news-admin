import { useForm } from "react-hook-form";
import { useCreate } from "@refinedev/core";
import Layout from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Link } from "lucide-react";

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
      <div className="max-w-2xl space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Create Blog</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Generate a blog post automatically from a YouTube or Facebook video URL
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">AI Blog Generator</CardTitle>
                <CardDescription>Paste a video URL and we'll do the rest</CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="videoUrl"
                    className="pl-9"
                    placeholder="https://youtube.com/watch?v=... or https://fb.com/video/..."
                    {...register("videoUrl", { required: true })}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports YouTube and Facebook video links.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Button
                  type="submit"
                  disabled={mutation.isPending}
                  className="gap-1.5"
                >
                  <Sparkles className="h-4 w-4" />
                  {mutation.isPending ? "Generating…" : "Generate Blog"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={mutation.isPending}
                >
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info callout */}
        <div className="rounded-lg border border-dashed bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          <strong className="font-medium text-foreground">How it works:</strong> Paste a local news
          video URL. Our AI transcribes it, extracts key information, and publishes a structured
          news article automatically.
        </div>
      </div>
    </Layout>
  );
}
