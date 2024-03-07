import { Link } from "react-router-dom";
import Rupiah from "../../helper/formatCurrency";
import styles from "./Foods.module.css";
import NotFound from "../../components/NotFound/NotFound";
import { useDeleteFood } from "./useDeleteFood";

export default function Foods({ foods, setSearch }) {
  const { isDeleting, deleteFood } = useDeleteFood();

  function handleDelete(id) {
    const confirm = window.confirm(`Delete food ${id}`);
    if (!confirm) return;

    deleteFood(id);
  }

  return (
    <>
      {foods.length === 0 && (
        <NotFound btnText="Reset search" onReset={() => setSearch("")} />
      )}
      {foods.length > 0 && (
        <div className={styles.container}>
          {foods.map((food) => (
            <div key={food._id} className={styles.food_container}>
              <img src={food.imageUrl} alt={food.name} />
              <Link to={`/food/${food._id}`} className={styles.name}>
                {food.name}
              </Link>
              <p>{Rupiah.format(food.price)}</p>
              <span>
                <Link to={`/admin/editFood/${food._id}`}>Edit</Link>
                <button
                  className={styles.delete_button}
                  onClick={() => handleDelete(food._id)}
                  disabled={isDeleting}>
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
