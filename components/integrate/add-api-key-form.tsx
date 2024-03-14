"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import { apiTokenFormSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

function AddApiKeyForm() {
  const form = useForm<z.infer<typeof apiTokenFormSchema>>({
    resolver: zodResolver(apiTokenFormSchema),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof apiTokenFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg bg-slate-800 px-6 py-4 mb-10"
      >
        <h3 className="text-xl mb-4">Add New API Key</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New {"API's"} name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-background max-w-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-3" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AddApiKeyForm;
