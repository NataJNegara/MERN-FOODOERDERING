import { useState } from "react";
import Search from "../../components/Search/Search";
import Thumbnails from "../../features/home/Thumbnails";
import { useFoods } from "../../features/home/useFoods";
import FoodsOperation from "../../features/food/FoodsOperation";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import Hero from "../../components/Hero/Hero";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const { foods, isLoading } = useFoods();

  const filteredFoods = foods?.filter((food) =>
    search?.toLocaleLowerCase() === ""
      ? food
      : food.name.toLocaleLowerCase().includes(search)
  );

  return (
    <div>
      <Hero />
      {isLoading && <LoadingSpinner />}
      <Search setSearch={setSearch} />
      <FoodsOperation />
      {!isLoading && <Thumbnails foods={filteredFoods} setSearch={setSearch} />}
    </div>
  );
}
