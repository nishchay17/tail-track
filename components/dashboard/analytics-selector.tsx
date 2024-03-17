"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AnalyticsSelector({
  namespaces,
  onNamespaceChange,
}: {
  namespaces: string[];
  onNamespaceChange: (i: string) => void;
}) {
  return (
    <div className="flex gap-4 items-center my-5 pl-[2px]">
      <div className="space-y-2">
        <label htmlFor="namespace">Namespace</label>
        <Select onValueChange={onNamespaceChange} defaultValue={namespaces[0]}>
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
    </div>
  );
}

export default AnalyticsSelector;
