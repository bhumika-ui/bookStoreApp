import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const { authUser, token, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullname: authUser.fullname || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        address: authUser.address || "",
        avatar: authUser.avatar || "",
      });
    }
  }, [authUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        "http://localhost:3000/users/profile",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      login(res.data.user, token);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update Profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await axios.put(
        "http://localhost:3000/users/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  if (!authUser) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Please login to view profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pt-24 pb-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

        <div className="bg-base-100 rounded-lg shadow-xl p-6 mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="avatar placeholder mb-4">
              <div className="bg-pink-500 text-white rounded-full w-24 h-24 flex items-center justify-center">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="avatar"
                    className="rounded-full w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold">
                    {formData.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}
              </div>
            </div>
            {isEditing && (
              <input
                type="text"
                name="avatar"
                placeholder="Avatar URL"
                value={formData.avatar}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs mt-2"
              />
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Full Name</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                ) : (
                  <p className="py-2 px-3 bg-base-200 rounded">
                    {formData.fullname}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <p className="py-2 px-3 bg-base-200 rounded opacity-70">
                  {formData.email}
                </p>
                {isEditing && (
                  <span className="text-xs text-gray-500">
                    Email cannot be changed
                  </span>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Phone</span>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="input input-bordered w-full"
                  />
                ) : (
                  <p className="py-2 px-3 bg-base-200 rounded">
                    {formData.phone || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-semibold">Address</span>
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                ) : (
                  <p className="py-2 px-3 bg-base-200 rounded">
                    {formData.address || "Not provided"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              {isEditing && (
                <>
                  <button
                    type="submit"
                    className="btn bg-pink-500 hover:bg-pink-700 text-white flex-1"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline flex-1"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        fullname: authUser.fullname || "",
                        email: authUser.email || "",
                        phone: authUser.phone || "",
                        avatar: authUser.avatar || "",
                        address: authUser.address || "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>

          {!isEditing && (
            <button
              type="button"
              className="btn bg-pink-500 hover:bg-pink-700 text-white w-full mt-6"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="bg-base-100 rounded-lg shadow-xl p-6">
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            <h2 className="text-xl font-semibold">Change Password</h2>
            <span className="text-2xl">{showPasswordForm ? "-" : "+"}</span>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Current Password</span>
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Confirm New Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn bg-pink-500 hover:bg-pink-700 text-white w-full"
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 text-center text-sm opacity-70">
          <p>
            Member since:{" "}
            {new Date(authUser.createdAt || Date.now()).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
