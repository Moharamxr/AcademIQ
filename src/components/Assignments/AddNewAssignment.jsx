import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Modal, Box, Button, TextField } from "@mui/material";
import {
  addMaterialsToAssessment,
  createAssessment,
  updateAssessment,
} from "../../services/assessment.service";
import { useParams } from "react-router-dom";
import { getGradeCourses } from "../../services/courses.service";
import AddPostIcon from "../../assets/icons/AddPostIcon";

const FormContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 24px;
  width: 600px;
  margin: auto;
  margin-top: 5%;
`;

const FullWidthGridItem = styled(Box)`
  grid-column: span 2;
`;

const AddNewAssignment = ({ fetchAssignments }) => {
  const [open, setOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    duration: "",
    description: "",
    courseId: "",
    startDate: "",
    endDate: "",
    score: "",
  });
  const [assignmentMaterials, setAssignmentMaterials] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);

  const fetchCourses = async () => {
    setIsCoursesLoading(true);
    try {
      const data = await getGradeCourses();
      setCourses(data?.courses);
    } catch (error) {
      // console.error("Error occurred while fetching courses:", error);
    } finally {
      setIsCoursesLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({
      ...newAssignment,
      [name]: value,
    });
  };

  const handleFilesChange = (e) => {
    const files = e.target.files;
    setAssignmentMaterials(files);
  };

  const reset = () => {
    setNewAssignment({
      title: "",
      duration: "",
      description: "",
      courseId: "",
      startDate: "",
      endDate: "",
      score: "",
    });
    setAssignmentMaterials([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newAssignment);
    const filesData = new FormData();
    for (let i = 0; i < assignmentMaterials.length; i++) {
      filesData.append("materials", assignmentMaterials[i]);
    }
    setIsSubmitting(true);
    try {
      const data = await createAssessment({ type: "assignment" });
      await updateAssessment(data?.assessment._id, newAssignment);
      await addMaterialsToAssessment(data?.assessment._id, filesData);
      fetchAssignments();
      reset();
    } catch (error) {
      // console.error("Error occurred while adding new assignment:", error);
    } finally {
      setIsSubmitting(false);
      handleClose();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
          
        onClick={handleOpen}
      >
        <AddPostIcon />
      </button>

      <Modal open={open} onClose={handleClose}>
        <FormContainer component="form" onSubmit={handleSubmit}>
          <FullWidthGridItem>
            <h2 className="text-xl font-semibold text-active">
              Add New Assignment
            </h2>
          </FullWidthGridItem>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Title"
            name="title"
            value={newAssignment.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Duration (minutes)"
            type="number"
            name="duration"
            value={newAssignment.duration}
            onChange={handleChange}
            required
          />
          <FullWidthGridItem>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="Description"
              name="description"
              value={newAssignment.description}
              onChange={handleChange}
              required
            />
          </FullWidthGridItem>
          <select
            name="courseId"
            value={newAssignment.courseId}
            onChange={handleChange}
            className="w-full bg-white border border-gray-200 rounded h-14 hover:border-black p-2 ps-1 font-normal mt-2"
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            {isCoursesLoading ? (
              <option value="" disabled>
                Loading courses...
              </option>
            ) : (
              courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))
            )}
          </select>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Start Date"
            type="datetime-local"
            name="startDate"
            InputLabelProps={{ shrink: true }}
            value={newAssignment.startDate}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="End Date"
            type="datetime-local"
            name="endDate"
            InputLabelProps={{ shrink: true }}
            value={newAssignment.endDate}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="Score"
            type="number"
            name="score"
            value={newAssignment.score}
            onChange={handleChange}
            required
          />
          <FullWidthGridItem>
            <input
              type="file"
              name="materials"
              className="bg-white border-2 hover:border-gray-500 rounded p-3 w-full"
              multiple
              onChange={handleFilesChange}
            />
          </FullWidthGridItem>
          <FullWidthGridItem>
            <button
              type="submit"
              className="bg-active text-white font-medium py-2 px-4 rounded"
            >
              {isSubmitting ? "Adding..." : "Add Assignment"}
            </button>
          </FullWidthGridItem>
        </FormContainer>
      </Modal>
    </div>
  );
};

export default AddNewAssignment;
