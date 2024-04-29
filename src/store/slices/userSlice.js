import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: {
    first: "Ahmed",
    last: "Khaled",
  },
  contactInformation: {
    address: {
      street: "",
      city: "",
      state: "",
    },
    phone: "",
  },
  _id: "",
  userId: "",
  username: "",
  email: "",
  ssn: "",
  birthdate: "",
  gender: "",
  role: "",
  courses: [],
  children: [],
  department: "",
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { name, _id, userId, username, email, role, courses } =
        action.payload;
      state.name = name;
      state._id = _id;
      state.userId = userId;
      state.username = username;
      state.email = email;
      state.role = role;
      state.courses = courses;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
