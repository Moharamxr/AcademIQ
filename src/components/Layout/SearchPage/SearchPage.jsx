import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import Skeleton from "@mui/material/Skeleton";

// Styled components
const SearchPageContainer = styled.div`
  
  padding: 2rem;
  background-color: #fff;
  border-radius: 1rem;
`;

const SectionContainer = styled.div`
  margin-bottom: 2rem;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .user-name {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .user-email {
    font-size: 0.875rem;
    color: #666;
  }

  .user-role {
    font-size: 0.875rem;
    color: #333;
    margin-top: 0.5rem;
  }
`;

const GradeClassCard = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  background-color: #e9f5ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .class-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .class-details {
    font-size: 0.875rem;
    color: #333;
  }
`;

const CourseCard = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  background-color: #e9f5ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .course-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  .course-details {
    font-size: 0.875rem;
    color: #333;
  }
`;

// Skeleton component for loading state
const SkeletonUserCard = () => (
  <UserCard>
    <Skeleton variant="circular" width={50} height={50} />
    <div className="user-info w-full" style={{ marginLeft: "1rem" }}>
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="60%" height={20} />
      <Skeleton variant="text" width="40%" height={20} style={{ marginTop: "0.5rem" }} />
    </div>
  </UserCard>
);

const SkeletonGradeClassCard = () => (
  <GradeClassCard>
    <Skeleton variant="text" width="80%" height={24} />
    <Skeleton variant="text" width="90%" height={20} />
    <Skeleton variant="text" width="70%" height={20} />
  </GradeClassCard>
);

const SkeletonCourseCard = () => (
  <CourseCard>
    <Skeleton variant="text" width="80%" height={24} />
    <Skeleton variant="text" width="90%" height={20} />
    <Skeleton variant="text" width="70%" height={20} />
  </CourseCard>
);

// Main component
const SearchPage = () => {
  const searchData = useSelector((state) => state.searchData.searchData);
  const loading = useSelector((state) => state.searchData.loading);

  return (
    <SearchPageContainer className="w-full">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      
      {/* Users Section */}
      <SectionContainer className="max-h-[88vh] overflow-auto ">
        <h3 className="text-xl font-semibold mb-2">Users</h3>
        {loading ? (
          <>
            <SkeletonUserCard />
            <SkeletonUserCard />
            <SkeletonUserCard />
          </>
        ) : searchData?.users?.length > 0 ? (
          searchData.users.map((user) => (
            <UserCard key={user._id}>
              <img
                src={
                  user.profilePicture.url ||
                  `https://via.placeholder.com/50/${user.profilePicture.color.slice(
                    1
                  )}/FFFFFF?text=${user.name.first.charAt(
                    0
                  )}${user.name.last.charAt(0)}`
                }
                alt={`${user.name.first} ${user.name.last}`}
              />
              <div className="user-info">
                <span className="user-name">{`${user.name.first} ${user.name.last}`}</span>
                <span className="user-email">{user.email}</span>
                <span className="user-role">{`${
                  user.role.charAt(0).toUpperCase() + user.role.slice(1)
                }`}</span>
              </div>
            </UserCard>
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </SectionContainer>

      {/* Grade Classes Section */}
      <SectionContainer className="max-h-[88vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-2">Grade Classes</h3>
        {loading ? (
          <>
            <SkeletonGradeClassCard />
            <SkeletonGradeClassCard />
            <SkeletonGradeClassCard />
          </>
        ) : searchData?.gradeClasses?.length > 0 ? (
          searchData.gradeClasses.map((gradClass) => (
            <GradeClassCard key={gradClass._id}>
              <div className="class-title">Class {`${gradClass.level} ${gradClass.letter}`}</div>
              <div className="class-details">{`Level ${gradClass.level} - ${gradClass.letter}, Room: ${gradClass.room}`}</div>
            </GradeClassCard>
          ))
        ) : (
          <p className="text-gray-500">No grade classes found</p>
        )}
      </SectionContainer>

      {/* Courses Section */}
      <SectionContainer className="max-h-[88vh] overflow-auto">
        <h3 className="text-xl font-semibold mb-2">Courses</h3>
        {loading ? (
          <>
            <SkeletonCourseCard />
            <SkeletonCourseCard />
            <SkeletonCourseCard />
          </>
        ) : searchData?.courses?.length > 0 ? (
          searchData.courses.map((course) => (
            <CourseCard key={course._id}>
              <div className="course-title">{course.title}</div>
            </CourseCard>
          ))
        ) : (
          <p className="text-gray-500">No courses found</p>
        )}
      </SectionContainer>

      {/* Add more sections as needed */}
    </SearchPageContainer>
  );
};

export default SearchPage;
