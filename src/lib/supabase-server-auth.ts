// src/lib/supabase-server-auth.ts
import { createServerClient } from "@supabase/ssr";

export function createSupabaseServer(cookies: any) {
  return createServerClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookies
            .headers()
            .map((cookie: any) => ({
              name: cookie.name,
              value: cookie.value,
            }));
        },

        setAll(cookiesToSet: any[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, options);
          });
        },
      },
    }
  );
}
