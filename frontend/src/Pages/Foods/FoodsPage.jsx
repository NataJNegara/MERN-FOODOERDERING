import { useState } from "react";
import Search from "../../components/Search/Search";
import Foods from "../../features/food/Foods";
import { useFoods } from "../../features/home/useFoods";
import styles from "./FoodsPage.module.css";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

export default function FoodsPage() {
  const [search, setSearch] = useState("");
  const { foods, isLoading } = useFoods();

  const filteredFoods = foods?.filter((food) =>
    search === ""
      ? food
      : food.name.toLowerCase().includes(search?.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <Search setSearch={setSearch} />
      <Link to="/admin/addFood" className={styles.add_button}>
        <IoAddCircleOutline />
        Add Food
      </Link>
      <Foods foods={filteredFoods} setSearch={setSearch} />
    </div>
  );
}
