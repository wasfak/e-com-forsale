import { currentUser } from "@clerk/nextjs";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) return <div>Not logged in</div>;

  return <div>Welcome to Dashboard {user?.firstName}</div>;
}
