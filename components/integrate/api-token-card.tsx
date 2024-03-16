"use client";

import { useEffect, useState } from "react";

import { generateApiKey, recreateAPIKey } from "@/actions/api-key";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

function ApiTokenCard({ apiKey }: { apiKey: { token: string } }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function create() {
      if (!apiKey) {
        await generateApiKey();
      }
    }
    create();
  }, [apiKey]);

  async function handleRecreate() {
    setIsLoading(true);
    const res = await recreateAPIKey();
    if (res.error) {
      toast({
        title: "Error while recreating API key",
        description: res.message,
      });
    } else {
      toast({
        title: "API key recreated",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="flex gap-4 mb-4 border items-center border-white/30 p-4 rounded-lg">
      <p className="mb-4 text-xl font-medium">Your API keys</p>
      {!apiKey ? (
        <p>Creating a new API key for you</p>
      ) : (
        <>
          <p className="px-4 py-2 rounded-lg bg-slate-800">{apiKey.token}</p>
          <Button
            className="ml-auto"
            onClick={handleRecreate}
            disabled={isLoading}
          >
            Recreate
          </Button>
        </>
      )}
    </div>
  );
}

export default ApiTokenCard;
