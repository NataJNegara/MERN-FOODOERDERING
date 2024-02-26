import { IoHeart } from "react-icons/io5";
import { useFood } from "./useFood";
import Rupiah from "../../helper/formatCurrency";
import StarsRating from "../../components/Stars/StarsRating";
import styles from "./FoodDetail.module.css";
import NotFound from "../../components/NotFound/NotFound";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";

export default function FoodDetail() {
  const { food, isLoading } = useFood();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleAdd() {
    dispatch(addItem({ ...food, quantity: 1, totalPrice: food.price }));
    navigate("/cart");
  }

  if (isLoading) return <p>loading...</p>;

  return (
    <>
      {!food && <NotFound />}
      {food && (
        <div className={styles.food_container}>
          <img src={`${food.imageUrl}`} className={styles.image} />
          <div className={styles.content}>
            <div className={styles.content_header}>
              <p className={styles.title}>{food.name}</p>
              <IoHeart
                className={`${styles.favorite} ${
                  food.favorite ? "" : styles.not
                }`}
              />
            </div>
            <div className={styles.rating}>
              <StarsRating stars={food.stars} size={24} />
              <span>({food.stars})</span>
            </div>
            <div className={styles.origin_container}>
              {food.origins.map((origin, i) => (
                <span className={styles.origin} key={i}>
                  {origin}
                </span>
              ))}
            </div>
            <p>Estimate to cook about {food.preparingTime} minutes</p>
            <p className={styles.harga_container}>
              <span className={styles.harga}>Harga : </span>
              <span className={styles.nominal}>
                {Rupiah.format(food.price)}
              </span>
            </p>
            <button className={styles.button} onClick={handleAdd}>
              Add to chart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
