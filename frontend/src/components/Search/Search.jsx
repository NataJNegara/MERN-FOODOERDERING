import styles from "./Search.module.css";

export default function Search({ setSearch }) {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const search = searchParams.get("search") || "";

  // function handleChange(e) {
  //   searchParams.set("search", e.target.value);
  //   setSearchParams(searchParams);
  // }

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search item..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
