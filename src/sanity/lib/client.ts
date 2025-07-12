import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6h125ncn",
  dataset: "production",
  apiVersion: "2025-07-11",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
