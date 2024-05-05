import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pic from "../../../assets/connect-teatcher (2).png";
import childPhoto from "../../../assets/connect-teatcher (2).png";
import { getUserById } from "../../../services/user.service";
const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});

  const getData = async () => {
    try {
      const data = await getUserById(id);
      setUserData(data.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    userData?.name && (
      <div className="bg-white p-2 rounded-xl w-full ">
        <div className="center flex-col  py-10 gap-2">
          <img
            src={childPhoto}
            alt="child photo"
            className="rounded-full w-44"
          />
          <p className="font-poppins font-light text-xl text-active  leading-8">
            {userData.name.first} {userData.name.last}
          </p>
        </div>
        <div className="flex flex-col gap-y-1 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Name:
              <span className="text-gray-600 text-base font-medium">
                {userData.name.first} {userData.name.last}
              </span>
            </p>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Role :
              <span className="text-gray-600 text-base font-medium">
                {userData.role}
              </span>
            </p>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Email:
              <span className="text-gray-600 text-base font-medium">
                {userData.email}
              </span>
            </p>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Username:
              <span className="text-gray-600 text-base font-medium">
                {userData.username}
              </span>
            </p>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              User Id:
              <span className="text-gray-600 text-base font-medium">
                {userData.userId}
              </span>
            </p>
          </div>
          {userData.role === "teacher" && (
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Department:
                <span className="text-gray-600 text-base font-medium">
                  {userData.department}
                </span>
              </p>
            </div>
          )}
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Gender:
              <span className="text-gray-600 text-base font-medium">
                {userData.gender}
              </span>
            </p>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Birthdate :
              <span className="text-gray-600 text-base font-medium">
                {userData.birthdate.slice(0, 10)}
              </span>
            </p>
          </div>
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              SSN :
              <span className="text-gray-600 text-base font-medium">
                {userData.ssn}
              </span>
            </p>
          </div>
          {userData.role !== "admin" && (
            <div className="flex gap-5 py-2 px-1">
              <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                Address :
                <span className="text-gray-600 text-base font-medium">
                  {userData.contactInformation?.address.street} ,
                  {userData.contactInformation?.address.city} ,
                  {userData.contactInformation?.address.state}
                </span>
              </p>
            </div>
          )}
          {(userData.role === "teacher" || userData.role === "student") &&
            userData?.courses.length > 0 && (
              <div className="flex gap-5 py-2 px-1">
                <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
                  Courses Ids:
                </p>
                <div className="flex gap-3">
                  {userData?.courses?.map((course, index) => (
                    <div className="center gap-1" key={index}>
                      <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400 bg-active-bg rounded-lg p-1 px-2">
                        <span className="text-gray-600 text-base font-medium">
                          {course.title}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          {userData.role === "student" && userData.parents.father && (
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Father :
              <span className="text-gray-600 text-base font-medium">
                {userData?.parents?.father?.email}
              </span>
            </p>
          )}
          {userData.role === "student" && userData.parents.mother && (
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Mother :
              <span className="text-gray-600 text-base font-medium">
                {userData?.parents?.mother?.email}
              </span>
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default UserProfile;
