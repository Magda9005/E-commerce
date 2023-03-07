import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useState } from "react";
import styles from './SingleProductPage.module.scss';

const SingleProductPage = ({ data }) => {
    const product = data.data.product;
    const quantityOfFirstVariant = product.variants.edges[0].node.quantityAvailable;
    const [selectedVariantId, setSelectedVariantId] = useState(null);
    const [price, setPrice] = useState(product.variants.edges[0].node.price.amount);
    const [availableQuantity, setAvailableQuantity] = useState(quantityOfFirstVariant);
    const [quantity, setQuantity] = useState(1)
    const variants = product.variants.edges.map(variant => {
      return variant.node.selectedOptions[0].value
    })
    // const[size,setSize]=useState(product.variants.edges[0].node.title)
  
    // console.log(size)
    //co zrobic z tym jak ktos da null w produkcie?
    //tu potrzebowałabym skorzystać z kontekstu 
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
            variants={variants}
            availableQuantity={availableQuantity}
            value={quantity}
            onValueChange={(val) => setQuantity(val)}
            onClick={handleAddProductToCart}
            // size={size}
            handleSelectChange={(value) => {
              const variants = product.variants.edges;
              for (let variant of variants) {
                if (variant.node.selectedOptions[0].value == value) {
//   setSize(value)
                  setPrice(variant.node.price.amount);
                  setAvailableQuantity(variant.node.quantityAvailable);
                  setSelectedVariantId(variant.node.id)
                  setQuantity(1);
                }
              }
            }}
          />
        </div>
      </>
    )
  }

  export default SingleProductPage;