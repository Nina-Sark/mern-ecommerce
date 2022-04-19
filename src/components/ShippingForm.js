import { InputAdornment, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";
import { MdHomeWork, MdPhone, MdPinDrop } from "react-icons/md";
import { FormInput } from "./FormInput";
import { Country, State, City } from "country-state-city";
import { BsGlobe, BsPinMapFill } from "react-icons/bs";
import { AlertComponent } from "../components/AlertComponent";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { getShippingDetails, setStep } from "../state/reducers/ShippingReducer";

export const ShippingForm = () => {
  const dispatch = useDispatch();

  const { shippingInfo, step } = useSelector((state) => state.shipping);

  const [data, setData] = useState({
    address: shippingInfo?.address,
    city: shippingInfo?.city,
    pincode: shippingInfo?.pincode,
    number: shippingInfo?.number,
    country: shippingInfo?.country,
    state: shippingInfo?.state,
  });
  console.log(shippingInfo);

  const [errorMessage, setErrorMessage] = useState("");

  const values =
    State.getStatesOfCountry(data?.country)?.length > 0
      ? Object.values(shippingInfo)
      : Object.values({
          address: shippingInfo?.address,
          city: shippingInfo?.city,
          pincode: shippingInfo?.pincode,
          number: shippingInfo?.number,
          country: shippingInfo?.country,
        });

  const disabled = values.every((val) => val?.length > 0);

  const handleNext = () => {
    if (!validator.isMobilePhone(data?.number)) {
      setErrorMessage("Phone number isn't valid!");
    } else {
      dispatch(setStep(step + 1));
      setErrorMessage("");
      dispatch(getShippingDetails(data));
    }
  };

  return (
    <div className="lg:w-[40%] md:w-[60%] w-[80%] flex flex-col space-y-6">
      {errorMessage && (
        <AlertComponent
          open={true}
          message={errorMessage}
          status="error"
          onCloseF={() => setErrorMessage("")}
        />
      )}
      <FormInput
        onChange={(e) => {
          setData({ ...data, address: e.target.value });
          dispatch(getShippingDetails({ ...data, address: e.target.value }));
        }}
        value={data?.address}
        placeholder="Enter your address..."
        label="Address"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdHomeWork fontSize={25} />
            </InputAdornment>
          ),
        }}
      />
      <FormInput
        onChange={(e) => {
          setData({ ...data, city: e.target.value });
          dispatch(getShippingDetails({ ...data, city: e.target.value }));
        }}
        value={data?.city}
        placeholder="Enter your city..."
        label="City"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaCity fontSize={25} />
            </InputAdornment>
          ),
        }}
      />
      <FormInput
        onChange={(e) => {
          setData({ ...data, pincode: e.target.value });
          dispatch(getShippingDetails({ ...data, pincode: e.target.value }));
        }}
        value={data?.pincode}
        placeholder="Enter your pin code..."
        label="Pin code"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdPinDrop fontSize={25} />
            </InputAdornment>
          ),
        }}
      />
      <FormInput
        onChange={(e) => {
          setData({ ...data, number: e.target.value });
          dispatch(getShippingDetails({ ...data, number: e.target.value }));
        }}
        value={data?.number}
        placeholder="Enter your phone number..."
        label="Number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MdPhone fontSize={25} />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        onChange={(e) => {
          dispatch(
            getShippingDetails({
              ...shippingInfo,
              country: e.target.value,
              state: "",
            })
          );
        }}
        value={shippingInfo?.country}
        placeholder="Pick your country..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BsGlobe fontSize={25} />
            </InputAdornment>
          ),
        }}
        sx={{
          "& label.Mui-focused": { color: "#ec4899" },
          "& .MuiInput-underline:after": { borderBottomColor: "#ec4899" },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#ec4899",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ec4899",
            },
          },
        }}
        id="select"
        label="Country"
        select
      >
        {Country.getAllCountries().map((item) => (
          <MenuItem key={item?.name} value={item?.isoCode}>
            {item?.name}
          </MenuItem>
        ))}
      </TextField>
      {State.getStatesOfCountry(shippingInfo?.country)?.length > 0 && (
        <TextField
          onChange={(e) => {
            setData({ ...shippingInfo, state: e.target.value });
            dispatch(getShippingDetails({ ...shippingInfo, state: e.target.value }));
          }}
          value={shippingInfo?.state}
          placeholder="Pick your state..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsPinMapFill fontSize={25} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& label.Mui-focused": { color: "#ec4899" },
            "& .MuiInput-underline:after": { borderBottomColor: "#ec4899" },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#ec4899",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ec4899",
              },
            },
          }}
          id="select"
          label="State"
          select
        >
          {State.getStatesOfCountry(shippingInfo?.country).map((item) => (
            <MenuItem key={item?.name} value={item?.name}>
              {item?.name}
            </MenuItem>
          ))}
        </TextField>
      )}
      <button
        onClick={handleNext}
        disabled={!disabled}
        className={`w-full py-2 ${
          !disabled
            ? "bg-gray-500 text-white"
            : "bg-pink-500 text-white hover:bg-pink-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};