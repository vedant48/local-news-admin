import { useForm } from "react-hook-form";
import { useCreate } from "@refinedev/core";
import Layout from "@/components/layout/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, MapPin, ImageIcon } from "lucide-react";

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
      <div className="max-w-2xl space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Report Issue</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Submit a local issue for community review and action
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="text-base">Issue Details</CardTitle>
                <CardDescription>Provide accurate information to help resolve quickly</CardDescription>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="pt-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Broken streetlight on MG Road"
                  {...register("title", { required: true })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail — what happened, when, and who is affected…"
                  className="min-h-[110px] resize-none"
                  {...register("description", { required: true })}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    id="location"
                    className="pl-9"
                    placeholder="e.g. Boring Road, Patna"
                    {...register("location", { required: true })}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5" />
                  Image URL
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://..."
                  {...register("imageUrl")}
                />
                <p className="text-xs text-muted-foreground">
                  Attach a photo URL to help illustrate the issue.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Button
                  type="submit"
                  disabled={mutation?.isPending}
                  className="gap-1.5"
                >
                  <AlertCircle className="h-4 w-4" />
                  {mutation?.isPending ? "Submitting…" : "Submit Issue"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={mutation?.isPending}
                >
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="rounded-lg border border-dashed bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
          <strong className="font-medium text-foreground">Note:</strong> All submitted issues are
          reviewed by our team before being published. Provide accurate location details to ensure
          faster resolution.
        </div>
      </div>
    </Layout>
  );
}
