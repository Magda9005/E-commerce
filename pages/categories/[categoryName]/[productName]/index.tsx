import SingleProductPage from "../../../../components/SingleProductPage";
import { GetStaticProps } from "next";
import { withUrqlClient, initUrqlClient } from "next-urql";
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
  Client,
} from "urql";
import { fetchOptions } from "../../../../helperFunctionsAndConstants/fetchOptions";
import {
  getSingleProductQuery,
  getProductsPathsQuery,
} from "../../../../queries/queries";
import { createClient } from "urql";

interface Props {
  productName: string;
}

const ProductPage = ({ productName }: Props) => {
  const [res] = useQuery({
    query: getSingleProductQuery,
    variables: { productName },
  });

  return <SingleProductPage productData={res} />;
};

export const getStaticPaths = async () => {
  const client = createClient({ ...fetchOptions });

  const data = await client.query(getProductsPathsQuery, {}).toPromise();

  const products = data.data ? data.data.products.edges : [];
  const paths = products.map((product) => {
    return {
      params: {
        categoryName: product.node.collections.edges[0].node.handle,
        productName: product.node.handle,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
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
  ) as Client;

  const productName = context.params?.productName as string;
  const variables = { productName };

  const response = await client
    .query(getSingleProductQuery, variables)
    .toPromise();

  if (response.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      urqlState: ssrCache.extractData(),
      productName,
    },
    revalidate: 600,
  };
};

export default withUrqlClient((ssr) => ({ ...fetchOptions }))(ProductPage);
