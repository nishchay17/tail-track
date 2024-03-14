import { getApiKeys } from "@/actions/api-key";
import AddApiKeyForm from "@/components/integrate/add-api-key-form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

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
            <div
              key={key.token}
              className="flex gap-4 mb-4 border items-center border-white/30 p-4 rounded-lg"
            >
              <p className="capitalize text-lg">{key.name}</p>
              <p className="px-4 py-2 rounded-lg bg-slate-800">{key.token}</p>
              <Button variant="destructive" size="icon" className="ml-auto">
                <Icons.close />
              </Button>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default IntegratePage;
