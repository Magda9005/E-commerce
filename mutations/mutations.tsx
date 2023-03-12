import { graphql } from "../gql/gql";

export const removeLine = graphql(/* GraphQL */ `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
              lines(first:10){
                  edges{
                      node{
                          id
                      }
                  }
              }
      }
      userErrors {
        field
        message
      }
    }
  }`);

export const updateSingleLineQuantity = graphql(/* GraphQL */ `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
       lines(first:20){
                    edges{
                        node{
                            id
                        }
                    }
                }
      }
      userErrors {
        field
        message
      }
    }
  }`);

export const createCartMutation = graphql(/* GraphQL */ `mutation createCart($selectedVariantId:ID!,$selectedQuantity:Int!) {
    cartCreate(
      input: {
        lines: [
          {
            quantity: $selectedQuantity
            merchandiseId: $selectedVariantId
          }
        ],
      }
    ) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                                  product{
                                      title
                                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }`);

export const addProductToCartMutation = graphql(/* GraphQL */ `mutation AddProductToCart($cartId:ID!, $selectedQuantity:Int!,$selectedVariantId:ID!){
    cartLinesAdd(cartId: $cartId, 
          lines: [
              {
                  merchandiseId: $selectedVariantId,      
                  quantity: $selectedQuantity
              }
          ]
      )
      {
      cart {
        id
        lines(first:10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
  `);

export const createCheckout = graphql(/* GraphQL */`mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: {
      lineItems: $lineItems
    }) {
      checkout {
         id
         webUrl
         lineItems(first: 30) {
           edges {
             node {
               title
               quantity
             }
           }
         }
      }
    }
  }`)