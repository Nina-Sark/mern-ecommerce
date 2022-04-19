export const getSearchValues = (search) => {
  return search
    ?.slice(1, search?.length)
    ?.split("&")
    ?.map((searchStr) => searchStr?.split("="));
};

export const findSearchValue = (searchValues, value) => {
  return searchValues?.find((searchValue) => searchValue?.[0] === value)?.[1];
};
