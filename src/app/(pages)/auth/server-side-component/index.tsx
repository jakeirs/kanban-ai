import { isAuthenticatedNextjs } from "@convex-dev/auth/nextjs/server";

export default async function ServerSideComponent() {
  const isAuthenticated = await isAuthenticatedNextjs();

  return <div className="p-4">Async Component</div>;
}
