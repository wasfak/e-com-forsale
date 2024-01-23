import SideBar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="h-[100vh] w-52 bg-gray-900">
          <SideBar />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
