import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import formatAsCurrency from "../utils/currencyFormatter";

export const CartDetailsItem = ({
  id,
  image,
  name,
  price,
  quantity,
  totalSum,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full space-x-4 justify-between items-center mb-3 py-2 border-b-2 border-b-blue-500">
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/details/${id}`)}
      >
        <img width={100} height={150} className="mb-2" src={image} />
        <Typography variant="body2" sx={{ maxWidth: "200px" }}>
          {name}
        </Typography>
      </div>
      <div>
        <Typography sx={{ fontWeight: "bold" }} variant="body1">
          {`${formatAsCurrency(
            Number(price)
          )} x ${quantity} = ${formatAsCurrency(totalSum)}`}
        </Typography>
      </div>
    </div>
  );
};