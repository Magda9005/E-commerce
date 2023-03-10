import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import ListElement from "../../components/ListElement";
import styles from "./index.module.scss";
import * as React from "react";
import Button from "@mui/material/Button";
import { useRef, useState, useContext } from "react";
import { MyContext } from "../../components/CartContext";
import { withUrqlClient, initUrqlClient } from "next-urql";
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
} from "urql";
import { fetchOptions } from "../../helperFunctions/fetchOptions";
import {getFirst3productsQuery} from '../../queries/queries';

const query = `query GetNextProducts($cursorRef:String!) {
  products(first: 3,after:$cursorRef) {
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
`;

const ProductsList = () => {

  const [data]=useQuery({
    query: getFirst3productsQuery
  });

  const products = data.data.products.edges;
  const [productsList, setProductsList] = useState(products);
  const cursorRef = useRef(data.data.products.pageInfo.endCursor);
  const hasNextPageRef = useRef(data.data.products.pageInfo.hasNextPage);
  const itemsQuantity = useContext(MyContext);

  const getNextProducts = async (cursorRef: string) => {
    const url = process.env.NEXT_PUBLIC_API;
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
      <Navbar itemsQuantity={itemsQuantity?.totalQuantity} />
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
            getNextProducts(cursorRef.current).then((res) => {
              cursorRef.current = res.newCursorRef;
              hasNextPageRef.current = res.hasNextPage;
            });
          }}
        >
          Load More
        </Button>
      )}
    </>
  );
};

// export default ProductsList;

export async function getStaticProps(context) {
  // const url = process.env.NEXT_PUBLIC_API;
  // const token = process.env.NEXT_PUBLIC_API_TOKEN;
  
const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: fetchOptions.url,
      fetchOptions: fetchOptions.fetchOptions,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  await client?.query(getFirst3productsQuery).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
  // const res = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json",
  //     "X-Shopify-Storefront-Access-Token": token,
  //   },
  //   body: JSON.stringify({
  //     query: query,
  //   }),
  // });
  // const data = await res.json();

  // return {
  //   props: {
  //     data,
  //   },
  // };
}
export default withUrqlClient((ssr) => ({ ...fetchOptions }))(ProductsList);
