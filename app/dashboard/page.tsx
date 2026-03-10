import { createClient } from "@/lib/supabase/server"
import { DashboardOverview } from "@/components/dashboard/overview"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  const isAdmin = profile?.role === "admin"
  const userName = profile?.full_name || user?.user_metadata?.full_name || "User"

  return (
    <DashboardOverview 
      userName={userName} 
      isAdmin={isAdmin}
      userEmail={user?.email || ""}
    />
  )
}
