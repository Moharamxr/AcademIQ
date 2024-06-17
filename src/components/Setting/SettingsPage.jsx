import React, { useEffect, useState, useCallback } from "react";
import { TextField, MenuItem, Skeleton, LinearProgress } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getUserById, updateUser } from "../../services/user.service";
import { resetPassword } from "../../services/auth.service";

const genders = ["male", "female"];
const roles = ["admin", "teacher", "student", "parent"];

const SettingsPage = () => {
  const id = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const getData = useCallback(async () => {
    try {
      const data = await getUserById(id);
      setUserData(data?.user);
      setProfilePic(data?.user?.profilePicture?.url || null);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch user data");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      try {
        const formData = new FormData();
        formData.append("profilePicture", file);
        await updateUser(id, formData);
      } catch (error) {
        console.error(error);
        setError("Failed to update profile picture");
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatingUser(true);

    try {
      await resetPassword({ oldPassword: oldPassword, password: newPassword });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.error || "Failed to update user data");
      setSuccess(false);
      setTimeout(() => setError(null), 3000);
    } finally {
      setUpdatingUser(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl w-full">
      <h2 className="font-poppins font-light text-2xl text-active leading-8 mb-4 py-3">
        SettingsPages
      </h2>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="center col-span-full">
            <div className="relative center ">
              {userData?.profilePicture?.url ? (
                <img
                  src={profilePic}
                  alt="profile-Pic"
                  className="w-40 h-40 rounded-full"
                />
              ) : (
                <div
                  className="w-40 h-40 text-white text-5xl rounded-full center mr-2 select-none"
                  style={{ backgroundColor: userData?.profilePicture?.color }}
                >
                  {(userData?.name.first?.charAt(0).toUpperCase() || "") +
                    (userData?.name.last?.charAt(0).toUpperCase() || "")}
                </div>
              )}
              <input
                accept="image/*"
                className="hidden"
                id="profile-pic-input"
                type="file"
                onChange={handleProfilePicChange}
              />
              <label
                htmlFor="profile-pic-input"
                className="absolute inset-0 bg-black bg-opacity-0 rounded-full flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                  <EditIcon style={{ color: "black" }} />
                </div>
              </label>
            </div>
          </div>

          <TextField
            label="First Name"
            name="first"
            value={userData?.name?.first || ""}
            disabled
          />
          <TextField
            label="Last Name"
            name="last"
            value={userData?.name?.last || ""}
            disabled
          />
          <TextField
            select
            label="Role"
            name="role"
            value={userData?.role || ""}
            disabled
            SelectProps={{ readOnly: true }}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
          {userData?.role === "teacher" && (
            <TextField
              label="Department"
              name="department"
              value={userData?.department || ""}
              disabled
            />
          )}
          <TextField
            label="Email"
            name="email"
            value={userData?.email || ""}
            disabled
          />
          <TextField
            label="Username"
            name="username"
            value={userData?.username || ""}
            disabled
          />
          <TextField
            label="User ID"
            name="userId"
            value={userData?.userId || ""}
            disabled
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={userData?.gender || ""}
            disabled
          >
            {genders.map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Birthdate"
            type="date"
            name="birthdate"
            value={userData?.birthdate?.slice(0, 10) || ""}
            InputLabelProps={{
              shrink: true,
            }}
            disabled
          />
          <TextField
            label="SSN"
            name="ssn"
            value={userData?.ssn || ""}
            disabled
          />
          <TextField
            label="phone"
            name="phone"
            type="number"
            value={userData?.contactInformation.phone || ""}
            disabled
          />

          <TextField
            label="Street"
            name="street"
            value={userData?.contactInformation?.address?.street || ""}
            disabled
          />
          <TextField
            label="City"
            name="city"
            value={userData?.contactInformation?.address?.city || ""}
            disabled
          />
          <TextField
            label="State"
            name="state"
            value={userData?.contactInformation?.address?.state || ""}
            disabled
          />
          <TextField
            label="Old Password"
            name="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <TextField
            label="New Password"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            className="outline-none bg-active rounded-lg text-white p-3 col-span-2"
            onClick={handleSubmit}
            disabled={updatingUser}
          >
            {updatingUser ? (
              <LinearProgress
                variant="buffer"
                value={0}
                valueBuffer={0}
                className="w-2/3 my-3"
              />
            ) : (
              "Reset Password"
            )}
          </button>
          {error && <div className="text-red-500 my-2">{error}</div>}
          {success && (
            <div className="text-green-500 my-2">
              Password updated successfully!
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SettingsPage;
