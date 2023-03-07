import Navbar from "../../components/Navbar";
import CategoryElement from "../../components/CategoryElement";
import styles from './index.module.scss';
import Link from "next/link";
// import { CartContext } from "../cart";
// import { useContext } from "react";

const Categories = () => {

    const categories = [
        { name: 'Hair', img: './hairCosmetics.jpeg', route: 'categories/hair-care' },
        { name: 'Skin', img: './skinCosmetics.avif', route: 'categories/skin-care' },
        { name: 'Makeup', img: './makeup.avif', route: 'categories/makeup' }
    ]
    // const itemsQuantity=useContext(CartContext)

    return (
        <>
            <Navbar itemsQuantity={10} />
            <div className={styles.container}>
                {categories.map(category => <Link href={`${category.route}`} className={styles.link}
                    key={category.name}
                >
                    <CategoryElement
                        img={category.img}
                        categoryName={category.name} />
                </Link>
                )}
            </div>
        </>
    )
}


export default Categories;

