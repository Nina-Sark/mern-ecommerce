import Lottie from "lottie-react";
import emptyResultLottie from "../lotties/87830-empty-search.json";

export const EmptyResult = () => {
  return (
    <div className="w-full col-span-3 h-[45vh] flex flex-col items-center justify-center text-2xl font-medium">
      Nothing was found
      <Lottie animationData={emptyResultLottie} loop={true} autoplay={true}/>
    </div>
  );
};
