import Navbar from "./Navbar";
import ProductCard from "./ProductCard";
import { useState } from "react";
import styles from "./SingleProductPage.module.scss";
import Cookies from "js-cookie";
import { cacheExchange, useMutation, UseQueryState } from "urql";
import {
  createCartMutation,
  addProductToCartMutation,
} from "../mutations/mutations";
import { GetSingleProductQuery } from "../gql/graphql";
import useCart from "../hooks/useCart";

interface Props {
  productData: UseQueryState<GetSingleProductQuery, { productName: string }>;
}

const SingleProductPage = ({ productData }: Props) => {
  const cartContext = useCart();
  const product = productData?.data?.product;
  const quantityOfFirstVariant =
    product?.variants.edges[0].node.quantityAvailable;
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants.edges[0].node.id
  );
  const [price, setPrice] = useState(
    product?.variants.edges[0].node.price.amount
  );
  const [availableQuantity, setAvailableQuantity] = useState(
    quantityOfFirstVariant
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const variants = product?.variants.edges.map((variant) => {
    return variant.node.selectedOptions[0].value;
  });
  const [size, setSize] = useState(variants ? variants[0] : "");

  const [errorMessage, setErrorMessage] = useState(false);
  const [createCartResult, createCart] = useMutation(createCartMutation);
  const [addProductResult, addProduct] = useMutation(addProductToCartMutation);
  const { data, fetching, error } = addProductResult;

  const handleAddProductToCart = () => {
    const cartId = Cookies.get("cartId") as string;

    if (selectedVariantId) {
      if (!cartId) {
        return createCart({ selectedVariantId, selectedQuantity }).then(
          (result) => {
            if (result.data && result.data.cartCreate?.cart) {
              Cookies.set("cartId", result.data.cartCreate.cart.id);
            }
          }
        );
      }

      addProduct({ cartId, selectedQuantity, selectedVariantId }).then(
        (result) => {
          if (result.error) {
            setErrorMessage(true);
          }
        }
      );
    }
    setErrorMessage(false);
  };

  return (
    <>
      <Navbar itemsQuantity={cartContext.totalQuantity} />
      <div className={styles.container}>
        {product && variants && availableQuantity && (
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
            error={error}
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
        )}
      </div>
    </>
  );
};

export default SingleProductPage;
