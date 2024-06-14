import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubmissionByAssessment } from "../../services/assessment.service";

const initialState = {
  selectedAssignment: {},
  selectedAssignmentSubmission: {},
  submissions: [],
  loading: false,
  error: null,
};

export const fetchSubmissionsByAssessment = createAsyncThunk(
  "assignmentData/fetchSubmissionsByAssessment",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await getSubmissionByAssessment(id);
      return response.submissions?.studentsScores;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error || error.message);
    }
  }
);

const assignmentSlice = createSlice({
  name: "assignmentData",
  initialState,
  reducers: {
    setSelectedAssignment: (state, action) => {
      state.selectedAssignment = action.payload.assignment;
    },
    setSelectedAssignmentSubmission: (state, action) => {
      state.selectedAssignmentSubmission = action.payload.submission;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissionsByAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubmissionsByAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.submissions = action.payload;
        state.selectedAssignmentSubmission = state.submissions[0]?.submission || {};
      })
      .addCase(fetchSubmissionsByAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        setTimeout(() => {
          state.error = null;
        }, 3000);
      });
  },
});

export const { setSelectedAssignment, setSelectedAssignmentSubmission } =
  assignmentSlice.actions;
export default assignmentSlice.reducer;
