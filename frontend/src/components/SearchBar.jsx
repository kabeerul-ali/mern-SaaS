import { useRecoilState } from "recoil";
import { userData, filteredUserData } from "../state";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  const [userList] = useRecoilState(userData);
  const [, setFilteredData] = useRecoilState(filteredUserData);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userList || userList.length === 0) {
      setFilteredData([]);
      return;
    }

    if (search.trim() === "") {
      setFilteredData(userList);
      return;
    }

    const filtered = userList.filter((emp) =>
      emp.name.toLowerCase().startsWith(search.toLowerCase())
    );

    setFilteredData(filtered);
  }, [search, userList]);

  return (
    <div className="flex flex-row items-center px-7">
      <input
        className="w-72 pl-2 bg-[#090909] border-b border-gray-400 outline-none py-1 font-semibold"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="bg-[#090909] h-full py-2 pr-3 border-b border-gray-400">
        <FiSearch />
      </div>
    </div>
  );
};

export default SearchBar;
