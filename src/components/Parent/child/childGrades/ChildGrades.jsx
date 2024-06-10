import React, { useEffect, useState } from "react";
import { getSubmissionsByStudent } from "../../../../services/assessment.service";
import { useParams } from "react-router-dom";
import { BiLoader } from "react-icons/bi";
import { Skeleton } from "@mui/material";

const ChildGrades = () => {
  const { childID } = useParams();
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGrades = async () => {
    setLoading(true);
    try {
      const data = await getSubmissionsByStudent(childID);
      // Ensure that data is an array before setting it
      if (Array.isArray(data)) {
        setGrades(data);
      } else {
        setGrades([]);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGrades();
  }, [childID]);

    if (loading) {
      return (
        <>
  <Skeleton height={100} />
  <Skeleton height={100} />
  <Skeleton height={100} />
  <Skeleton height={100} />
  <Skeleton height={100} />
</>
      );
    }
  //   if (error) {
  //     return (
  //       <div className="text-red-500 text-center font-medium">
  //         Error: {error?.message}
  //       </div>
  //     );
  //   }
    if (grades.length === 0) {
      return (
        <div className="text-center text-gray-400 pt-5">No grades found.</div>
      );
    }

  return (
    <div className="flex flex-col pb-2  w-full bg-white">
      {!loading &&
        grades?.map((grade) => (
          <div key={grade?._id} className="bg-white p-2 rounded-xl w-full">
            <div className="flex flex-row justify-between">
              <p className="font-poppins font-light text-lg text-active">
                {grade?.assessment?.title}
              </p>
              <p className="font-poppins font-light text-lg text-active">
                {grade?.grade}
              </p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default ChildGrades;
