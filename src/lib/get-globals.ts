import { createClient } from "@/prismicio";

export async function getGlobals() {
  const client = createClient();

  const navigation = await client.getSingle("nav");

  return { navigation };
}
