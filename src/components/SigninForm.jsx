"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import ButtonLoading from "./ButtonLoading";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const SigninForm = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/signin", values);
      if (res.status === 200) {
        router.push("/dashboard");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.response.data.msg);
    }
  };
  return (
    <Card className="w-full mx-auto shadow-lg shadow-black bg-slate-50 dark:bg-gray-950">
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-3xl font-bold">Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button className="w-32 px-6" type="submit">
                Login
              </Button>
            )}
          </form>
        </Form>
        <div className="mt-4">
        {errorMsg && <span className="text-red-600">{errorMsg}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default SigninForm;
