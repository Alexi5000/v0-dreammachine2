"use client"

import { useState, useId } from "react"
import { motion } from "motion/react"
import { createClient } from "@/lib/supabase/client"

function NotificationToggle({ 
  label, 
  description, 
  defaultChecked 
}: { 
  label: string
  description: string
  defaultChecked: boolean 
}) {
  const [enabled, setEnabled] = useState(defaultChecked)
  const id = useId()
  
  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
      <div>
        <label htmlFor={id} className="font-medium text-white cursor-pointer">{label}</label>
        <p className="text-sm text-white/50">{description}</p>
      </div>
      <button
        id={id}
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          enabled ? "bg-[#fbbf24]" : "bg-white/20"
        }`}
      >
        <span 
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  )
}

interface SettingsClientProps {
  userId: string
  userEmail: string
  fullName: string
  role: string
}

export function SettingsClient({ userId, userEmail, fullName, role }: SettingsClientProps) {
  const [name, setName] = useState(fullName)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const supabase = createClient()

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSaved(false)

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: name, updated_at: new Date().toISOString() })
      .eq("id", userId)

    if (updateError) {
      setError("Failed to update profile. Please try again.")
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
    setSaving(false)
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
        <p className="text-white/60 mt-2">Manage your account preferences</p>
      </motion.div>

      {/* Role Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex items-center gap-3"
      >
        <span className="text-sm text-white/50">Account Type:</span>
        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
          role === "admin" 
            ? "bg-[#fbbf24]/20 text-[#fbbf24] border border-[#fbbf24]/30" 
            : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
        }`}>
          {role}
        </span>
      </motion.div>

      {/* Profile Section */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSaveProfile}
        className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#fbbf24]/50 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Email</label>
            <input
              type="email"
              value={userEmail}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/50 cursor-not-allowed"
              disabled
            />
            <p className="text-xs text-white/40 mt-1">Email cannot be changed</p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {saved && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Profile updated successfully
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#fbbf24] text-[#0a0a0a] font-bold rounded-lg hover:bg-[#fbbf24]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.form>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Notifications</h3>
        <div className="space-y-4">
          <NotificationToggle
            label="Email Notifications"
            description="Receive project updates via email"
            defaultChecked={true}
          />
          <NotificationToggle
            label="Project Alerts"
            description="Get notified about project milestones"
            defaultChecked={true}
          />
          <NotificationToggle
            label="Team Messages"
            description="Notifications for team communication"
            defaultChecked={false}
          />
          <NotificationToggle
            label="Marketing Updates"
            description="News and product announcements"
            defaultChecked={false}
          />
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <div>
              <p className="font-medium text-white">Password</p>
              <p className="text-sm text-white/50">Managed through Supabase Auth</p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-[#fbbf24] hover:bg-[#fbbf24]/10 rounded-lg transition-colors">
              Reset
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-white/50">Not implemented</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-white/10 text-white/60 rounded-full">
              Not Available
            </span>
          </div>
        </div>
      </motion.div>

      {/* Session Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 p-6"
      >
        <h3 className="text-lg font-bold text-white mb-6">Session & Security Info</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-white/50">User ID</span>
            <span className="text-white/80 font-mono text-xs">{userId}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-white/50">Authentication</span>
            <span className="text-green-400">Email & Password</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-white/5">
            <span className="text-white/50">RBAC Status</span>
            <span className="text-green-400">Enabled</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-white/50">RLS Protection</span>
            <span className="text-green-400">Active</span>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-gradient-to-br from-red-900/20 via-red-800/10 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-red-500/20 p-6"
      >
        <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
        <p className="text-sm text-white/50 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-4 py-2 text-sm font-medium text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">
          Delete Account
        </button>
      </motion.div>
    </div>
  )
}
