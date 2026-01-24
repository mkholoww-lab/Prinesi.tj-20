import Layout from "@/components/Layout";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Save, Lock, Image, AlertCircle, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const { user, changePassword, updateAvatar } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [avatarSuccess, setAvatarSuccess] = useState("");

  if (!user) return null;

  const handlePasswordChange = () => {
    setPasswordError("");
    setPasswordSuccess("");

    if (currentPassword !== user.password) {
      setPasswordError("Current password is incorrect");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    changePassword(newPassword);
    setPasswordSuccess("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSave = () => {
    if (avatar) {
      updateAvatar(avatar);
      setAvatarSuccess("Avatar updated successfully!");
      setTimeout(() => setAvatarSuccess(""), 3000);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your profile and account settings
          </p>
        </div>

        {/* Profile Overview */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm border border-border">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            My Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="mb-4">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={user.username}
                    className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-4xl font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <span className="bg-primary hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2 cursor-pointer">
                  <Image className="w-4 h-4" />
                  Upload Photo
                </span>
              </label>

              {avatarSuccess && (
                <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  {avatarSuccess}
                </div>
              )}

              {avatarPreview && avatarPreview !== user.avatar && (
                <button
                  onClick={handleAvatarSave}
                  className="mt-3 bg-primary hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Avatar
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Username
                </label>
                <p className="text-lg font-semibold text-foreground">
                  {user.username}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Full Name
                </label>
                <p className="text-lg font-semibold text-foreground">
                  {user.name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Role
                </label>
                <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-primary text-white capitalize">
                  {user.role}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Account Created
                </label>
                <p className="text-sm text-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              {user.lastLogin && (
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Last Login
                  </label>
                  <p className="text-sm text-foreground">
                    {new Date(user.lastLogin).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm border border-border">
          <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Change Password
          </h2>

          {passwordError && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">
                {passwordError}
              </p>
            </div>
          )}

          {passwordSuccess && (
            <div className="mb-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-700 dark:text-green-300">
                {passwordSuccess}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={handlePasswordChange}
              className="w-full bg-primary hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <Lock className="w-5 h-5" />
              Update Password
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            Security Tips
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• Use a strong password with at least 8 characters</li>
            <li>• Include uppercase, lowercase, numbers, and special characters</li>
            <li>• Change your password regularly for better security</li>
            <li>• Never share your password with anyone</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
