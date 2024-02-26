import { useSearchParams } from "react-router-dom";
import styles from "./Filter.module.css";

export default function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options.at(0);

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <div className={styles.tags_container}>
      {options.map((option, i) => (
        <button
          className={`${styles.button} ${
            currentFilter === option.value ? styles.active : ""
          }`}
          key={i}
          onClick={() => handleClick(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
