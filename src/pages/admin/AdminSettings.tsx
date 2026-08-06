import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Shield, Bell, Lock, Save, Globe } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    systemName: "EduPortal Cinematic LMS",
    supportEmail: "support@eduportal.com",
    maintenanceMode: false,
    emailNotifications: true,
    userRegistration: true,
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System Settings & Permissions</h1>
        <p className="text-sm text-slate-500">Configure global portal settings, security controls, and notification preferences.</p>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl text-sm font-medium animate-fadeIn">
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">General Configuration</h3>
              <p className="text-xs text-slate-500">Basic information and portal identification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Portal Name</label>
              <input 
                type="text" 
                value={settings.systemName}
                onChange={(e) => handleChange("systemName", e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Support Email</label>
              <input 
                type="email" 
                value={settings.supportEmail}
                onChange={(e) => handleChange("supportEmail", e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Security & Access Controls */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Security & Permissions</h3>
              <p className="text-xs text-slate-500">Control system access and maintenance toggles</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-800">Maintenance Mode</h4>
                <p className="text-xs text-slate-500">Temporarily disable portal access for regular users during updates.</p>
              </div>
              <input 
                type="checkbox" 
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
                className="w-5 h-5 accent-rose-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <h4 className="text-sm font-bold text-slate-800">New User Registration</h4>
                <p className="text-xs text-slate-500">Allow students and teachers to sign up for new accounts.</p>
              </div>
              <input 
                type="checkbox" 
                checked={settings.userRegistration}
                onChange={(e) => handleChange("userRegistration", e.target.checked)}
                className="w-5 h-5 accent-rose-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">System Notifications</h3>
              <p className="text-xs text-slate-500">Configure email alerts and system announcements</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Email Notifications</h4>
              <p className="text-xs text-slate-500">Send automated emails for leave approvals, assignments, and notices.</p>
            </div>
            <input 
              type="checkbox" 
              checked={settings.emailNotifications}
              onChange={(e) => handleChange("emailNotifications", e.target.checked)}
              className="w-5 h-5 accent-rose-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-md shadow-rose-500/20"
          >
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}