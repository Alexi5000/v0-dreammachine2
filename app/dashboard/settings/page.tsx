import { createClient } from "@/lib/supabase/server"
import { SettingsClient } from "./client"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single()

  return (
    <SettingsClient
      userId={user?.id || ""}
      userEmail={user?.email || ""}
      fullName={profile?.full_name || ""}
      role={profile?.role || "user"}
    />
  )
}
