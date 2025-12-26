import { useRecoilState } from "recoil";
import { currentEmployeeState } from "../../state";
import sample from "../../../src/assets/sample-profile.jpg";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdPhone } from "react-icons/md";

const UserProfile = () => {
  const [currentEmployee] = useRecoilState(currentEmployeeState);

  // 🔒 Safety check
  if (!currentEmployee || !currentEmployee.name) {
    return (
      <div className="bg-[#151515] mx-6 p-6 rounded-2xl border-l-8 border-l-green-600">
        <div className="text-xl font-semibold">
          Select a user to view profile
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#151515] flex flex-row mx-6 p-6 rounded-2xl border-l-8 border-l-green-600">
      <div>
        <img
          src={currentEmployee.profilePicture || sample}
          alt="Profile"
          className="w-48 h-48 rounded-full"
        />
      </div>

      <div className="ml-24">
        <div className="flex flex-col gap-y-2">
          <div className="text-4xl font-bold">
            {currentEmployee.name}
          </div>
          <div className="text-2xl">
            {currentEmployee.designation}
          </div>
        </div>

        <div className="flex flex-row gap-x-8 mb-6 mt-4">
          <div className="flex items-center gap-x-2">
            <FaEnvelope className="text-[#2ECC71]" />
            <div>{currentEmployee.contactDetails?.email}</div>
          </div>

          <div className="flex items-center gap-x-2">
            <MdPhone className="text-[#2ECC71]" />
            <div>{currentEmployee.contactDetails?.phone}</div>
          </div>
        </div>

        <div className="flex flex-row mt-6">
          {currentEmployee.profiles?.github && (
            <a
              href={currentEmployee.profiles.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center border-2 border-[#2ECC71] px-3 py-1 rounded-lg mr-2">
                <FaGithub />
                <span className="ml-1">Github</span>
              </button>
            </a>
          )}

          {currentEmployee.profiles?.linkedIn && (
            <a
              href={currentEmployee.profiles.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="flex items-center border-2 border-[#2ECC71] px-3 py-1 rounded-lg ml-2">
                <FaLinkedin />
                <span className="ml-1">LinkedIn</span>
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
