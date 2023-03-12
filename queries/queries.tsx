import { graphql } from "../gql/gql";

export const getSingleProductQuery = graphql(/* GraphQL */ `
  query GetSingleProduct($productName: String!) {
    product(handle: $productName) {
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
      images(first: 1) {
        edges {
          node {
            url
          }
        }
      }
    }
  }
`);

export const getProductsPathsQuery = graphql(/* GraphQL */ `
  query GetProductsPaths {
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
          images(first: 1) {
            edges {
              node {
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
  }
`);

export const getProductsByCollectionQuery =graphql(/* GraphQL */ `query GetProductsByCollection($categoryName:String!){
  collection(handle:$categoryName){
 products(first:3){
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
 
}`
);

export const getCart =graphql(/* GraphQL */ `query GetCart($cartId:ID!){
  cart(id: $cartId) {
  id
cost{
totalAmount {
amount
currencyCode
}
}
      totalQuantity
  createdAt
  updatedAt
  lines(first: 10) {
    edges {
      node {
        id
        cost{
          totalAmount{
            amount
            currencyCode
          }
        }
        merchandise {
            ... on ProductVariant {
              id
              quantityAvailable
                              product {
                                  title
                                  handle
                                  images(first:1){
                                    edges {
                                      node{
                                        url
                                      }
                                    }
                                  }
                              }
                              title
                              price {
                                amount
                              }
            }
          }
        quantity
      }
    }
  }
}
}
        `);

export const getFirst3productsQuery =graphql(/* GraphQL */ `query GetFirst3Products {
  products(first: 3) {
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
`);


export const query = `query GetNextProducts($cursorRef:String!) {
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

export const getNextProducts=graphql(/* GraphQL */`query GetNextProducts($cursorRef:String!) {
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
`);