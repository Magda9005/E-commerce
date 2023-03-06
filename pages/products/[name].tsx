import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import styles from './name.module.scss';
import { useState,useContext } from "react";
// import { CartContext } from "../cart";

export const getStaticPaths = async () => {
  const url = process.env.NEXT_PUBLIC_API
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  const query = ` {
      products(first: 30) {
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
  `
  const res = await fetch(url,
    {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "X-Shopify-Storefront-Access-Token": token
      },
      body: JSON.stringify({
        query: query
      })
    })
  const data = await res.json()
  const products = data.data.products.edges
  const paths = products.map(product => {
    return {
      params: { name: product.node.handle }
    }
  })


  return {
    paths: paths,
    fallback: false
  }
}
const ProductPage = ({ data }) => {
  const product = data.data.product;
  const quantityOfFirstVariant = product.variants.edges[0].node.quantityAvailable;
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants.edges[0].node.id);
  const [price, setPrice] = useState(product.variants.edges[0].node.price.amount);
  const [availableQuantity, setAvailableQuantity] = useState(quantityOfFirstVariant);
  const [quantity, setQuantity] = useState(1)
// const itemsQuantity=useContext(CartContext)
  const variants = product.variants.edges.map(variant => {
    return variant.node.selectedOptions[0].value
  })


  const handleAddProductToCart = () => {
    console.log(selectedVariantId, quantity)

  }

  return (
    <>
      <Navbar itemsQuantity={10}/>
      <div className={styles.container}>
        <ProductCard img={product.images.edges[0].node.url}
          productName={product.title}
          description={product.description}
          price={price}
          defaultVariantValue={variants[0]}
          variants={variants}
          availableQuantity={availableQuantity}
          value={quantity}
          onValueChange={(val) => setQuantity(val)}
          onClick={handleAddProductToCart}
          handleRadioChange={(value) => {
            const variants = product.variants.edges;
            for (let variant of variants) {
              if (variant.node.selectedOptions[0].value == value) {
                setPrice(variant.node.price.amount);
                setAvailableQuantity(variant.node.quantityAvailable);
                setSelectedVariantId(variant.node.id)
              }
            }
          }}
        />
      </div>
    </>
  )
}
export async function getStaticProps(context) {
  const productName = context.params.name;

  const url = process.env.NEXT_PUBLIC_API
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  const variables = { productName };
  const query = `query GetSingleProduct($productName:String!){
        product(handle: $productName){
               id
               title
               handle
               description
               variants(first: 3) {
           edges {
             node {
              id
              quantityAvailable
							selectedOptions {
            value
          }
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
         `
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
      data
    },
  }
}

export default ProductPage;