import Navbar from "../../components/Navbar";
import CategoryElement from "../../components/CategoryElement";
import styles from "./index.module.scss";
import Link from "next/link";
import useCart from "../../hooks/useCart";
import { categories } from "../../helperFunctionsAndConstants/constants";
import { withUrqlClient } from "next-urql";
import { fetchOptions } from "../../helperFunctionsAndConstants/fetchOptions";

const Categories = () => {
  const context = useCart();

  return (
    <>
      <Navbar itemsQuantity={context.totalQuantity} />
      <div className={styles.container}>
        {categories.map((category) => (
          <Link
            href={`${category.route}`}
            className={styles.link}
            key={category.name}
          >
            <CategoryElement img={category.img} categoryName={category.name} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default withUrqlClient((ssr) => ({ ...fetchOptions }))(Categories);

