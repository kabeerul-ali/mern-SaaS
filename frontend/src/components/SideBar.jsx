import { useRecoilState } from "recoil";
import {
  userData,
  filteredUserData,
  currentEmployeeState,
} from "../state";
import { useEffect } from "react";
import SearchBar from "./SearchBar";
import NewUser from "./newUser/NewUserCreation";
import UserCard from "./user/UserCard";
import logo from "../../src/assets/logo.png";
import axios from "axios";

const SideBar = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [userList, setUserList] = useRecoilState(userData);
  const [filteredData, setFilteredData] =
    useRecoilState(filteredUserData);
  const [currentEmployee, setCurrentEmployee] =
    useRecoilState(currentEmployeeState);

  // 🔥 FETCH USERS (ONCE)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(BASE_URL);
        if (response.status === 200) {
          const users = response.data.customers.map((el) => ({
            ...el,
            contactDetails: {
              ...el.contactDetails,
              phone: el.contactDetails.phone.toString(),
            },
          }));

          setUserList(users);
          setFilteredData(users);

          // 🔥 Auto select first user
          if (users.length > 0) {
            setCurrentEmployee(users[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // ❗ IMPORTANT: empty dependency array

  return (
    <div>
      {/* Logo */}
      <div className="pl-7">
        <img
          src={logo}
          alt="No img"
          className="w-24 h-24 rounded-xl my-4"
        />
        <div className="mb-4 ml-1">
          <div className="text-4xl font-semibold">Voltona CRM</div>
          <div className="font-light py-2">
            Tool for enhanced creator relationship management
          </div>
        </div>
      </div>

      {/* Search */}
      <SearchBar />

      {/* User List */}
      {filteredData.map((user) => (
        <UserCard
          key={user._id}
          id={user._id}
          name={user.name}
          profilePicture={user.profilePicture}
        />
      ))}

      {/* Create User */}
      <NewUser />
    </div>
  );
};

export default SideBar;
