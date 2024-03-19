import { checkAuth } from "@/lib/auth/utils";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return <>{children}</>;
}
