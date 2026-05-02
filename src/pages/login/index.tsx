import { useForm } from "react-hook-form";
import { useLogin } from "@refinedev/core";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";

type FormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<FormValues>();

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-md">
            <Newspaper className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">LocalNews Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to manage your content</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign in</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                />
              </div>

              <Button type="submit" disabled={isPending} className="w-full mt-2" size="default">
                {isPending ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          LocalNews Admin Portal · Secure access only
        </p>
      </div>
    </div>
  );
}
