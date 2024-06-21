import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  examSubmission: {
    studentId: "",
    examId: "",
    answers: [],
  },
};

const examSlice = createSlice({
  name: "examData",
  initialState,
  reducers: {
    setStudentAnswers: (state, action) => {
      const { studentId, examId, questionId, optionId } = action.payload;

      if (
        state.examSubmission.studentId !== studentId ||
        state.examSubmission.examId !== examId
      ) {
        state.examSubmission = { studentId, examId, answers: [] };
      }

      const existingAnswerIndex = state.examSubmission.answers.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (existingAnswerIndex !== -1) {
        state.examSubmission.answers = state.examSubmission.answers.map(
          (answer, index) =>
            index === existingAnswerIndex ? { ...answer, optionId } : answer
        );
      } else {
        state.examSubmission.answers = [
          ...state.examSubmission.answers,
          { questionId, optionId },
        ];
      }
    },
    resetState: (state) => {
      state.examSubmission = initialState.examSubmission;
    },
  },
});

export const { setStudentAnswers ,resetState  } = examSlice.actions;
export default examSlice.reducer;
