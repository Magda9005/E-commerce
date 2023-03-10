import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useState, useContext } from "react";
import styles from "./SingleProductPage.module.scss";
import { MyContext } from "./CartContext";
import Cookies from "js-cookie";
import { useMutation } from "urql";
import {createCartMutation,addProductToCartMutation} from '../mutations/mutations';


const SingleProductPage = ({ productData }) => {
  const product = productData.data.product;
  const quantityOfFirstVariant =
    product.variants.edges[0].node.quantityAvailable;
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants.edges[0].node.id
  );
  const [price, setPrice] = useState(
    product.variants.edges[0].node.price.amount
  );
  const [availableQuantity, setAvailableQuantity] = useState(
    quantityOfFirstVariant
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const variants = product.variants.edges.map((variant) => {
    return variant.node.selectedOptions[0].value;
  });

  const cartContext = useContext(MyContext);
  const [createCartResult, createCart] = useMutation(createCartMutation);
  const [addProductResult, addProduct] = useMutation(addProductToCartMutation);
  // const { data, fetching, error } = createCartResult;

  const [size, setSize] = useState(variants[0]);

  const handleAddProductToCart = () => {
    //pobieramy z cookies Id koszyka
    const cartId = Cookies.get("cartId");

    //jeżeli nie ma w cookies koszyka, musimy utworzyc koszyk, pobrac z responsa id koszyka i ustawic jako cookies
    if (!cartId) {
      createCart({ selectedVariantId, selectedQuantity }).then((result) =>
        Cookies.set("cartId", result.data.cartCreate.cart.id)
      );
    }
    //jeżeli koszyk istnieje w cookies to dodajemy tylko produkt
    addProduct({ cartId, selectedQuantity, selectedVariantId });
  };

  return (
    <>
      <Navbar itemsQuantity={cartContext?.totalQuantity} />
      <div className={styles.container}>
        <ProductCard
          img={product.images.edges[0].node.url}
          productName={product.title}
          description={product.description}
          price={price}
          variants={variants}
          availableQuantity={availableQuantity}
          value={selectedQuantity}
          onValueChange={(val) => {
            setSelectedQuantity(val);
          }}
          onClick={handleAddProductToCart}
          variant={size}
          handleSelectChange={(value) => {
            const variants = product.variants.edges;
            for (let variant of variants) {
              if (variant.node.selectedOptions[0].value == value) {
                setSize(value);
                setPrice(variant.node.price.amount);
                setAvailableQuantity(variant.node.quantityAvailable);
                setSelectedVariantId(variant.node.id);
                setSelectedQuantity(1);
              }
            }
          }}
        />
      </div>
    </>
  );
};

export default SingleProductPage;
