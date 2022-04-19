import { useDispatch, useSelector } from "react-redux";
import { getSearchCategory, handleFocus } from "../state/reducers/Search";

export const Categories = ({ category }) => {
  const dispatch = useDispatch();
  const { productsPerCategories } = useSelector(state => state.productsPerCategory)


  const categories = Object.keys(productsPerCategories);
  const filteredCategories = [...categories].filter((cat) =>
    cat.toLowerCase().includes(category.toLowerCase())
  );

  const handleSelectCategory = (selectedCategory) => {
    dispatch(getSearchCategory(selectedCategory));
    dispatch(handleFocus(false));
  };

  return (
    <>
      {filteredCategories.length !== 0 && (
        <div
          id="category-selector"
          data-element="search-category"
          className="bg-pink-500 px-4 py-3 rounded-2xl z-10 absolute top-16 w-full shadow-lg"
        >
          <ul
            data-element="search-category"
            className="space-y-1 max-h-40 overflow-x-auto"
          >
            {filteredCategories.map((cat, index) => (
              <li
                onClick={() => handleSelectCategory(cat)}
                data-element="search-category"
                key={`${cat}-${index}`}
                className="text-white cursor-pointer hover:bg-pink-400 p-2 first-letter:uppercase"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
