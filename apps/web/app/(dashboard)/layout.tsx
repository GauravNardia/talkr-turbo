import LeftSidebar from "@/components/shared/LeftSidebar";
import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex bg-neutral-950 text-white">
      <LeftSidebar />
      <div className="flex-1 flex flex-col overflow-auto md:px-20">
        {children}
      </div>
    </div>
  );
}
