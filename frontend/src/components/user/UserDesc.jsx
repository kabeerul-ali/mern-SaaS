import { useRecoilState } from "recoil";
import { currentEmployeeState } from "../../state";
import ClientStatus from "../status/ClientStatus";
import ProjectStatus from "../status/ProjectStatus";

const UserDesc = () => {
  const [currentEmployee] = useRecoilState(currentEmployeeState);

  // 🔒 Safety check
  if (!currentEmployee || !currentEmployee.name) {
    return (
      <div className="bg-[#151515] mx-6 p-4 rounded-2xl border-l-8 border-l-green-600 my-8">
        <div className="text-xl font-semibold">
          Select a user to view details
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#151515] flex flex-col mx-6 p-4 rounded-2xl border-l-8 border-l-green-600 my-8 gap-y-4">
      <div className="mx-4 pb-8">
        <div className="text-3xl font-bold mb-4">Bio</div>

        <div className="text-justify">
          {currentEmployee.bio || "No bio available"}
        </div>

        <div className="flex flex-row w-[1400px] mt-6">
          <ClientStatus />
          <ProjectStatus />
        </div>
      </div>
    </div>
  );
};

export default UserDesc;
