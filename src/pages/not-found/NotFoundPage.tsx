import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Sahifa topilmadi</h2>
        <p className={styles.text}>
          Siz qidirgan sahifa mavjud emas yoki o‘chirilgan.
        </p>

        <button className={styles.button} onClick={() => navigate("/login")}>
          Login sahifaga qaytish
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
