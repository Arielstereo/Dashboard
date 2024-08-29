"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import useUserStore from "@/store/UserStore";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const FormAction = ({setOpen, getOperations }) => {
  const user = useUserStore((state) => state.user);
  const form = useForm({
    defaultValues: {
      description: "",
      amount: "",
      type: "",
    },
  });
  const onSubmit = async (values) => {
    try {
      const { id } = user;
      const res = await axios.post(`/api/operation/${id}`, values);
      setOpen(false)
      getOperations()
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-4 w-fit">
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Food" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormLabel>Operation</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-24">
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="$ 0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full mt-8">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormAction;
