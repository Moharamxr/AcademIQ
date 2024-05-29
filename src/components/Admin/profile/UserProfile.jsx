import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { getUserById } from "../../../services/user.service";
import AddNewChild from "../Parents/AddNewChild";
import { AddCircle } from "@mui/icons-material";

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [initials, setInitials] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  const getData = async () => {
    try {
      const data = await getUserById(id);
      setUserData(data?.user);
      const firstName = data?.user?.name?.first;
      const lastName = data?.user?.name?.last;
      const initials =
        (firstName?.charAt(0).toUpperCase() || "") +
        (lastName?.charAt(0).toUpperCase() || "");
      setInitials(initials);
      setBgColor(data?.user?.profilePicture?.color);
    } catch (error) {
      console?.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [assignChildModal, setAssignChildModal] = useState(false);
  const handleOpenChildModal = () => {
    setAssignChildModal(true);
  };

  const handleCloseChildModal = () => {
    setAssignChildModal(false);
  };

  return (
    <div className="bg-white p-2 rounded-xl w-full ">
      <div className="center flex-col  py-10 gap-2">
        {loading ? (
          <Skeleton variant="circular" width={160} height={160} />
        ) : userData?.profilePicture?.url ? (
          <img
            src={userData?.profilePicture?.url}
            alt="profile-Pic"
            className="w-40 h-40 rounded-full"
          />
        ) : (
          <div
            className="w-40 h-40 text-white text-7xl rounded-full center mr-2 select-none"
            style={{ backgroundColor: bgColor }}
          >
            {initials}
          </div>
        )}
        <p className="font-poppins font-light text-xl text-active leading-8">
          {loading ? (
            <Skeleton width={150} />
          ) : (
            `${userData?.name?.first} ${userData?.name?.last}`
          )}
        </p>
      </div>
      <div className="flex flex-col gap-y-1 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
        {[
          {
            label: "Name",
            value: `${userData?.name?.first} ${userData?.name?.last}`,
          },
          { label: "Role", value: userData?.role },
          { label: "Email", value: userData?.email },
          { label: "Username", value: userData?.username },
          { label: "User Id", value: userData?.userId },
          ...(userData?.role === "teacher"
            ? [{ label: "Department", value: userData?.department }]
            : []),
          { label: "Gender", value: userData?.gender },
          { label: "Birthdate", value: userData?.birthdate?.slice(0, 10) },
          { label: "SSN", value: userData?.ssn },
          ...(userData?.role !== "admin"
            ? [
                {
                  label: "Address",
                  value: `${userData?.contactInformation?.address?.street}, ${userData?.contactInformation?.address?.city}, ${userData?.contactInformation?.address?.state}`,
                },
              ]
            : []),
        ].map((item, index) => (
          <div className="flex gap-5 py-2 px-1" key={index}>
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              {item.label} :{" "}
              {loading ? (
                <Skeleton width={100} />
              ) : (
                <span className="text-gray-600 text-base font-medium">
                  {item.value}
                </span>
              )}
            </p>
          </div>
        ))}
        {userData?.role === "student" && userData?.parents?.father && (
          <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
            Father :{" "}
            <span className="text-gray-600 text-base font-medium">
              {loading ? (
                <Skeleton width={100} />
              ) : (
                userData?.parents?.father?.email
              )}
            </span>
          </p>
        )}
        {userData?.role === "student" && userData?.parents?.mother && (
          <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
            Mother :{" "}
            <span className="text-gray-600 text-base font-medium">
              {loading ? (
                <Skeleton width={100} />
              ) : (
                userData?.parents?.mother?.email
              )}
            </span>
          </p>
        )}
        {(userData?.role === "teacher" || userData?.role === "student") &&
          userData?.courses?.length > 0 && (
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400 pt-1">
                Courses Ids:
              </p>
              <div className="flex gap-3">
                {loading
                  ? [1, 2, 3].map((index) => (
                      <Skeleton
                        key={index}
                        variant="rectangular"
                        width={60}
                        height={30}
                      />
                    ))
                  : userData?.courses?.map((course, index) => (
                      <div className="center gap-1" key={index}>
                        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400 bg-active-bg rounded-lg p-1 px-2">
                          <span className="text-gray-600 text-base font-medium">
                            {course?.title}
                          </span>
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          )}

        {userData?.role === 'parent' && <div className="flex  gap-2 py-4 px-1 w-full">
          <p className=" min-w-fit font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400 pt-2">
            Children :
          </p>

          <div className=" flex flex-wrap gap-4 w-full">
            {userData?.children?.length > 0 ? (
              userData?.children?.map((s, index) => (
                <p
                  key={index}
                  className="font-poppins font-normal sm:text-sm text-xs p-1 leading-6 text-gray-400"
                >
                  <span className="text-gray-600 text-base font-medium bg-active-bg rounded-lg p-2">
                    {/* {s?.name?.first} {s?.name?.last} */}
                    {s?.email}
                  </span>
                </p>
              ))
            ) : (
              <p className="font-poppins font-normal sm:text-sm text-xs p-1 leading-6 text-gray-400">
                <span className="text-gray-600 text-base font-medium bg-active-bg rounded-lg p-2">
                  No Children
                </span>
              </p>
            )}
            {role === "admin" && userData?.role === "parent" && (
              <>
                <span onClick={handleOpenChildModal}>
                  <AddCircle color="action" className="cursor-pointer mt-1" />
                </span>
                <AddNewChild
                  currentChildren={userData?.children}
                  parentId={id}
                  parentGender={userData?.gender}
                  isOpen={assignChildModal}
                  onClose={handleCloseChildModal}
                  getData={getData}
                />
              </>
            )}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default UserProfile;
