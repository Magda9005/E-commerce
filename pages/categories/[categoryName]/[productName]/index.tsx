import SingleProductPage from "../../../../components/SingleProductPage";

export const getStaticPaths = async () => {
    const url = process.env.NEXT_PUBLIC_API
    const token = process.env.NEXT_PUBLIC_API_TOKEN;
    const query = `{
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
							collections(first: 3) {
          edges {
            node {
              handle
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
                query: query
            })
        })
    const data = await res.json()
    const products = data.data.products.edges
    const paths = products.map(product => {
        return {
            params: { categoryName: product.node.collections.edges[0].node.handle, productName: product.node.handle }
        }
    })


    return {
        paths: paths,
        fallback: false
    }
}

const ProductPage = ({ data }) => (<SingleProductPage productData={data} />)

export async function getStaticProps(context) {
    const productName = context.params.productName;
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