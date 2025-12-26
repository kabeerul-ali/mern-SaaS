import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    designation: String,
    bio: String,
    profilePicture: String,

    customerStatus: String,
    projectStatus: String,

    contactDetails: {
      email: String,
      phone: String,
    },

    profiles: {
      github: String,
      linkedIn: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
