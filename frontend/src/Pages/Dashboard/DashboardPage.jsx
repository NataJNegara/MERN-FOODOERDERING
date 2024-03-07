import { useUser } from "../../features/auth/useUser";
import {
  IoCartOutline,
  IoFastFoodOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import styles from "./DashboardPage.module.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";

const contenItem = [
  { title: "Orders", icon: <IoCartOutline />, url: "/orders" },
  { title: "Profile", icon: <IoPersonOutline />, url: "/profile" },
  {
    title: "Users",
    icon: <IoPeopleOutline />,
    url: "/admin/users",
    forAdmin: true,
  },
  {
    title: "Foods",
    icon: <IoFastFoodOutline />,
    url: "/admin/foods",
    forAdmin: true,
  },
];

export default function DashboardPage() {
  const { user, isLoading } = useUser();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        {contenItem
          .filter((item) => user.isAdmin || !item.forAdmin)
          .map((item) => (
            <Link to={item.url} key={item.title} className={styles.link}>
              {item.icon}
              <h2>{item.title}</h2>
            </Link>
          ))}
      </div>
    </div>
  );
}
