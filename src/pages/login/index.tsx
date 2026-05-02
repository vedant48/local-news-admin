import { useForm } from "react-hook-form";
import { useLogin } from "@refinedev/core";

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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-80 bg-white p-6 rounded-xl shadow space-y-4">
        <h1 className="text-xl font-bold">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("email", { required: true })} className="border p-2 w-full rounded" placeholder="Email" />

          <input
            type="password"
            {...register("password", { required: true })}
            className="border p-2 w-full rounded"
            placeholder="Password"
          />

          <button type="submit" disabled={isPending} className="bg-black text-white w-full p-2 rounded">
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
