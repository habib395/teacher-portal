import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { login } from "@/features/auth/authSlice";
import type { RootState } from "@/app/store";
import { useChangePasswordMutation, useUpdateProfileMutation } from "@/features/auth/aurhApi";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState(currentUser.name ?? "");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      alert("Please fill in both fields.");
      return;
    }
    try {
      await updateProfile({ name, email }).unwrap();

      dispatch(
        login({
          role: currentUser.role,
          name,
          userId: currentUser.userId!,
          studentProfile: currentUser.studentProfile,
          token: currentUser.token!,
        })
      );

      alert("Profile updated successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err?.data?.message || "Failed to update profile.");
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill in both password fields.");
      return;
    }
    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setCurrentPassword("");
      setNewPassword("");
      alert("Password changed successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err?.data?.message || "Failed to change password.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <Button onClick={handleUpdateProfile} disabled={isUpdatingProfile}>
              {isUpdatingProfile ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button onClick={handleChangePassword} disabled={isChangingPassword}>
              {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}