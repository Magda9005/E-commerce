import Image from "next/image";
import styles from "./MainPage.module.scss";
import Link from "next/link";

const MainPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.mainPageComponent}>
        <div className={styles.imgWrapper}>
          <Image
            src="/main-page-photo.jpg"
            alt="Hands using a serum"
            fill={true}
            priority={true}
          />
        </div>
        <div className={styles.container}>
          <h1 className={styles.welcomeText}>Welcome to the Skin Therapy</h1>
          <button className={styles.discoverProductsBtn}>
            <Link href="/products" className={styles.link}>
              {" "}
              Discover our products
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
};

export default MainPage;
