import { useRecoilState } from "recoil";
import { showModalState } from "../../state";
import UserForm from "./NewUserForm";

const NewUser = () => {
  const [, setShowModal] = useRecoilState(showModalState);

  return (
    <div className="mt-4 px-4">
      <button
        className="bg-[#151515] text-white px-4 py-2 rounded-md w-full border border-[#2ECC71]"
        onClick={() => setShowModal(true)}
      >
        Create New User
      </button>

      <UserForm />
    </div>
  );
};

export default NewUser;
