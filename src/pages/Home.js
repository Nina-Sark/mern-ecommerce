import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../components/Banner";
import { Head } from "../components/Head";
import { Loader } from "../components/Loader";
import { Slider } from "../components/Slider";
import { clearProductsData } from "../state/reducers/Products";
import { toggleLoading } from "../state/reducers/ProductsPerCategory";
import { clearSearchData } from "../state/reducers/Search";
import { fetchProductsPerCategory } from "../state/thunk/products/fetchProductsPerCategories";

export const Home = () => {
  const dispatch = useDispatch();

  const { productsPerCategories, loading } = useSelector(
    (state) => state.productsPerCategory
  );
  const data = Object.entries(productsPerCategories);

  useEffect(() => {
    dispatch(fetchProductsPerCategory({ category: "Accessories", limit: 8 }));
    dispatch(fetchProductsPerCategory({ category: "Bags", limit: 8 }));
    dispatch(fetchProductsPerCategory({ category: "Sports", limit: 8 }));

    dispatch(clearProductsData());
    dispatch(clearSearchData());

    localStorage.setItem("url", "");
  }, [dispatch]);

  useEffect(() => {
    if(loading) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "auto"
    }
  }, [loading])

  return (
    <div>
      <Head
        title={!loading ? "Ola | Home Page" : "Loading..."}
        description="Online Shop"
        keywords="Shopping Online, cloth, tech"
      />
      {!loading ? (
        <>
          <Banner />
          <section className="md:py-6 py-4">
            {data.map((entity) => (
              <Slider key={entity[0]} title={entity[0]} data={entity[1]} />
            ))}
          </section>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
