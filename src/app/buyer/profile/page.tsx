"use client";
import { useState } from "react";
import { useToast } from "@/components/ToastContext";

type Profile = {
  business_name: string;
  type: string;
  location: string;
  gst_id: string;
  notifications: string[];
};

const initialProfile = {
  business_name: "Sunrise Restaurant",
  type: "Restaurant",
  location: "Downtown",
  gst_id: "GSTIN1234",
  notifications: ["Groceries", "Beverages"],
};

const categories = ["Groceries", "Beverages", "Toiletries", "Healthcare", "Cleaning"];

const mockNotifications = [
  { category: "Groceries", message: "New deal on Rice expiring soon!" },
  { category: "Beverages", message: "Discounted Orange Juice available!" },
  { category: "Toiletries", message: "Bulk offer on Soap bars!" },
];

export default function ProfilePage() {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [editing, setEditing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginCode, setLoginCode] = useState("");
  const [loginError, setLoginError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }
  function handleCategoryToggle(cat: string) {
    setProfile((prev) => ({
      ...prev,
      notifications: prev.notifications.includes(cat)
        ? prev.notifications.filter((c) => c !== cat)
        : [...prev.notifications, cat],
    }));
  }
  function handleSave() {
    setEditing(false);
    // Show toast or save to backend in real app
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loginName === "key" && loginCode === "pass") {
      setIsAuthenticated(true);
      setLoginError("");
      showToast("Buyer login successful!");
    } else {
      setLoginError("Invalid business name or code");
      showToast("Login failed");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh]">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow p-8 w-full max-w-sm border border-gray-200 flex flex-col gap-6">
          <h1 className="text-2xl font-bold text-blue-800 mb-2">Buyer Login</h1>
          <input
            type="text"
            placeholder="Business Name"
            value={loginName}
            onChange={e => setLoginName(e.target.value)}
            className="border rounded px-3 py-2 w-full text-black"
            required
          />
          <input
            type="password"
            placeholder="Access Code"
            value={loginCode}
            onChange={e => setLoginCode(e.target.value)}
            className="border rounded px-3 py-2 w-full text-black"
            required
          />
          {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Login</button>
        </form>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-[70vh] p-8">
      <div className="bg-white rounded-2xl shadow p-8 w-full max-w-xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Profile & Notifications</h1>
        <div className="space-y-4 mb-8">
          <div>
            <label className="block font-semibold mb-1 text-black">Business Name</label>
            {editing ? (
              <input name="business_name" value={profile.business_name} onChange={handleChange} className="border rounded px-3 py-2 w-full text-black" />
            ) : (
              <div className="text-lg text-black">{profile.business_name}</div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1 text-black">Type</label>
            {editing ? (
              <select name="type" value={profile.type} onChange={handleChange} className="border rounded px-3 py-2 w-full text-black">
                <option>Restaurant</option>
                <option>Vendor</option>
                <option>NGO</option>
              </select>
            ) : (
              <div className="text-lg text-black">{profile.type}</div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1 text-black">Location</label>
            {editing ? (
              <input name="location" value={profile.location} onChange={handleChange} className="border rounded px-3 py-2 w-full text-black" />
            ) : (
              <div className="text-lg text-black">{profile.location}</div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1 text-black">GST ID</label>
            {editing ? (
              <input name="gst_id" value={profile.gst_id} onChange={handleChange} className="border rounded px-3 py-2 w-full text-black" />
            ) : (
              <div className="text-lg text-black">{profile.gst_id}</div>
            )}
          </div>
        </div>
        <div className="mb-8">
          <div className="font-semibold mb-2 text-black">Notification Preferences</div>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  checked={profile.notifications.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="accent-blue-600"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
        {/* Notifications Section */}
        <div className="mb-8">
          <div className="font-semibold mb-2 text-black">Your Notifications</div>
          <ul className="space-y-2">
            {mockNotifications.filter(n => profile.notifications.includes(n.category)).map((n, i) => (
              <li key={i} className="bg-blue-50 border border-blue-200 rounded px-4 py-2 text-black">{n.message}</li>
            ))}
            {mockNotifications.filter(n => profile.notifications.includes(n.category)).length === 0 && (
              <li className="text-gray-500">No notifications for your selected categories.</li>
            )}
          </ul>
        </div>
        {editing ? (
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition" onClick={handleSave}>Save</button>
        ) : (
          <button className="bg-gray-200 text-black px-6 py-2 rounded-lg font-semibold hover:bg-blue-100 transition" onClick={() => setEditing(true)}>Edit Profile</button>
        )}
      </div>
    </main>
  );
} 