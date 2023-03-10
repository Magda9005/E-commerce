import SingleProductPage from "../../components/SingleProductPage";
import { GetStaticProps,GetStaticPaths } from "next";
import { withUrqlClient, initUrqlClient } from "next-urql";
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery,
} from "urql";
import { fetchOptions } from "../../helperFunctions/fetchOptions";
import { getSingleProductQuery, getProductsPathsQuery } from "../../queries/queries";
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

export const getStaticPaths:GetStaticPaths = async () => {
  const client = createClient({ ...fetchOptions });

  const data = await client.query(getProductsPathsQuery,{}).toPromise();

  const products =data.data.products.edges;
  const paths = products.map((product) => {
    return {
      params: { name: product.node.handle },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps:GetStaticProps=async(context)=> {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: fetchOptions.url,
      fetchOptions: fetchOptions.fetchOptions,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );
  const productName = context?.params?.name as string;
  const variables = { productName };

  await client?.query(getSingleProductQuery, variables).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      productName,
    },
    revalidate: 600,
  };
}

export default withUrqlClient((ssr) => ({ ...fetchOptions }))(ProductPage);
