import { UserProfile } from "@clerk/nextjs";
import { AdminHeader } from "@/components/layout/AdminHeader";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 sm:p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Admin Security & Profile</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage your credentials, 2-Factor Authentication, active sessions, and profile settings.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl">
            <UserProfile
              appearance={{
                elements: {
                  card: "bg-transparent shadow-none border-none text-white",
                  navbar: "bg-slate-950/60 border-r border-slate-800",
                  navbarButton: "text-slate-400 hover:text-white",
                  headerTitle: "text-white font-bold",
                  headerSubtitle: "text-slate-400 text-xs",
                  profileSectionTitleText: "text-indigo-400 font-bold",
                  formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold",
                },
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
