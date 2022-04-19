import Lottie from "lottie-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import paymentSuccessAnimation from "../lotties/83666-payment-successfull.json";

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/orders");
    }, 3500);
  }, []);

  return (
    <div className="w-[100vw] bg-green-50 h-[100vh] overflow-hidden flex justify-center items-center">
      <Lottie
        animationData={paymentSuccessAnimation}
        autoPlay={true}
        loop={false}
        style={{
          flexShrink: 0,
          width: "100vw",
          height: "85vh",
        }}
      />
    </div>
  );
};