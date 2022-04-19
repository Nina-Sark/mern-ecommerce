import React from "react";
import { Filters } from "./Filters";
import { ProductsList } from "./ProductsList";

export const Products = ({ products, title, titleClassname = "", url }) => {
  return (
    <div>
      <h1 className={`text-4xl text-pink-400 font-bold mb-8 ${titleClassname}`}>
        {title}
      </h1>
      <div className="md:grid md:grid-cols-4 gap-12">
        <Filters url={url}/>
        <ProductsList data={products} />
      </div>
    </div>
  );
};