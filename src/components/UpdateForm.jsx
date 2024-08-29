"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import ButtonLoading from "./ButtonLoading";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/UserStore";
import { UserPen } from "lucide-react";

//TODO: add validations!!

const UpdateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const userProfile = useUserStore((state) => state.user);

  const form = useForm({
    defaultValues: {
      newUserName: userProfile?.username,
      newEmail: userProfile?.email,
    },
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await axios.put("/api/auth/profile", values);

      if (res.status === 200) {
        toast({
          title: "Update successful!",
        });
      }
      setIsLoading(false);
      form.reset();
      router.push("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile <UserPen className="ml-2" /> </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="newUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input defaultValue={userProfile.username} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input defaultValue={userProfile.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              <ButtonLoading />
            ) : (
              <Button className="w-32 px-6" type="submit">
                Save Changes
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateForm;
