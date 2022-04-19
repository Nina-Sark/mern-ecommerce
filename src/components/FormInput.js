import { TextField } from "@mui/material";
import React from "react";

export const FormInput = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <>
    <TextField
    ref={ref}
    label={label}
    sx={{
      "& label.Mui-focused": { color: error ? "#FE1401" : "#ec4899" },
      "& .MuiInput-underline:after": { borderBottomColor: error ? "#FE1401" : "#ec4899" },
      "& .MuiOutlinedInput-root": {
        "& fieldset" : {
           borderColor : error && "#FE1401",
           borderWidth : error && "2px"
        },
        "&:hover fieldset": {
          borderColor: error ? "#FE1401" : "#ec4899",
        },
        "&.Mui-focused fieldset": {
          borderColor: error ? "#FE1401" : "#ec4899",
        },
      },
    }}
    fullWidth
    {...props}
  />
  {error && <small className="text-[#FE1401]">{error?.message}</small>}
    </>
  )
})
