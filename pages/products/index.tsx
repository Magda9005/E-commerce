import Navbar from "../../components/Navbar";
import ListElement from "../../components/ListElement";
import styles from "./index.module.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { withUrqlClient, initUrqlClient } from "next-urql";
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
} from "urql";
import { fetchOptions } from "../../helperFunctions/fetchOptions";
import { getFirst3productsQuery,query } from '../../queries/queries';
import { GetStaticProps } from "next";
import useCart from "../../hooks/useCart";


const ProductsList = () => {

  const [data]=useQuery({
    query: getFirst3productsQuery
  });

  const products = data?.data?.products.edges;
  const [productsList, setProductsList] = useState(products);
  const cursorRef = useRef(data?.data?.products.pageInfo.endCursor);
  const hasNextPageRef = useRef(data?.data?.products.pageInfo.hasNextPage);
  const itemsQuantity = useCart();

  const getNextProducts = async (cursorRef: string) => {
    const url = process.env.NEXT_PUBLIC_API as string;
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    
    const variables = { cursorRef };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await res.json();

    setProductsList([...productsList, ...data.data.products.edges]);

    const newCursorRef = data.data.products.pageInfo.endCursor;
    const hasNextPage = data.data.products.pageInfo.hasNextPage;
    return { newCursorRef, hasNextPage };
  };

  return (
    <>
      <Navbar itemsQuantity={itemsQuantity.totalQuantity} />
      <div className={styles.container}>
        {productsList.map((product) => (
          <ListElement
            key={product.node.id}
            img={product.node.images.edges[0].node.url}
            productName={product.node.title}
            price={product.node.variants.edges[0].node.price.amount}
            description={product.node.description}
            handle={`products/${product.node.handle}`}
          />
        ))}
      </div>
      {hasNextPageRef.current && (
        <Button
          className={styles.loadMoreButton}
          variant="outlined"
          onClick={() => {
            if(cursorRef.current){
              getNextProducts(cursorRef.current).then((res) => {
                cursorRef.current = res.newCursorRef;
                hasNextPageRef.current = res.hasNextPage;
              });
            }
          }}
        >
          Load More
        </Button>
      )}
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

  const response = await client?.query(getFirst3productsQuery, {}).toPromise()

  if (response?.error) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
}
export default withUrqlClient((ssr) => ({ ...fetchOptions }))(ProductsList);
