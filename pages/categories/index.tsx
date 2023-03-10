import Navbar from "../../components/Navbar";
import CategoryElement from "../../components/CategoryElement";
import styles from "./index.module.scss";
import Link from "next/link";
import { MyContext } from "../../components/CartContext";
import { useContext } from "react";

const Categories = () => {
  const categories = [
    {
      name: "Hair",
      img: "./hairCosmetics.jpeg",
      route: "categories/hair-care",
    },
    {
      name: "Skin",
      img: "./skinCosmetics.avif",
      route: "categories/skin-care",
    },
    { name: "Makeup", img: "./makeup.avif", route: "categories/makeup" },
  ];

  const context = useContext(MyContext);

  return (
    <>
      <Navbar itemsQuantity={context?.totalQuantity} />
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

export default Categories;
