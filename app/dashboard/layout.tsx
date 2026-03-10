import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/shell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile with role
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const isAdmin = profile?.role === "admin"
  const userEmail = user.email || ""
  const userName = profile?.full_name || user.user_metadata?.full_name || "User"

  return (
    <DashboardShell
      userName={userName}
      userEmail={userEmail}
      isAdmin={isAdmin}
    >
      {children}
    </DashboardShell>
  )
}
