import { CircleSpinner } from "react-spinners-kit";

export const LoadingButton = ({ text, classes }) => {
  return (
    <button
      disabled={true}
      className={`cursor-not-allowed flex space-x-2 items-center justify-center ${classes}`}
    >
      <CircleSpinner loading={true} size={20} />
      <span>{text}</span>
    </button>
  );
};
