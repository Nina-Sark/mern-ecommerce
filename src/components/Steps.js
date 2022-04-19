import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { MdLocalShipping, MdPayment, MdShoppingBasket } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setStep } from "../state/reducers/ShippingReducer";
import { PaymentForm } from "./PaymentForm";
import { ShippingConfirm } from "./ShippingConfirm";
import { ShippingForm } from "./ShippingForm";

export const Steps = () => {
  const dispatch = useDispatch()
  const { step: activeStep } = useSelector((state) => state.shipping)

  const data = [
    {
      label: "Details",
      icon: MdLocalShipping,
    },
    {
      label: "Confirm",
      icon: MdShoppingBasket,
    },
    {
      label: "Payment",
      icon: MdPayment,
    },
  ];

  const content = [
    {
      component: <ShippingForm />,
    },
    {
      component: <ShippingConfirm/>,
    },
    {
      component: <PaymentForm/>,
    },
  ];

  const handleNextStep = () => {
    if (activeStep !== data?.length - 1) {
     dispatch(setStep(activeStep + 1))
    }
  };

  const handlePrevStep = () => {
    if (activeStep !== 0) {
      dispatch(setStep(activeStep - 1))
    }
  };
  return (
    <>
      <Stepper style={{ width: "100%" }} alternativeLabel>
        {data.map(({ label, icon: Icon }, index) => (
          <Step
            completed={activeStep >= index}
            key={label}
            active={index === activeStep}
          >
            <StepLabel
              icon={
                <Icon
                  size={30}
                  color={
                    index === activeStep || activeStep >= index
                      ? "#ec4899"
                      : "#000"
                  }
                />
              }
            >
              <span
                className={`${
                  index === activeStep || activeStep >= index
                    ? "text-pink-500"
                    : "text-black"
                }`}
              >
                {label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="flex justify-center mt-16 min-h-[30vh]">
        {content[activeStep]?.component}
      </div>
    </>
  );
};