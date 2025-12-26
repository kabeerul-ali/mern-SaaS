import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { AiOutlineSearch } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { currentEmployeeState } from "../../state";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const ProjectStatus = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [projectStatusList, setProjectStatusList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] =
    useRecoilState(currentEmployeeState);

  // 🔥 Fetch project status options from backend
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/status/project`);
        setProjectStatusList(res.data);
      } catch (error) {
        console.error("Error fetching project status", error);
      }
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [currentEmployee]);

  const handleProjectStatusChange = async (newStatus) => {
    if (!currentEmployee || !currentEmployee._id) return;

    const updatedEmployee = {
      ...currentEmployee,
      projectStatus: newStatus,
    };

    try {
      await axios.patch(`${BASE_URL}${currentEmployee._id}`, {
        projectStatus: newStatus,
      });
      setCurrentEmployee(updatedEmployee);
    } catch (error) {
      console.error("Failed to update project status", error);
    }
  };

  // 🔒 Safety
  if (!currentEmployee || !currentEmployee.name) return null;

  return (
    <div className="w-1/4 font-medium pl-8">
      <div className="text-3xl font-bold my-6">Project Status</div>

      <div
        onClick={() => setOpen(!open)}
        className="bg-[#151515] p-2 flex items-center justify-between rounded-lg border-2 border-[#2ECC71]"
      >
        {currentEmployee.projectStatus}
        <TiArrowSortedDown
          size={20}
          className={`${open && "rotate-180"} text-[#2ECC71]`}
        />
      </div>

      {open && (
        <div className="bg-[#151515] mt-2 rounded-lg border-2 border-[#2ECC71]">
          <div className="flex items-center px-2 bg-[#090909]">
            <AiOutlineSearch size={18} />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toLowerCase())}
              className="bg-[#090909] p-2 w-full outline-none"
              placeholder="Search Project Status"
            />
          </div>

          <div className="bg-[#090909]">
            {projectStatusList
              .filter((s) => s.toLowerCase().startsWith(inputValue))
              .map((status) => (
                <div
                  key={status}
                  className="flex justify-between items-center p-2 cursor-pointer hover:font-medium"
                  onClick={() => {
                    handleProjectStatusChange(status);
                    setOpen(false);
                    setInputValue("");
                  }}
                >
                  <div>{status}</div>
                  <FaCheckCircle />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectStatus;
