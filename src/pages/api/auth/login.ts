import type { APIRoute } from "astro";
import { createSupabaseServer } from "../../../lib/supabase-server-auth";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {

    const { email, password } =
      await request.json();

    console.log(
      "COOKIE SIZE:",
      [...cookies.headers()].length
    );
    console.log(
      "COOKIE LIST:",
      [...cookies.headers()]
    );
    const supabase =
      createSupabaseServer(cookies);

    const {
      data,
      error
    } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    console.log(
      "COOKIES DESPUES LOGIN:",
      cookies.headers()
    );

    console.log(
      "SET EXISTS:",
      typeof cookies.set
    );

    console.log("BODY:", { email });
    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.message
        }),
        { status: 401 }
      );
    }

    const response = new Response(
      JSON.stringify({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    cookies.set(
      "sb-access-token",
      data.session.access_token,
      {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false
      }
    );

    cookies.set(
      "sb-refresh-token",
      data.session.refresh_token,
      {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: false
      }
    );

    return response;

  } catch (error) {

    console.error(error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno"
      }),
      { status: 500 }
    );
  }
};