import { atom } from "recoil";

/**
 * 🔥 IMPORTANT CHANGE
 * - Dummy JSON remove
 * - Default empty state
 * - Real data backend se aayega
 */

export const userData = atom({
  key: "userData",
  default: [],
});

export const filteredUserData = atom({
  key: "filteredUserData",
  default: [],
});

export const currentEmployeeState = atom({
  key: "currentEmployeeState",
  default: {
    _id: "",
    name: "",
    designation: "",
    bio: "",
    profilePicture: "",
    customerStatus: "Select Client Status",
    projectStatus: "Select Project Status",
    contactDetails: {
      email: "",
      phone: "",
    },
    profiles: {
      github: "",
      linkedIn: "",
    },
  },
});

export const showModalState = atom({
  key: "showModalState",
  default: false,
});
