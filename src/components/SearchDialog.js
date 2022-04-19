import { useSelector, useDispatch } from "react-redux";
import {
  getSearchCategory,
  getSearchKeyword,
  handleFocus,
  toggleDialog,
} from "../state/reducers/Search";
import { Categories } from "./Categories";
import { MdSearch } from "react-icons/md";
import { SearchInput } from "./SearchInput";
import { ModalContainer } from "./ModalContainer";
import { handleSearch } from "./Search";
import { useNavigate } from "react-router-dom";

export const SearchDialog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { focused, searchCategory, searchKeyword } = useSelector(
    (state) => state.search
  );

  const handleClose = () => {
    dispatch(toggleDialog(false));
    setTimeout(() => (document.body.style.overflowY = "auto"), 400);
  };

  const handleClick = (e) => {
    handleSearch(e, searchCategory, searchKeyword, navigate)
    handleClose()
  }

  return (
    <ModalContainer>
      <div>
        <h1
          style={{ height: "max-content" }}
          className="text-center overflow-visible text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 font-bold"
        >
          What Are You Looking For?
        </h1>
        <section className="space-y-4 mt-10">
          <div className="w-full flex justify-center relative">
            <SearchInput
              onChange={(e) => dispatch(getSearchCategory(e.target.value))}
              value={searchCategory}
              onFocus={(e) => dispatch(handleFocus(true))}
              placeholder="Pick category..."
            />
            {focused && <Categories category={searchCategory} />}
          </div>
          <div className="w-full flex justify-center relative">
            <SearchInput
              onChange={(e) => dispatch(getSearchKeyword(e.target.value))}
              value={searchKeyword}
              placeholder="Search..."
            />
          </div>
        </section>
        <div className="mt-12 space-y-4">
          <button 
          onClick={handleClick}
          className="w-[98%] text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center bg-gradient-to-r from-pink-500 to-blue-400">
            <span>Search</span>
            <MdSearch fontSize={25} />
          </button>
          <button
            className="w-[98%] text-white rounded-sm text-lg h-12 flex space-x-2 items-center justify-center bg-gradient-to-r from-pink-500 to-blue-400"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};
