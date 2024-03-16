"use client";

import { useState } from "react";

import { deleteAPIKey } from "@/actions/api-key";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { useToast } from "../ui/use-toast";

function ApiTokenCard({ apiKey }: { apiKey: { name: string; token: string } }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  async function handleDelete() {
    setIsLoading(true);
    const res = await deleteAPIKey(apiKey.token);
    if (res.error) {
      toast({
        title: "Error while deleting API key",
        description: res.message,
      });
    } else {
      toast({
        title: "API key deleted",
      });
    }
    setIsLoading(false);
  }
  return (
    <div className="flex gap-4 mb-4 border items-center border-white/30 p-4 rounded-lg">
      <p className="capitalize text-lg">{apiKey.name}</p>
      <p className="px-4 py-2 rounded-lg bg-slate-800">{apiKey.token}</p>
      <Button
        variant="destructive"
        size="icon"
        className="ml-auto"
        onClick={handleDelete}
        disabled={isLoading}
      >
        <Icons.close />
      </Button>
    </div>
  );
}

export default ApiTokenCard;
