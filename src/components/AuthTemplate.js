import Lottie from "lottie-react";

export const AuthTemplate = ({ animationData, formTitle, form: Form }) => {
  return (
    <div className="grid md:grid-cols-5 grid-cols-1 h-[100vh] overflow-y-auto">
      <div className="col-span-3 hidden md:block bg-gradient-to-r from-pink-300 to-blue-200">
        <div className="w-full h-[100%] relative">
          <Lottie
            animationData={animationData}
            loop={true}
            autoPlay={true}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div className="xl:px-0 px-10 py-4">
          <h1
            style={{ height: "max-content" }}
            className="text-center uppercase overflow-visible md:text-4xl text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500 font-bold"
          >
            {formTitle}
          </h1>
          <Form />
        </div>
      </div>
    </div>
  );
};
