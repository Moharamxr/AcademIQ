import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAssignment: {},
  selectedAssignmentSubmission: {},
};

const assignmentSlice = createSlice({
  name: "assignmentData",
  initialState,
  reducers: {
    setSelectedAssignment: (state, action) => {
      const { assignment } = action.payload;
      state.selectedAssignment = assignment;
    },

    setSelectedAssignmentSubmission: (state, action) => {
      const { submission } = action.payload;
      state.selectedAssignmentSubmission = submission;
    },
  },
});

export const { setSelectedAssignment ,setSelectedAssignmentSubmission } = assignmentSlice.actions;
export default assignmentSlice.reducer;
