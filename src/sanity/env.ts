// src/sanity/env.ts
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-11";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET ||
    process.env.SANITY_STUDIO_DATASET,
  "Missing environment variable: SANITY_STUDIO_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID,
  "Missing environment variable: SANITY_STUDIO_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

// Export default config object as well
export default {
  apiVersion,
  dataset,
  projectId,
};

// Alternative exports for different contexts
export const clientConfig = {
  apiVersion,
  dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,
  projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
};

export const serverConfig = {
  apiVersion,
  dataset:
    process.env.SANITY_STUDIO_DATASET ||
    process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET!,
  projectId:
    process.env.SANITY_STUDIO_PROJECT_ID ||
    process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID!,
};
