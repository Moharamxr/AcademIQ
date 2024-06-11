import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { TextField, MenuItem, Skeleton, LinearProgress } from "@mui/material";
import { getUserById, updateUser } from "../../services/user.service";

const genders = ["male", "female"];
const roles = ["admin", "teacher", "student", "parent"];

const UpdateUserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const getData = useCallback(async () => {
    try {
      const data = await getUserById(id);
      setUserData(data?.user);
    } catch (error) {
      console?.error(error);
      setError("Failed to fetch user data");
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBDChange = (e) => {
    const { value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      birthdate: value.slice(0, 10),
    }));
  };

  const handleNestedChange = (e, field, nestedField) => {
    const { value } = e.target;
    if (field === "contactInformation") {
      setUserData((prevData) => ({
        ...prevData,
        contactInformation: {
          ...prevData.contactInformation,
          address: {
            ...prevData.contactInformation.address,
            [nestedField]: value,
          },
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [nestedField]: value,
        },
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setUserData((prevData) => ({
        ...prevData,
        contactInformation: {
            ...prevData.contactInformation,
            phone: value,
        },
    }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdatingUser(true);
    const formattedUserData = {
      ...userData,
      birthdate: userData.birthdate.slice(0, 10),
    };
    console.log("formattedUserData", formattedUserData);

    try {
      await updateUser(id, formattedUserData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setError(null);
    } catch (error) {
      console?.error(error);
      setError("Failed to update user data");
      setSuccess(false);
      setTimeout(() => setError(null), 3000);
    } finally {
      setUpdatingUser(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl w-full">
      <h2 className="font-poppins font-light text-2xl text-active leading-8 mb-4 py-3">
        Update User Profile
      </h2>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={300} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <TextField
            label="First Name"
            name="first"
            value={userData?.name?.first || ""}
            onChange={(e) => handleNestedChange(e, "name", "first")}
            required
          />
          <TextField
            label="Last Name"
            name="last"
            value={userData?.name?.last || ""}
            onChange={(e) => handleNestedChange(e, "name", "last")}
            required
          />
          <TextField
            select
            label="Role"
            name="role"
            value={userData?.role || ""}
            onChange={handleChange}
            required
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
              onChange={handleChange}
              required
            />
          )}
          <TextField
            label="Email"
            name="email"
            value={userData?.email || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Username"
            name="username"
            value={userData?.username || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="User ID"
            name="userId"
            value={userData?.userId || ""}
            onChange={handleChange}
            required
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={userData?.gender || ""}
            onChange={handleChange}
            required
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
            onChange={handleBDChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            label="SSN"
            name="ssn"
            value={userData?.ssn || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="phone"
            name="phone"
            type="number"
            value={userData?.contactInformation.phone || ""}
             onChange={handlePhoneChange}
            required
          />

          <TextField
            label="Street"
            name="street"
            value={userData?.contactInformation?.address?.street || ""}
            onChange={(e) =>
              handleNestedChange(e, "contactInformation", "street")
            }
            required
          />
          <TextField
            label="City"
            name="city"
            value={userData?.contactInformation?.address?.city || ""}
            onChange={(e) =>
              handleNestedChange(e, "contactInformation", "city")
            }
            required
          />
          <TextField
            label="State"
            name="state"
            value={userData?.contactInformation?.address?.state || ""}
            onChange={(e) =>
              handleNestedChange(e, "contactInformation", "state")
            }
            required
          />

          {error && (
            <p className="text-red-500 text-center font-medium col-span-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 text-center font-medium col-span-2">
              User updated successfully!
            </p>
          )}
          <button
            className="outline-none bg-active rounded-lg text-white p-3 col-span-2"
            type="submit"
          >
            {updatingUser ? (
              <LinearProgress
                variant="buffer"
                value={0}
                valueBuffer={0}
                className="w-2/3 my-3"
              />
            ) : (
              "Update"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateUserProfile;
