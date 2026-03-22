import { createClient, type SanityClient } from "@sanity/client";

let _client: SanityClient | null = null;

function getClient(): SanityClient {
  if (!_client) {
    _client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sn7mthea",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: true,
    });
  }
  return _client;
}

export async function sanityFetch<T = unknown>(query: string): Promise<T> {
  try {
    return await getClient().fetch<T>(query);
  } catch {
    return [] as unknown as T;
  }
}
