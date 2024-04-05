"use client";

import { useEffect, useState } from "react";

import { generateApiKey, recreateAPIKey } from "@/actions/api-key";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useCopyToClipboard } from "@/hooks/use-copy";

function ApiTokenCard({
  apiKey,
  demo = false,
}: {
  apiKey: { token: string };
  demo?: boolean;
}) {
  const { toast } = useToast();
  const [_, setCopiedText] = useCopyToClipboard();
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
    if (demo) return;
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
    <div className="mb-4 border border-white/30 p-4 rounded-lg bg-background">
      <p className="mb-4 text-xl font-medium">Your API keys</p>
      {!apiKey ? (
        <p>Creating a new API key for you</p>
      ) : (
        <>
          <p
            className="px-4 py-2 rounded-lg bg-slate-800 cursor-pointer w-fit"
            onClick={() => {
              setCopiedText(apiKey.token);
              toast({
                title: "Copied to clipboard!",
              });
            }}
          >
            {apiKey.token}
          </p>
          <Button
            className="mt-4"
            onClick={handleRecreate}
            isLoading={isLoading}
          >
            Recreate
          </Button>
        </>
      )}
    </div>
  );
}

export default ApiTokenCard;
