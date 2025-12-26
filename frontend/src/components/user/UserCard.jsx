import sample from "../../../src/assets/sample-profile.jpg";
import {
  currentEmployeeState,
  userData,
  filteredUserData,
} from "../../state";
import { useRecoilState } from "recoil";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const UserCard = ({ name, id, profilePicture }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [userList, setUserList] = useRecoilState(userData);
  const [, setFilteredData] = useRecoilState(filteredUserData);
  const [currentEmployee, setCurrentEmployee] =
    useRecoilState(currentEmployeeState);

  // 🔹 Select user
  const handleSelect = () => {
    const selected = userList.find((u) => u._id === id);
    if (selected) {
      setCurrentEmployee(selected);
    }
  };

  // 🔥 Delete user (MongoDB)
  const handleDelete = async () => {
    // ❌ Prevent deleting selected user
    if (currentEmployee?._id === id) {
      alert("Selected user cannot be deleted");
      return;
    }

    try {
      const res = await axios.delete(`${BASE_URL}${id}`);
      if (res.status === 200) {
        const updated = userList.filter((u) => u._id !== id);

        setUserList(updated);
        setFilteredData(updated);

        // Auto select first user if exists
        if (updated.length > 0) {
          setCurrentEmployee(updated[0]);
        } else {
          setCurrentEmployee({
            _id: "",
            name: "",
            designation: "",
            bio: "",
            profilePicture: "",
            customerStatus: "",
            projectStatus: "",
            contactDetails: { email: "", phone: "" },
            profiles: { github: "", linkedIn: "" },
          });
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex items-center gap-5 w-full py-4 pl-7 cursor-pointer border-b border-gray-400 hover:text-lg"
        onClick={handleSelect}
      >
        <img
          src={profilePicture || sample}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <p className="font-bold">{name}</p>
        </div>
      </div>

      <div
        className="absolute top-0 right-0 px-5 pb-1 pt-3 cursor-pointer hover:text-[#2ECC71]"
        onClick={handleDelete}
      >
        <FaTimes />
      </div>
    </div>
  );
};

export default UserCard;
