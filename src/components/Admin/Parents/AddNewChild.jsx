import React, { useEffect, useState } from "react";
import {
  assignChildToParent,
  createUser,
  removeChildFromParent,
} from "../../../services/user.service";
import styled from "@emotion/styled";
import {
  getGradeClassStudents,
  getGradeClasses,
} from "../../../services/gradClass.service";
import { CircularProgress } from "@mui/material";

const ListContainer = styled("div")({
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "0",
    background: "transparent",
  },
});

const AddNewChild = ({
  isOpen,
  onClose,
  currentChildren,
  parentId,
  getData,
  parentGender,
}) => {
  const [newParentData, setNewParentData] = useState({
    children: [],
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isStudentsLoading, setIsStudentsLoading] = useState(false);

  const [selectedGradeClassId, setSelectedGradeClassId] = useState("");
  const [gradClasses, setGradeClasses] = useState([]);
  const [isGradeClassesLoading, setIsGradeClassesLoading] = useState(false);

  const handleGradeClassChange = (e) => {
    setSelectedGradeClassId(e.target.value);
  };

  const fetchGradeClasses = async () => {
    if (!isOpen) return;
    setIsGradeClassesLoading(true);
    try {
      const data = await getGradeClasses();
      setGradeClasses(data.gradeClasses);
    } catch (error) {
      console.error(error);
    }
    setIsGradeClassesLoading(false);
  };

  useEffect(() => {
    fetchGradeClasses();
  }, [isOpen]);

  const fetchStudents = async () => {
    setIsStudentsLoading(true);
    try {
      const data = await getGradeClassStudents(selectedGradeClassId, false);
      const students = data?.students.filter(
        (student) =>
          (parentGender === "male" && student.parents.fatherId === null) ||
          (parentGender === "female" && student.parents.motherId === null)
      );
      setStudents(students);
    } catch (error) {
      console.error(error);
    }
    setIsStudentsLoading(false);
  };

  useEffect(() => {
    if (selectedGradeClassId !== "") {
      fetchStudents();
    }
  }, [selectedGradeClassId]);

  useEffect(() => {
    setNewParentData((prevState) => ({
      ...prevState,
      children: currentChildren?.map((child) => child._id),
    }));
  }, [currentChildren]);

  const [error, setError] = useState("");

  const handleStudentsChange = (e) => {
    if (parentGender === "") {
      setError("Select the gender first");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }
    const selectedStudentId = e.target.value;
    if (newParentData.children.includes(selectedStudentId)) {
      setError("Child is already assigned");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    setSelectedChild(selectedStudentId);
  };
  const [isRemoving, setIsRemoving] = useState(false);
  const [removingChild, setRemovingChild] = useState("");

  const handleRemoveStudent = async (childId) => {
    setIsRemoving(true);
    setRemovingChild(childId);
    await removeChildFromParent(childId, parentId);
    setRemovingChild("");
    getData();
    setIsRemoving(false);
  };

  const reset = () => {
    setNewParentData({
      children: [],
    });
    setSelectedChild(null);
    setSelectedGradeClassId("");
    setGradeClasses([]);
    setStudents([]);
    setError("");
  };

  const isValidate = () => {
    if (selectedChild === "" || selectedChild === null) {
      setError("Add at least one child");
      setTimeout(() => {
        setError("");
      }, 3000);
      return false;
    }
    return true;
  };

  const closeModel = () => {
    reset();
    onClose();
  };

  const handleAddNewChild = async () => {
    const isValid = isValidate();
    if (!isValid) {
      return;
    }
    setSubmitLoading(true);
    try {
      await assignChildToParent(selectedChild, parentId);
      getData();
      setSubmitLoading(false);
      setSelectedChild("");
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("Something went wrong");
      }
      setSubmitLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-600 bg-opacity-50">
        <ListContainer className="bg-white rounded-xl p-5 w-2/3 max-h-[95vh]">
          <h2 className="font-poppins text-2xl font-medium">
            Assign New Child
          </h2>
          {error && (
            <p className="bg-red-200 text-red-700 p-2 rounded-lg text-sm text-center ">
              {error}
            </p>
          )}
          <div className="between flex flex-col md:flex-row py-4 md:gap-10 ">
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Classes" className="text-active">
                Children Classes
              </label>
              <select
                name="Classes"
                id="Classes"
                className="bg-gray-100 text-gray-500 text-sm p-2 rounded-lg outline-none"
                onChange={handleGradeClassChange}
                value={selectedGradeClassId}
              >
                <option value="">select</option>
                {!isGradeClassesLoading ? (
                  gradClasses?.map((cl, index) => (
                    <option key={index} value={cl._id}>
                      Class {cl.letter} {cl.level}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    loading...
                  </option>
                )}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/2">
              <label htmlFor="Children" className="text-active">
                Children
              </label>
              <select
                name="Children"
                id="Children"
                className="bg-gray-100 text-gray-500 text-sm p-2 rounded-lg outline-none"
                onChange={handleStudentsChange}
                value={selectedChild || ""}
              >
                <option value="">select</option>
                {!isStudentsLoading ? (
                  students.length > 0 ? (
                    students.map((stu, index) => (
                      <option key={index} value={stu._id}>
                        {stu.name.first} {stu.name.last}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No available students in this class
                    </option>
                  )
                ) : (
                  <option value="" disabled>
                    loading...
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full mt-5">
            <label htmlFor="CurrentChildren" className="text-active">
              Current Children
            </label>
            <div className="grid grid-cols-4 gap-2 col-span-1">
              {currentChildren.length > 0 ? (
                currentChildren.map((child, index) => (
                  <span
                    key={index}
                    className="col-span-1 p-1 bg-active-bg text-center rounded-lg cursor-pointer"
                    onClick={() => handleRemoveStudent(child._id)}
                  >
                    {isRemoving && removingChild === child._id ? (
                      <CircularProgress size={16} />
                    ) : (
                      child.name.first + child.name.last
                    )}
                  </span>
                ))
              ) : (
                <span className="col-span-1 p-1 bg-gray-100 text-gray-500 text-center rounded-lg cursor-pointer">
                  No children assigned
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full mt-5">
            <label htmlFor="SelectedChild" className="text-active">
              Selected Child
            </label>
            {selectedChild ? (
              <div className="p-2 bg-active-bg w-1/3  rounded-lg cursor-pointer">
                {
                  students.find((student) => student._id === selectedChild)
                    ?.name?.first
                }{" "}
                {
                  students.find((student) => student._id === selectedChild)
                    ?.name?.last
                }
                <button
                  className="ml-2 text-red-500"
                  onClick={() => setSelectedChild("")}
                >
                  Remove
                </button>
              </div>
            ) : (
              <span className="p-2 bg-gray-100 text-gray-500 text-center rounded-lg cursor-pointer">
                No child selected
              </span>
            )}
          </div>
          <div className="between pt-8 pb-4">
            <button
              className="w-64 bg-active rounded-lg p-3 text-center text-white"
              onClick={handleAddNewChild}
              disabled={submitLoading}
            >
              {submitLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                "Add New Child"
              )}
            </button>
            <button
              className="w-64 bg-white border-2 border-active-br rounded-lg p-3 text-center text-active"
              onClick={closeModel}
            >
              Cancel
            </button>
          </div>
        </ListContainer>
      </div>
    )
  );
};

export default AddNewChild;
