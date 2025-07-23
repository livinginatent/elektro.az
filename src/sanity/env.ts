// lib/sanity/config.ts
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-11";

// For client-side components
export const clientConfig = {
  apiVersion,
  dataset: assertValue(
    process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
    "Missing environment variable: NEXT_PUBLIC_SANITY_STUDIO_DATASET"
  ),
  projectId: assertValue(
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
    "Missing environment variable: NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID"
  ),
};

// For server-side components
export const serverConfig = {
  apiVersion,
  dataset: assertValue(
    process.env.SANITY_STUDIO_DATASET ||
      process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
    "Missing environment variable: SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_STUDIO_DATASET"
  ),
  projectId: assertValue(
    process.env.SANITY_STUDIO_PROJECT_ID ||
      process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
    "Missing environment variable: SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID"
  ),
};

// Universal config (works on both client and server)
export const config = {
  apiVersion,
  dataset: assertValue(
    process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET ||
      process.env.SANITY_STUDIO_DATASET,
    "Missing environment variable: SANITY_STUDIO_DATASET"
  ),
  projectId: assertValue(
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID ||
      process.env.SANITY_STUDIO_PROJECT_ID,
    "Missing environment variable: SANITY_STUDIO_PROJECT_ID"
  ),
};

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

// Alternative: Runtime detection approach
export const getConfig = () => {
  const isServer = typeof window === "undefined";

  return {
    apiVersion,
    dataset: assertValue(
      isServer
        ? process.env.SANITY_STUDIO_DATASET ||
            process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET
        : process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET,
      `Missing environment variable: ${isServer ? "SANITY_STUDIO_DATASET" : "NEXT_PUBLIC_SANITY_STUDIO_DATASET"}`
    ),
    projectId: assertValue(
      isServer
        ? process.env.SANITY_STUDIO_PROJECT_ID ||
            process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID
        : process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID,
      `Missing environment variable: ${isServer ? "SANITY_STUDIO_PROJECT_ID" : "NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID"}`
    ),
  };
};
