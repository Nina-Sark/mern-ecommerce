export const Container = ({ children, classes = "" }) => {
  return (
    <div className={`container my-12 mx-auto max-w-screen-xl lg:px-14 md:px-16 px-8 ${classes}`}>
      {children}
    </div>
  );
};