import React from "react";
import Pic from "../../../assets/FirstChild.png";
const ChildProfile = ({ child }) => {
  return (
    <div className="flex flex-col gap-y-1 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Name :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.name?.first} {child?.name?.last}
          </span>
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Role :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.role}
          </span>
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Email :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.email}
          </span>
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Username :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.username}
          </span>
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          User Id :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.userId}
          </span>
        </p>
      </div>

      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Gender :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.gender}
          </span>
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Birthdate :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.birthdate?.slice(0, 10)}
          </span>
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          SSN :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.ssn}
          </span>
        </p>
      </div>
      <div className="flex gap-5 py-2 px-1">
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Address :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.contactInformation?.address?.street} ,
            {child?.contactInformation?.address?.city} ,
            {child?.contactInformation?.address?.state}
          </span>
        </p>
      </div>

      {child?.courses?.length > 0 && (
        <div className="flex gap-5 py-2 px-1">
          <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
            Courses Ids :{' '}
          </p>
          <div className="flex gap-3">
            {child?.courses?.map((course, index) => (
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
      {child?.parents?.father && (
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Father :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.parents?.father?.email}
          </span>
        </p>
      )}
      {child?.parents?.mother && (
        <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
          Mother :{' '}
          <span className="text-gray-600 text-base font-medium">
            {child?.parents?.mother?.email}
          </span>
        </p>
      )}
    </div>
  );
};

export default ChildProfile;
