import dynamic from "next/dynamic";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PackageConnect from "./package-connect";
const DirectConnect = dynamic(() => import("./direct-connect"), {
  loading: () => <p>Loading...</p>,
});

function ConnectCard() {
  return (
    <div className="mb-4 border border-white/30 p-4 rounded-lg bg-background">
      <p className="mb-4 text-xl font-medium">Integration</p>
      <Tabs defaultValue="package">
        <TabsList className="mb-4">
          <TabsTrigger value="package">Package</TabsTrigger>
          <TabsTrigger value="api">Direct API</TabsTrigger>
        </TabsList>
        <TabsContent value="package">
          <PackageConnect />
        </TabsContent>
        <TabsContent value="api">
          <DirectConnect />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ConnectCard;
