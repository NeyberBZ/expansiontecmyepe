declare namespace App {

  interface Locals {

    user:
      | {
          id: string;
          email?: string;
        }
      | null;

    role:
      | "admin"
      | "editor"
      | "viewer"
      | null;
  }
}