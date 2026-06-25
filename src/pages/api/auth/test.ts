import type { APIRoute } from "astro";
import { createSupabaseServer } from "../../../lib/supabase-server-auth";

export const GET: APIRoute = async ({ cookies }) => {

  const supabase =
    createSupabaseServer(cookies);

  const {
    data,
    error
  } =
    await supabase.auth.signInWithPassword({
      email: "admin@expansiontec.pe",
      password: `?R9]i!}.E8"dWbH`
    });

  console.log("LOGIN:", error);

  return new Response(
    JSON.stringify({
      success: true
    })
  );
};