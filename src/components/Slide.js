import { Link } from "react-router-dom";
import formatAsCurrency from "../utils/currencyFormatter";

export const Slide = ({ image, title, price, id, className = "" }) => {
  return (
    <Link to={`/details/${id}`}>
      <div className={className}>
        <img
          className="md:h-[32vh] bg-center h-[27vh] object-cover w-full mb-4"
          src={image}
        />
        <div className="flex bg-pink-200 h-full flex-col md:space-x-2 md:flex-row justify-between md:h-[7vh] items-start md:items-center px-4">
          <div className="mb-2 md:mb-0 flex-1">
            <h1>{title}</h1>
          </div>
          <div>
            <span className="md:p-2 p-1 md:mt-0 text-sm text-white rounded-full bg-gradient-to-r from-pink-500 to-blue-500">
              {formatAsCurrency(price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
