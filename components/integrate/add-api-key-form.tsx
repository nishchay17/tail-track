"use client";

import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { generateApiKey } from "@/actions/api-key";
import { useToast } from "../ui/use-toast";

function AddApiKeyForm() {
  const [name, setName] = useState("");
  const { toast } = useToast();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await generateApiKey({ name });
    if (res.error) {
      toast({
        title: "Error while creating API key",
        description: res.message,
      });
      return;
    }
    toast({
      title: "API key created",
    });
    setName("");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg bg-slate-800 px-6 py-4 mb-10"
    >
      <h3 className="text-xl mb-4">Add New API Key</h3>
      <label htmlFor="name mb-2">New {"API's"} name</label>
      <Input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-background max-w-sm"
      />
      <Button className="mt-3" type="submit">
        Submit
      </Button>
    </form>
  );
}

export default AddApiKeyForm;
