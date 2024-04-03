"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Icons } from "../ui/icons";
import { cn } from "@/lib/utils";

function AnalyticsSelector({
  namespaces,
  onNamespaceChange,
  refetching,
  onRefetch,
}: {
  namespaces: string[];
  onNamespaceChange: (i: string) => void;
  refetching: boolean;
  onRefetch: () => void;
}) {
  return (
    <>
      <div className="flex gap-4 items-center justify-between my-5 pl-[2px]">
        <div className="space-y-2">
          <label htmlFor="namespace">Namespace</label>
          <Select
            onValueChange={onNamespaceChange}
            defaultValue={namespaces[0]}
          >
            <SelectTrigger id="namespace" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {namespaces.map((it) => (
                <SelectItem key={it} value={it}>
                  {it}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button disabled={refetching} onClick={onRefetch} variant="outline">
          <Icons.spinner
            className={cn("h-4 w-4", refetching && "animate-spin")}
          />
          <span className="sr-only">Refresh analytics</span>
        </Button>
      </div>
    </>
  );
}

export default AnalyticsSelector;
