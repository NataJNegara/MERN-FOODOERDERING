import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { useUsers } from "../../features/auth/userUsers";
import { Link } from "react-router-dom";
import styles from "./UsersPage.module.css";
import { useBlock } from "../../features/auth/useBlock";
import { toast } from "react-toastify";
import { useUser } from "../../features/auth/useUser";

export default function UsersPage() {
  const { isLoading, users } = useUsers();
  const { isBlocking, block } = useBlock();
  const { isLoading: isLoadingUser, user: currUser } = useUser();

  function handleBlock(id) {
    block(id, {
      onSuccess: () => {
        toast.success(`User has been blocked`);
      },
    });
  }
  function handleOpenBlock(id) {
    block(id, {
      onSuccess: () => {
        toast.success(`User has been Unblocked`);
      },
    });
  }

  if (isLoading || isLoadingUser) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <h1>Users Management</h1>
      <div className={styles.table}>
        <div className={styles.list_header}>
          <h3>Name</h3>
          <h3>Email</h3>
          {/* <h3>Address</h3> */}
          <h3>Admin</h3>
          <h3>Actions</h3>
        </div>
        {users &&
          users.map((user) => (
            <div key={user._id} className={styles.list_row}>
              <p>{user.username}</p>
              <p>{user.email}</p>
              {/* <p>{user.address}</p> */}
              <p
                className={`${styles.status} ${
                  user.isAdmin ? styles.admin : ""
                }`}>
                {user.isAdmin ? "Admin" : "Default"}
              </p>
              <span>
                <Link
                  to={"/admin/update-user/" + user._id}
                  className={styles.edit_btn}>
                  Edit
                </Link>

                {currUser.email !== user.email && (
                  <button
                    onClick={() => {
                      user.isBlocked
                        ? handleOpenBlock(user._id)
                        : handleBlock(user._id);
                    }}
                    className={`${styles.button} ${
                      user.isBlocked ? styles.block_btn : ""
                    }`}
                    disabled={isBlocking}>
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                )}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
