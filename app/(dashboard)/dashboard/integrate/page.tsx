import { getApiKey } from "@/actions/api-key";
import ApiTokenCard from "@/components/integrate/api-token-card";
import ConnectCard from "@/components/integrate/connect-card";

export const metadata = {
  title: "Integrate",
};

async function IntegratePage() {
  const apikeys = await getApiKey();
  if (apikeys.error) {
    return (
      <>
        <section className="pb-10">
          <h2 className="text-3xl font-semibold mb-4">
            Integrate with TailTrack
          </h2>
        </section>
        <p>{apikeys.message}</p>
      </>
    );
  }

  return (
    <section className="pb-10">
      <h2 className="text-3xl font-semibold mb-10">
        Integrate with Tail Track
      </h2>
      <ApiTokenCard apiKey={apikeys.data[0]} />
      <ConnectCard />
    </section>
  );
}

export default IntegratePage;
