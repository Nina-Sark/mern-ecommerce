import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { Products } from "../components/Products";
import { fetchProducts } from "../state/thunk/products/fetchProducts";
import { getCategory } from "../utils/getCategory";
import Pagination from "react-js-pagination";
import {
  MdNavigateNext,
  MdNavigateBefore,
} from "react-icons/md";
import { AiFillFastBackward, AiFillFastForward } from "react-icons/ai";
import { isMobile } from "react-device-detect";
import { findSearchValue, getSearchValues } from "../utils/getSearchValues";
import { setPriceRange } from "../state/reducers/Products";
import { EmptyResult } from "../components/EmptyResult";

export const ProductsDisplay = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();

  const {
    priceRange,
    keyword,
    data: { highestPrice, pages, numOfProducts, products },
    loading,
  } = useSelector((state) => state.products);

  const currentPage = Number(findSearchValue(getSearchValues(search), "page"));
  const category = findSearchValue(getSearchValues(search), "category");
  const keywordValue = findSearchValue(getSearchValues(search), "keyword");
  const productKeyword =
    keyword?.length === 0 || keyword == null
      ? keywordValue
        ? keywordValue
        : null
      : keyword;
  const price = [
    Number(findSearchValue(getSearchValues(search), "minPrice")),
    Number(findSearchValue(getSearchValues(search), "maxPrice")),
  ];

  const URL = localStorage.getItem("url");

  const [activePage, setActivePage] = useState(currentPage);
  const { searchCategory, searchKeyword } = useSelector(
    (state) => state.search
  );

  const searchStrValue = `?category=${
    role === "search" ? (!searchCategory ? category : searchCategory) : category
  }&page=${activePage}${
    role === "search"
      ? `&keyword=${
          !searchKeyword
            ? productKeyword
            : searchKeyword !== keyword && keyword?.length > 0
            ? keyword
            : searchKeyword
        }`
      : productKeyword?.length === 0 || productKeyword == null
      ? ""
      : `&keyword=${productKeyword}`
  }${
    Boolean(price[0]) && Boolean(price[1])
      ? `&price=[${price[0]}, ${price[1]}]`
      : ""
  }`;

  const navigationURL = `/${role}?category=${
    role === "search" ? (!searchCategory ? category : searchCategory) : category
  }&page=${activePage}${
    role === "search"
      ? `&keyword=${
          !searchKeyword
            ? productKeyword
            : searchKeyword !== keyword && keyword?.length > 0
            ? keyword
            : searchKeyword
        }`
      : productKeyword?.length === 0 || productKeyword == null
      ? ""
      : `&keyword=${productKeyword}`
  }${
    Boolean(priceRange[0]) && Boolean(priceRange[1])
      ? `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
      : ""
  } `;

  useEffect(() => {
    if (!URL) {
      if (highestPrice) {
        dispatch(setPriceRange([10, highestPrice]));
      }
    } else {
      dispatch(setPriceRange([price[0], price[1]]));
    }
  }, [highestPrice]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  useEffect(() => {
    dispatch(
      fetchProducts({
        search: searchStrValue,
      })
    );

    navigate(navigationURL);
    if (URL) {
      localStorage.setItem("url", navigationURL);
    }
  }, [
    dispatch,
    highestPrice,
    search,
    currentPage,
    activePage,
    keyword,
    priceRange,
  ]);

  useEffect(() => {
    if(loading) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }
  }, [loading])

  return (
    <>
      {!loading && Boolean(highestPrice) ? (
        products?.length > 0 ? (
          <Container>
            <Products
              url={navigationURL}
              products={products}
              title={
                role === "search"
                  ? `Search result (${numOfProducts})`
                  : getCategory(search)
              }
            />
            {pages !== 0 && (
              <div className="w-full mt-10 flex justify-center md:justify-end">
                <Pagination
                  activeClass="active-item"
                  itemClass="pagination-item"
                  itemClassPrev="item-prev"
                  itemClassNext="item-next"
                  itemClassLast="item-last"
                  itemClassFirst="item-first"
                  activePage={activePage}
                  nextPageText={<MdNavigateNext fontSize={25} />}
                  prevPageText={<MdNavigateBefore fontSize={25} />}
                  lastPageText={<AiFillFastForward fontSize={25} />}
                  firstPageText={<AiFillFastBackward fontSize={25} />}
                  itemsCountPerPage={8}
                  totalItemsCount={numOfProducts}
                  pageRangeDisplayed={isMobile ? 2 : 5}
                  onChange={handlePageChange}
                />
              </div>
            )}
          </Container>
        ) : (
          <div className="py-[65px]">
            <EmptyResult />
          </div>
        )
      ) : (
        <Loader />
      )}
    </>
  );
};
