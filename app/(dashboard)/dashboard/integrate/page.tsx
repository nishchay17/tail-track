import { getApiKeys } from "@/actions/api-key";

async function IntegratePage() {
  const apikeys = await getApiKeys();
  return (
    <div>
      {apikeys.map((key) => (
        <p key={key.token}>
          {key.name}: {key.token}
        </p>
      ))}
    </div>
  );
}

export default IntegratePage;
