import React from "react";
import SubmissionList from "./SubmissionList";
import SubmissionDetails from "./SubmissionDetails";
import { useSelector } from "react-redux";
import { setSelectedAssignmentSubmission } from "../../../store/slices/assignmentSlice";

const MarkAssignments = () => {
  // const { id } = useParams();
  // const [submissions, setSubmissions] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchSubmissions = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await getSubmissionByAssessment(id);
  //       setSubmissions(data?.submissions?.studentsScores || []);
  //       if (data?.submissions?.studentsScores?.length > 0) {
  //         dispatch(
  //           setSelectedAssignmentSubmission({
  //             submission: data?.submissions?.studentsScores[0]?.submission,
  //           })
  //         );
  //       }
  //     } catch (error) {
  //       setError("Failed to fetch submissions");
  //       setTimeout(() => {
  //         setError(null);
  //       }, 3000);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSubmissions();
  // }, [id]);
  return (
    <>
      <div className="w-full lg:w-8/12 flex flex-col gap-3">
        <SubmissionDetails />
      </div>
      <aside className="w-full lg:w-4/12  hidden md:block">
        <SubmissionList  />
      </aside>
    </>
  );
};

export default MarkAssignments;
