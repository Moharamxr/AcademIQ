import { Skeleton } from "@mui/material";
import React from "react";

const ChildProfile = ({ child, isLoading }) => {
  const renderField = (label, value, width = 100) => (
    <div className="flex gap-5 py-2 px-1">
      <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
        {label}:{" "}
        <span className="text-gray-600 text-base font-medium">
          {isLoading ? <Skeleton width={width} /> : value}
        </span>
      </p>
    </div>
  );

  return (
    <div className="flex flex-col gap-y-1 divide-y-2 divide-gray-100 bg-white rounded-lg p-3">
      {renderField("Name", `${child?.name?.first} ${child?.name?.last}`, 100)}
      {renderField("Role", child?.role, 100)}
      {renderField("Email", child?.email, 150)}
      {renderField("Username", child?.username, 100)}
      {renderField("User Id", child?.userId, 100)}
      {renderField(
        "Class",
        child?.gradeClass?.letter + " " + child?.gradeClass?.level,
        100
      )}
      {renderField(
        "Class Location",
        child?.gradeClass?.room,
        100
      )}
      {renderField("Gender", child?.gender, 100)}
      {renderField("Birthdate", child?.birthdate?.slice(0, 10), 100)}
      {renderField("SSN", child?.ssn, 150)}
      {renderField(
        "Address",
        `${child?.contactInformation?.address?.street}, ${child?.contactInformation?.address?.city}, ${child?.contactInformation?.address?.state}`,
        200
      )}

      {isLoading ? (
        <div className="flex gap-5 py-2 px-1">
          <Skeleton width={150} height={30} />
          <Skeleton width={150} height={30} />
        </div>
      ) : (
        child?.courses?.length > 0 && (
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Courses Ids:{" "}
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
        )
      )}

      {isLoading ? (
        <div className="flex gap-5 py-2 px-1">
          <Skeleton width={200} />
        </div>
      ) : (
        child?.parents?.father && (
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Father:{" "}
              <span className="text-gray-600 text-base font-medium">
                {child?.parents?.father?.email}
              </span>
            </p>
          </div>
        )
      )}

      {isLoading ? (
        <div className="flex gap-5 py-2 px-1">
          <Skeleton width={200} />
        </div>
      ) : (
        child?.parents?.mother && (
          <div className="flex gap-5 py-2 px-1">
            <p className="font-poppins font-normal sm:text-sm text-xs leading-6 text-gray-400">
              Mother:{" "}
              <span className="text-gray-600 text-base font-medium">
                {child?.parents?.mother?.email}
              </span>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ChildProfile;
