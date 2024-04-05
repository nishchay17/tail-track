"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getNamespaces } from "@/actions/namespace";
import { createWebhook } from "@/actions/webhook";
import { webhookTypes } from "@/lib/db/schema/webhook";
import { useToast } from "@/components/ui/use-toast";

const formValidation = z.object({
  method: z.enum(["POST", "GET", "PUT", "DELETE"]),
  url: z.string().url().trim(),
  namespace: z.string().trim().min(1),
  type: z.enum(webhookTypes.enumValues),
  additionalHeaders: z.string().trim(),
});
type FormData = z.infer<typeof formValidation>;

function AddWebhooks() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const namespaceQuery = useQuery({
    queryKey: ["namespace"],
    queryFn: async () => {
      const ns = await getNamespaces();
      if (ns.error) {
        return [];
      }
      return ns.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 10_000,
  });
  const form = useForm<FormData>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      method: "POST",
      type: webhookTypes.enumValues[0],
      additionalHeaders: "{}",
      url: "",
      namespace: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: FormData) => {
    const res = await createWebhook(data);
    if (res.error) {
      toast({
        title: "Error while creating webhook",
        description: res.message,
      });
      return;
    }
    form.reset();
    toast({ title: "Webook created" });
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Webhook</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Webhook</DialogTitle>
          <DialogDescription>
            You can add HTTP or slack webhooks.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={onSubmit} className="pt-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="namespace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Namespace</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {namespaceQuery.data?.map((it) => (
                              <SelectItem
                                value={it}
                                key={it}
                                className="capitalize"
                              >
                                {it}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://.." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder="Type"
                              defaultValue={webhookTypes.enumValues[0]}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            {webhookTypes.enumValues.map((it) => (
                              <SelectItem
                                value={it}
                                key={it}
                                className="capitalize"
                              >
                                {it}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="additionalHeaders"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Headers</FormLabel>
                      <FormControl>
                        <Textarea className="max-h-[200px]" {...field} />
                      </FormControl>
                      <FormDescription>
                        This should be in JSON format
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                isLoading={form.formState.isSubmitting}
                type="submit"
                className="mt-8"
              >
                Add Webhook
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddWebhooks;
