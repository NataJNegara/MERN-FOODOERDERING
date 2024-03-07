import styles from "./Table.module.css";
import { Link } from "react-router-dom";

export default function Table({
  data = null,
  columns = null,
  isLoading,
  onBlock,
}) {
  const userId = data.map((data) => data.id);
  const isBlocked = data.map((data) => data.isBlocked);

  return (
    <>
      <div className={styles["table-container"]}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              {columns?.map((col, i) => (
                <th key={i}>{col.header}</th>
              ))}
            </tr>
          </thead>

          {data && !isLoading && (
            <tbody className={styles.tbody}>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((col, i) => (
                    <td key={i}>
                      {row[col.field]}

                      {col.field === "isAdmin" && (
                        <p className={styles.status}>
                          {row[col.field] ? (
                            <span className={styles.admin}>Admin</span>
                          ) : (
                            <span className={styles.default}>Default</span>
                          )}
                        </p>
                      )}

                      {col.field === "action" && (
                        <span>
                          <button
                            className={styles["delete-btn"]}
                            onClick={() => onBlock(userId.at(index))}>
                            Block
                          </button>

                          <Link
                            to={`/admin/editUser/${userId.at(index)}`}
                            className={styles["edit-btn"]}>
                            Edit
                          </Link>
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {isLoading && <p>Loading data...</p>}
        {!data && !isLoading && (
          <p className={styles.noData}>Theres no data to be shown 😢</p>
        )}
      </div>
    </>
  );
}
