export async function verifyAccess(date) {
  // Temporary client-side verification.
  // DO NOT use this as real security.

  return date === "2006-05-16";
}