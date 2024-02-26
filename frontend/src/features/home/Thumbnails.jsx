import { Link } from "react-router-dom";
import { IoHeart, IoTime } from "react-icons/io5";
import styles from "./Thumbnails.module.css";
import StarsRating from "../../components/Stars/StarsRating";
import Rupiah from "../../helper/formatCurrency";
import NotFound from "../../components/NotFound/NotFound";

export default function Thumbnails({ foods, setSearch }) {
  return (
    <>
      {foods?.length === 0 && (
        <NotFound btnText="Reset search" onReset={() => setSearch("")} />
      )}
      {foods && (
        <ul className={styles.list}>
          {foods?.map((food) => (
            <li key={food.id}>
              <Link to={`/food/${food.id}`}>
                <div className={styles.imageContainer}>
                  <img
                    className={styles.image}
                    src={`${food.imageUrl}`}
                    alt={food.name}
                  />
                </div>
                <div className={styles.description}>
                  <div className={styles.title}>
                    <p className={styles.name}>{food.name}</p>
                    <span
                      className={`${styles.favorite} ${
                        food.favorite ? "" : styles.not
                      }`}>
                      <IoHeart />
                    </span>
                  </div>

                  <span className={styles.stars}>
                    <StarsRating stars={food.stars} />
                    <p>({food.stars})</p>
                  </span>
                  <div className={styles.produkFooter}>
                    <div className={styles.origin}>
                      {/* showing all origins */}
                      {/* {food.origins.map((origin, i) => (
                      <span key={i}>{origin}</span>
                    ))} */}

                      {/* only showing 3 origins */}
                      {(() => {
                        let span = [];
                        for (let i = 0; i < food.origins.length; i++) {
                          if (i < 3) {
                            span.push(<span key={i}>{food.origins[i]}</span>);
                          }
                        }
                        return span;
                      })()}
                    </div>

                    <div className={styles.preparingTime}>
                      <span>
                        <IoTime /> {food.preparingTime}
                      </span>
                    </div>
                  </div>
                  <p className={styles.price}>{Rupiah.format(food.price)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
