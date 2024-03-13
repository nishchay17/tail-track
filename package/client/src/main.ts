const BASE_URL = "https://tail-track.vercel.app";

function getAPIKey() {
  return process.env.TAILTRACK_API_KEY;
}

export type AnalyticsParams = {
  namespace: string;
  meta?: { [key: string]: string | number };
};
export async function tailtrack({ namespace, meta }: AnalyticsParams) {
  const API_KEY = getAPIKey();
  if (!API_KEY) {
    return {
      error: true,
      message: "Please set TAILTRACK_API_KEY in your .env file",
    };
  }
  if (namespace === "")
    return { error: true, message: "namespace can't be empty" };
  try {
    const res = await fetch(`${BASE_URL}/api/v1/analytics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "App-token": API_KEY!,
      },
      body: JSON.stringify({ namespace, meta }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: true, message: data.message };
    }
    return data;
  } catch (error) {
    console.error(error);
    return { error: true, message: "Something went wrong" };
  }
}

// tailtrack({ namespace: "test" }).then((res) => {
//   console.log(res);
// });
