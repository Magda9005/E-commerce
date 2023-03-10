import { useState, useContext } from "react";
import { GetStaticProps } from "next";
import ListElement from "../../../components/ListElement";
import Navbar from "../../../components/Navbar";
import styles from "../categoryName.module.scss";
import { MyContext } from "../../../components/CartContext";
import { withUrqlClient, initUrqlClient } from "next-urql";
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
} from "urql";
import { fetchOptions } from "../../../helperFunctions/fetchOptions";
import { getProductsByCollectionQuery } from "../../../queries/queries";

interface Props {
  categoryName: string
}

const ProductsListPerCategory = ({ categoryName }: Props) => {
  const [data] = useQuery({
    query: getProductsByCollectionQuery,
    variables: { categoryName },
  });
  const context = useContext(MyContext);

  const products = data?.data?.collection?.products.edges ;
  const [productsList, setProductsList] = useState(products);

  return (
    <>
      <Navbar itemsQuantity={context?.totalQuantity} />
      <div className={styles.container}>
        {productsList && productsList.map((product) => (
          <ListElement
            key={product.node.id}
            img={product.node.images.edges[0].node.url}
            productName={product.node.title}
            price={product.node.variants.edges[0].node.price.amount}
            description={product.node.description}
            handle={`${categoryName}/${product.node.handle}`}
          />
        ))}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: fetchOptions.url,
      fetchOptions: fetchOptions.fetchOptions,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );
  const categoryName = context?.params?.categoryName as string;
  const variables = { categoryName };

  await client?.query(getProductsByCollectionQuery, variables).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      categoryName,
    },
    revalidate: 600,
  };
}

export const getStaticPaths = async () => {
  return {
    paths: [
      { params: { categoryName: "skin-care" } },
      { params: { categoryName: "hair-care" } },
      { params: { categoryName: "makeup" } },
    ],
    fallback: false,
  };
};

export default withUrqlClient((ssr) => ({ ...fetchOptions }))(ProductsListPerCategory);
