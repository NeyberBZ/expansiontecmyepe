export function isAdmin(
  role: string | null
) {
  return role === "admin";
}

export function canEdit(
  role: string | null
) {
  return (
    role === "admin" ||
    role === "editor"
  );
}

export function canView(
  role: string | null
) {
  return (
    role === "admin" ||
    role === "editor" ||
    role === "viewer"
  );
}