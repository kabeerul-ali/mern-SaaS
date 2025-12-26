import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { showModalState, userData } from "../../state";
import axios from "axios";

const UserForm = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [, setUserList] = useRecoilState(userData);
  const [showModal, setShowModal] = useRecoilState(showModalState);

  // 🔹 User data state
  const [newUser, setNewUser] = useState({
    name: "",
    designation: "",
    bio: "",
    contactDetails: {
      email: "",
      phone: "",
    },
    profiles: {
      github: "",
      linkedIn: "",
    },
  });

  // 🔹 Image file (REAL file, not base64)
  const [selectedFile, setSelectedFile] = useState(null);

  // 🔒 Close modal on backdrop click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.id === "modal-backdrop") {
        setShowModal(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () =>
      window.removeEventListener("click", handleClickOutside);
  }, [setShowModal]);

  // 🔹 File change handler
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // 🔒 Validation (ONLY required fields)
  const isValid = () => {
    return (
      newUser.name.trim() &&
      newUser.designation.trim() &&
      newUser.bio.trim() &&
      newUser.contactDetails.email.trim() &&
      newUser.contactDetails.phone.trim() &&
      newUser.profiles.github.trim() &&
      newUser.profiles.linkedIn.trim()
    );
  };

  // 🔥 Submit handler (Cloudinary compatible)
  const handleSubmit = async () => {
    if (!isValid()) {
      alert("Please fill all fields");
      return;
    }

    try {
      const formData = new FormData();

      // 🔹 Append primitive fields
      formData.append("name", newUser.name);
      formData.append("designation", newUser.designation);
      formData.append("bio", newUser.bio);

      // 🔹 Defaults for workflow fields
      formData.append(
        "customerStatus",
        "Work Agreement Signed"
      );
      formData.append(
        "projectStatus",
        "Project Assigned"
      );

      // 🔹 Append nested objects as JSON
      formData.append(
        "contactDetails",
        JSON.stringify(newUser.contactDetails)
      );
      formData.append(
        "profiles",
        JSON.stringify(newUser.profiles)
      );

      // 🔹 Append image file
      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }

      // 🔥 POST request
      const res = await axios.post(BASE_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        // 🔁 Refresh users list
        const refreshed = await axios.get(BASE_URL);
        const users = refreshed.data.customers.map((el) => ({
          ...el,
          contactDetails: {
            ...el.contactDetails,
            phone: el.contactDetails.phone.toString(),
          },
        }));

        setUserList(users);
        setShowModal(false);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    }
  };

  if (!showModal) return null;

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
    >
      <div className="bg-[#151515] p-8 rounded-lg max-w-2xl w-full mx-4 border border-[#2ECC71]">
        <h2 className="text-2xl mb-4">Create New User</h2>

        <div className="space-y-4">
          <input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
            className="w-full bg-[#090909] border border-[#2ECC71] px-3 py-1 rounded-lg"
          />

          <input
            placeholder="Designation"
            value={newUser.designation}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                designation: e.target.value,
              })
            }
            className="w-full bg-[#090909] border border-[#2ECC71] px-3 py-1 rounded-lg"
          />

          <textarea
            placeholder="Bio"
            value={newUser.bio}
            onChange={(e) =>
              setNewUser({ ...newUser, bio: e.target.value })
            }
            className="w-full bg-[#090909] border border-[#2ECC71] px-3 py-1 rounded-lg"
          />

          <input
            placeholder="Email"
            value={newUser.contactDetails.email}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                contactDetails: {
                  ...newUser.contactDetails,
                  email: e.target.value,
                },
              })
            }
            className="w-full bg-[#090909] border border-[#2ECC71] px-3 py-1 rounded-lg"
          />

          <input
            placeholder="Phone"
            value={newUser.contactDetails.phone}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                contactDetails: {
                  ...newUser.contactDetails,
                  phone: e.target.value,
                },
              })
            }
            className="w-full bg-[#090909] border border-[#2ECC71] px-3 py-1 rounded-lg"
          />

          <input
            placeholder="GitHub"
            value={newUser.profiles.github}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                profiles: {
                  ...newUser.profiles,
                  github: e.target.value,
                },
              })
            }
            className="w-full bg-[#090909] border border-[#2ECC71] px-3 py-1 rounded-lg"
          />

          <input
            placeholder="LinkedIn"
            value={newUser.profiles.linkedIn}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                profiles: {
                  ...newUser.profiles,
                  linkedIn: e.target.value,
                },
              })
            }
            className="w-full bg-[#090909] border border-[#2ECC71] px-3 py-1 rounded-lg"
          />

          <input type="file" onChange={handleFileInputChange} />

          <div className="flex justify-end gap-4">
            <button
              onClick={handleSubmit}
              className="border border-[#2ECC71] px-4 py-2 rounded-lg"
            >
              Submit
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="border border-[#2ECC71] px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
