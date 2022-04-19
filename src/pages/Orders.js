import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../components/Container";
import { Loader } from "../components/Loader";
import { getOrders } from "../state/thunk/orders/getOrders";
import { DataGrid } from "@mui/x-data-grid";
import formatAsCurrency from "../utils/currencyFormatter";
import moment from "moment";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user_auth } = useSelector((state) => state.user);
  const { orders, get_orders_loading } = useSelector((state) => state.order);
  console.log("--", orders);

  const columns = [
    { field: "id", headerName: "ID", width: 180 },
    { field : "status", headerName : "STATUS", width : 250 },
    { field: "createdAt", headerName: "CREATED AT", width: 250 },
    { field: "itemsQuantity", headerName: "ITEMS QUANTITY", width: 200 },
    { field: "totalSum", headerName: "TOTAL SUM", width: 200 },
  ];

  const rows = orders.map((order) => ({
    id: order?._id,
    status : order?.orderStatus,
    createdAt: moment(order?.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
    itemsQuantity: order?.orderItems?.reduce(
      (acc, orderItem) => (acc += orderItem?.quantity),
      0
    ),
    totalSum: formatAsCurrency(order?.itemsPrice),
  }));

  const handleCellClick = (params, event, details) => {
    if (params?.field === "id") {
      navigate(`/orders/${params?.formattedValue}`);
    }
  };

  useEffect(() => {
    dispatch(getOrders(user_auth?.token));
  }, []);

  return (
    <>
      {get_orders_loading ? (
        <Loader />
      ) : (
        <Container>
          <Typography sx={{ mb: 2 }} variant="h3">
            Orders
          </Typography>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onCellClick={handleCellClick}
            />
          </div>
        </Container>
      )}
    </>
  );
};
