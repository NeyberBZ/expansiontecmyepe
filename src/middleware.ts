import { defineMiddleware } from "astro:middleware";
import { createClient } from "@supabase/supabase-js";

const supabase =
  createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );

export const onRequest =
  defineMiddleware(
    async (context, next) => {

      const pathname =
        context.url.pathname;

      const accessToken =
        context.cookies.get(
          "sb-access-token"
        )?.value;

      if (
        pathname.startsWith("/admin") &&
        pathname !== "/admin/login"
      ) {

        if (!accessToken) {

          return context.redirect(
            "/admin/login"
          );
        }

        try {

          const {
            data: { user }
          } =
            await supabase.auth.getUser(
              accessToken
            );

          if (!user) {

            return context.redirect(
              "/admin/login"
            );
          }

          const {
            data: profile
          } =
            await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();

          context.locals.user = {
            id: user.id,
            email: user.email
          };

          context.locals.role =
            profile?.role ??
            "viewer";

        } catch {

          return context.redirect(
            "/admin/login"
          );
        }
      }

      return next();
    }
  );