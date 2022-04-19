import { MdSearch } from "react-icons/md";
import { Categories } from "./Categories";
import { useSelector, useDispatch } from "react-redux";
import {
  getSearchCategory,
  getSearchKeyword,
  handleFocus,
  toggleDialog,
} from "../state/reducers/Search";
import { SearchInput } from "./SearchInput";
import { useNavigate } from "react-router-dom";

const startSearch = (navigate, searchCategory, searchKeyword) => {
  navigate(`/search?category=${searchCategory}&keyword=${searchKeyword}&page=1`)
}

export const handleSearch = (e, searchCategory, searchKeyword, navigate) => {
 const eventName = e._reactName;
 if (searchCategory && searchKeyword) {
   if (eventName === "onKeyDown") {
     if (e.key === "Enter") {
       startSearch(navigate, searchCategory, searchKeyword)
     }
   } else {
     startSearch(navigate, searchCategory, searchKeyword)
   }
 }
};

export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { focused, searchCategory, searchKeyword } = useSelector(
    (state) => state.search
  );

  const handleDialog = () => {
    dispatch(toggleDialog(true));
    document.body.style.overflowY = "hidden";
  };

  return (
    <>
      <div
        onKeyDown={e => handleSearch(e, searchCategory, searchKeyword, navigate)}
        className="w-8/12 px-4 py-2 rounded-full hidden md:flex space-x-4 h-16 shadow-2xl bg-pink-500"
      >
        <div className="flex-1 relative border-r-2 border-gray-300">
          <SearchInput
            onChange={(e) => dispatch(getSearchCategory(e.target.value))}
            value={searchCategory}
            onFocus={(e) => dispatch(handleFocus(true))}
            placeholder="Pick category..."
          />
          {focused && <Categories category={searchCategory} />}
        </div>
        <div className="flex-1">
          <SearchInput
            onChange={(e) => dispatch(getSearchKeyword(e.target.value))}
            value={searchKeyword}
            placeholder="Search..."
          />
        </div>
        <div>
          <button
            onClick={e => handleSearch(e, searchCategory, searchKeyword, navigate)}
            className="h-full bg-blue-400 hover:bg-blue-500 transition w-14 flex justify-center items-center rounded-full"
          >
            <MdSearch fontSize={25} color="#fff" />
          </button>
        </div>
      </div>

      <div
        onClick={handleDialog}
        className="w-11/12 cursor-pointer px-4 py-2 rounded-full justify-center items-center flex md:hidden space-x-4 h-12 shadow-2xl bg-pink-500"
      >
        <div className="flex space-x-2">
          <MdSearch fontSize={25} color="rgb(96 165 250)" />
          <h1 className="text-white">What are you looking for?</h1>
        </div>
      </div>
    </>
  );
};
