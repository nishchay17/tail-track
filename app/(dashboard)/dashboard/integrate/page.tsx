import { getApiKeys } from "@/actions/api-key";
import AddApiKeyForm from "@/components/integrate/add-api-key-form";
import ApiTokenCard from "@/components/integrate/api-token-card";

async function IntegratePage() {
  const apikeys = await getApiKeys();
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
    <>
      <section className="pb-10">
        <h2 className="text-3xl font-semibold mb-4">
          Integrate with TailTrack
        </h2>
      </section>
      <AddApiKeyForm />
      {apikeys.data.length === 0 ? (
        <p>No API keys found</p>
      ) : (
        <>
          <p className="mb-4 text-xl font-medium">Your API keys</p>
          {apikeys.data.map((key) => (
            <ApiTokenCard key={key.token} apiKey={key} />
          ))}
        </>
      )}
    </>
  );
}

export default IntegratePage;
