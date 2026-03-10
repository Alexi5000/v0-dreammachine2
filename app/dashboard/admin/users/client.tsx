"use client"

import { motion } from "motion/react"

interface Profile {
  id: string
  full_name: string | null
  role: string
  created_at: string
  updated_at: string
}

export function AdminUsersClient({ users }: { users: Profile[] }) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">User Management</h1>
          <span className="px-2 py-1 text-xs font-bold bg-[#fbbf24]/20 text-[#fbbf24] rounded">
            Admin Only
          </span>
        </div>
        <p className="text-white/60 mt-2">Manage user accounts and permissions</p>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-[#21346e]/40 via-[#1a2a5a]/40 to-[#151f45]/40 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-bold text-white/50 uppercase tracking-wider">User</th>
                <th className="text-left p-4 text-sm font-bold text-white/50 uppercase tracking-wider">Role</th>
                <th className="text-left p-4 text-sm font-bold text-white/50 uppercase tracking-wider">Joined</th>
                <th className="text-left p-4 text-sm font-bold text-white/50 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center text-[#0a0a0a] font-bold">
                        {(user.full_name || "U").charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.full_name || "Unknown"}</p>
                        <p className="text-sm text-white/40">{user.id.slice(0, 8)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      user.role === "admin" 
                        ? "bg-[#fbbf24]/20 text-[#fbbf24]" 
                        : "bg-white/10 text-white/60"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-white/60">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button className="text-sm text-white/60 hover:text-white transition-colors">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-white/40">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
