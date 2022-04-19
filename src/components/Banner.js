import { Search } from "./Search";

export const Banner = () => {
  return (
    <div
      style={{ height: "calc(100vh - 4rem)" }}
      className="bg-[url('https://images.ctfassets.net/rxqefefl3t5b/6I2vL9f0IVsDQ8qFgdrxH7/7660c4bab3116a4a04025d5c4802efa5/Virgin-Red-online-shopping-offers.jpg?fl=progressive&q=80')] flex justify-center items-center bg-center bg-cover"
    >
      <Search />
    </div>
  );
};
