import { useState, useContext } from "react";
import ListElement from "../../../components/ListElement";
import Navbar from "../../../components/Navbar";
import styles from '../categoryName.module.scss';
import { MyContext } from "../../../components/CartContext";


export const getStaticPaths = async () => {
    return {
        paths: [
            { params: { categoryName: "skin-care" } },
            { params: { categoryName: "hair-care" } },
            { params: { categoryName: "makeup" } },
        ],
        fallback: false
    }
}

const ProductsListPerCategory = ({ data, categoryName }) => {

    const products = data.data.collection.products.edges
    const [productsList, setProductsList] = useState(products)
    const context = useContext(MyContext);

    return (
        <>
            <Navbar itemsQuantity={context?.totalQuantity} />
            <div className={styles.container}>
                {productsList.map(product => <ListElement
                    key={product.node.id}
                    img={product.node.images.edges[0].node.url}
                    productName={product.node.title}
                    price={product.node.variants.edges[0].node.price.amount}
                    description={product.node.description}
                    handle={`${categoryName}/${product.node.handle}`}
                />)}
            </div>
        </>
    )

}

export async function getStaticProps(context) {
    const categoryName = context.params.categoryName
    const url = process.env.NEXT_PUBLIC_API
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const variables = { categoryName };
    const query = `query GetProductsByCollection($categoryName:String!){
        collection(handle:$categoryName){
       products(first:3){
          pageInfo {
           hasNextPage
           endCursor
         }
           edges {
             node {
               id
               title
                           handle
               description
               variants(first: 1) {
           edges {
             node {
               price {
                 amount
               }
             }
           }
         }
               images(first:1){
           edges {
             node{
               url
             }
           }
         }
             }
           }
         
         }
       }
       
    }`
    const res = await fetch(url,
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "X-Shopify-Storefront-Access-Token": token
            },
            body: JSON.stringify({
                query,
                variables
            })
        })
    const data = await res.json();

    return {
        props: {
            data,
            categoryName
        },
    }
}


export default ProductsListPerCategory;