import { createClient } from "../../utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const supabase = await createClient();

  let query = supabase.from("EVs").select("*");

  if (q) {
    // Use ilike for case-insensitive partial match on brand or model
    query = query.or(`brand.ilike.%${q}%,model.ilike.%${q}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ cars: data });
}
