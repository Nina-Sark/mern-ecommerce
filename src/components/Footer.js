export const Footer = () => {
  const categories = [
    "Shoes",
    "Accessories",
    "Tops",
    "T-shirts",
    "Laptops",
    "Hats",
    "Sports",
  ];

  const pages = ["Home", "Sign up", "Log in", "Products"];

  return (
    <div className="bg-gradient-to-r from-pink-500 to-blue-500 grid grid-rows-3 md:grid-cols-3 md:grid-rows-none h-max px-5 md:px-10 py-8">
      <div>
        <h1 className="font-bold text-9xl text-white drop-shadow-2xl">Ola</h1>
      </div>
      <div>
        <h1 className="font-bold text-xl underline decoration-blue-900 text-white mb-2 underline-offset-4">
          Pages
        </h1>
        <ul>
          {pages.map((page) => (
            <li key={page}>{page}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-xl underline text-white decoration-pink-900 underline-offset-4 mb-2">
          Categories
        </h1>
        <ul>
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
