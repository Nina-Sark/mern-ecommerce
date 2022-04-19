import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { EmptyResult } from "./EmptyResult";
import { Slide } from "./Slide";

export const ProductsList = ({ data }) => {
  const { search } = useLocation()
  return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 col-span-3 w-full">
        {data?.length !== 0 ? data?.map(({ name, price, images, _id: id }, index) => (
          <Slide
            className="shadow-2xl bg-blue-400"
            image={images?.[0]?.url}
            title={name}
            price={price}
            id={id}
          />
        )) : (
          <EmptyResult/>
        )}
      </div>
  );
};
