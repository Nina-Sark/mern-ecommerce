import { Slider } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import { findSearchValue, getSearchValues } from "../utils/getSearchValues";
import { useDispatch, useSelector } from "react-redux";
import { setPriceRange, toggleKeyword } from "../state/reducers/Products";

export const Filters = ({ url }) => {
  const { search } = useLocation();
  const dispatch = useDispatch();

  const {
    keyword: keyWordDefaultValue,
    priceRange,
    data: { highestPrice },
  } = useSelector((state) => state.products);

  const price = [
    Number(findSearchValue(getSearchValues(search), "minPrice")),
    Number(findSearchValue(getSearchValues(search), "maxPrice")),
  ];
  const keywordValue = findSearchValue(getSearchValues(search), "keyword")
  const [keyword, setKeyword] = useState(keyWordDefaultValue == null || keyWordDefaultValue?.length == 0 ? keywordValue ? keywordValue : "" : keyWordDefaultValue);
  const [valueRange, setValueRange] = useState(price);

  const category = findSearchValue(getSearchValues(search), "category");

  const fetchData = (k) => {
    dispatch(toggleKeyword(k));
  };

  const delayedSearch = useCallback(
    debounce((k) => fetchData(k), 600, { trailing: true }),
    []
  );

  const delayedRangeChange = useCallback(
    debounce((p) => {
      dispatch(setPriceRange(p))
      localStorage.setItem('url', url)
    }, 600, { trailing: true }),
    []
  );

  const handleChange = (event, newValue) => {
    setValueRange(newValue);
    delayedRangeChange(newValue);
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    delayedSearch(e.target.value);
  };


  return (
    <div className="w-full">
      <input
        onChange={handleSearch}
        value={keyword.replace(/\b%20\b/i, " ")}
        className="bg-blue-400 mb-16 w-full md:w-[98%] placeholder:text-gray-100 py-2 px-6 outline-none text-gray-100 rounded-2xl focus:bg-blue-500"
        placeholder="Search..."
      />
      <Slider
        valueLabelFormat={(value) => `$${value}`}
        onChange={handleChange}
        value={valueRange}
        max={highestPrice}
        min={10}
        step={10}
        valueLabelDisplay="on"
        sx={{
          width: isMobile ? "100%" : "90%",
          color: "rgb(96 165 250)",
          "& .MuiSlider-valueLabelOpen": { background: "rgb(244 114 182)" },
        }}
      />
    </div>
  );
};
