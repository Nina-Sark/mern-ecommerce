import { useSelector } from "react-redux";
import { HeartSpinner } from "react-spinners-kit";
import { Head } from "./Head";

export const Loader = () => {
  const { scrollPosition: topPos } = useSelector((state) => state.search);
  return (
    <>
      <Head
        title="Loading..."
        description="Loading"
        keywords="loader, loding, ecommerce"
      />
      <div
        style={{ top: `${topPos}px` }}
        className="h-[100vh] w-full z-[10000] absolute top-0 left-0 bg-pink-50 flex justify-center items-center"
      >
        <HeartSpinner size={120} color="#ec4899" />
      </div>
    </>
  );
};
