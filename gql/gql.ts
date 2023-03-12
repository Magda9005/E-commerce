/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n              lines(first:10){\n                  edges{\n                      node{\n                          id\n                      }\n                  }\n              }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }":
    types.CartLinesRemoveDocument,
  "mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n       lines(first:20){\n                    edges{\n                        node{\n                            id\n                        }\n                    }\n                }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }":
    types.CartLinesUpdateDocument,
  "mutation createCart($selectedVariantId:ID!,$selectedQuantity:Int!) {\n    cartCreate(\n      input: {\n        lines: [\n          {\n            quantity: $selectedQuantity\n            merchandiseId: $selectedVariantId\n          }\n        ],\n      }\n    ) {\n      cart {\n        id\n        createdAt\n        updatedAt\n        lines(first: 10) {\n          edges {\n            node {\n              id\n              merchandise {\n                ... on ProductVariant {\n                  id\n                                  product{\n                                      title\n                                  }\n                }\n              }\n            }\n          }\n        }\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }":
    types.CreateCartDocument,
  "mutation AddProductToCart($cartId:ID!, $selectedQuantity:Int!,$selectedVariantId:ID!){\n    cartLinesAdd(cartId: $cartId, \n          lines: [\n              {\n                  merchandiseId: $selectedVariantId,      \n                  quantity: $selectedQuantity\n              }\n          ]\n      )\n      {\n      cart {\n        id\n        lines(first:10) {\n          edges {\n            node {\n              id\n              merchandise {\n                ... on ProductVariant {\n                  id\n                }\n              }\n            }\n          }\n        }\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n  ":
    types.AddProductToCartDocument,
  "mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {\n    checkoutCreate(input: {\n      lineItems: $lineItems\n    }) {\n      checkout {\n         id\n         webUrl\n         lineItems(first: 30) {\n           edges {\n             node {\n               title\n               quantity\n             }\n           }\n         }\n      }\n    }\n  }":
    types.CheckoutCreateDocument,
  "\n  query GetSingleProduct($productName: String!) {\n    product(handle: $productName) {\n      id\n      title\n      handle\n      description\n      variants(first: 3) {\n        edges {\n          node {\n            id\n            quantityAvailable\n            selectedOptions {\n              value\n            }\n            price {\n              amount\n            }\n          }\n        }\n      }\n      images(first: 1) {\n        edges {\n          node {\n            url\n          }\n        }\n      }\n    }\n  }\n":
    types.GetSingleProductDocument,
  "\n  query GetProductsPaths {\n    products(first: 30) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          handle\n          description\n          variants(first: 1) {\n            edges {\n              node {\n                price {\n                  amount\n                }\n              }\n            }\n          }\n          images(first: 1) {\n            edges {\n              node {\n                url\n              }\n            }\n          }\n          collections(first: 3) {\n            edges {\n              node {\n                handle\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n":
    types.GetProductsPathsDocument,
  "query GetProductsByCollection($categoryName:String!){\n  collection(handle:$categoryName){\n products(first:3){\n    pageInfo {\n     hasNextPage\n     endCursor\n   }\n     edges {\n       node {\n         id\n         title\n                     handle\n         description\n         variants(first: 1) {\n     edges {\n       node {\n         price {\n           amount\n         }\n       }\n     }\n   }\n         images(first:1){\n     edges {\n       node{\n         url\n       }\n     }\n   }\n       }\n     }\n   \n   }\n }\n \n}":
    types.GetProductsByCollectionDocument,
  "query GetCart($cartId:ID!){\n  cart(id: $cartId) {\n  id\ncost{\ntotalAmount {\namount\ncurrencyCode\n}\n}\n      totalQuantity\n  createdAt\n  updatedAt\n  lines(first: 10) {\n    edges {\n      node {\n        id\n        cost{\n          totalAmount{\n            amount\n            currencyCode\n          }\n        }\n        merchandise {\n            ... on ProductVariant {\n              id\n              quantityAvailable\n                              product {\n                                  title\n                                  handle\n                                  images(first:1){\n                                    edges {\n                                      node{\n                                        url\n                                      }\n                                    }\n                                  }\n                              }\n                              title\n                              price {\n                                amount\n                              }\n            }\n          }\n        quantity\n      }\n    }\n  }\n}\n}\n        ":
    types.GetCartDocument,
  "query GetFirst3Products {\n  products(first: 3) {\n   pageInfo {\n    hasNextPage\n    endCursor\n  }\n    edges {\n      node {\n        id\n        title\n        handle\n        description\n        variants(first: 1) {\n    edges {\n      node {\n        price {\n          amount\n        }\n      }\n    }\n  }\n        images(first:1){\n    edges {\n      node{\n        url\n      }\n    }\n  }\n      }\n    }\n  \n  }\n}\n":
    types.GetFirst3ProductsDocument,
  "query GetNextProducts($cursorRef:String!) {\n  products(first: 3,after:$cursorRef) {\n   pageInfo {\n    hasNextPage\n    endCursor\n  }\n    edges {\n      node {\n        id\n        title\n        handle\n        description\n        variants(first: 1) {\n    edges {\n      node {\n        price {\n          amount\n        }\n      }\n    }\n  }\n        images(first:1){\n    edges {\n      node{\n        url\n      }\n    }\n  }\n      }\n    }\n  \n  }\n}\n":
    types.GetNextProductsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n              lines(first:10){\n                  edges{\n                      node{\n                          id\n                      }\n                  }\n              }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }"
): (typeof documents)["mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n              lines(first:10){\n                  edges{\n                      node{\n                          id\n                      }\n                  }\n              }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n       lines(first:20){\n                    edges{\n                        node{\n                            id\n                        }\n                    }\n                }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }"
): (typeof documents)["mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n       lines(first:20){\n                    edges{\n                        node{\n                            id\n                        }\n                    }\n                }\n      }\n      userErrors {\n        field\n        message\n      }\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation createCart($selectedVariantId:ID!,$selectedQuantity:Int!) {\n    cartCreate(\n      input: {\n        lines: [\n          {\n            quantity: $selectedQuantity\n            merchandiseId: $selectedVariantId\n          }\n        ],\n      }\n    ) {\n      cart {\n        id\n        createdAt\n        updatedAt\n        lines(first: 10) {\n          edges {\n            node {\n              id\n              merchandise {\n                ... on ProductVariant {\n                  id\n                                  product{\n                                      title\n                                  }\n                }\n              }\n            }\n          }\n        }\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }"
): (typeof documents)["mutation createCart($selectedVariantId:ID!,$selectedQuantity:Int!) {\n    cartCreate(\n      input: {\n        lines: [\n          {\n            quantity: $selectedQuantity\n            merchandiseId: $selectedVariantId\n          }\n        ],\n      }\n    ) {\n      cart {\n        id\n        createdAt\n        updatedAt\n        lines(first: 10) {\n          edges {\n            node {\n              id\n              merchandise {\n                ... on ProductVariant {\n                  id\n                                  product{\n                                      title\n                                  }\n                }\n              }\n            }\n          }\n        }\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation AddProductToCart($cartId:ID!, $selectedQuantity:Int!,$selectedVariantId:ID!){\n    cartLinesAdd(cartId: $cartId, \n          lines: [\n              {\n                  merchandiseId: $selectedVariantId,      \n                  quantity: $selectedQuantity\n              }\n          ]\n      )\n      {\n      cart {\n        id\n        lines(first:10) {\n          edges {\n            node {\n              id\n              merchandise {\n                ... on ProductVariant {\n                  id\n                }\n              }\n            }\n          }\n        }\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n  "
): (typeof documents)["mutation AddProductToCart($cartId:ID!, $selectedQuantity:Int!,$selectedVariantId:ID!){\n    cartLinesAdd(cartId: $cartId, \n          lines: [\n              {\n                  merchandiseId: $selectedVariantId,      \n                  quantity: $selectedQuantity\n              }\n          ]\n      )\n      {\n      cart {\n        id\n        lines(first:10) {\n          edges {\n            node {\n              id\n              merchandise {\n                ... on ProductVariant {\n                  id\n                }\n              }\n            }\n          }\n        }\n        cost {\n          totalAmount {\n            amount\n            currencyCode\n          }\n          subtotalAmount {\n            amount\n            currencyCode\n          }\n        }\n      }\n    }\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {\n    checkoutCreate(input: {\n      lineItems: $lineItems\n    }) {\n      checkout {\n         id\n         webUrl\n         lineItems(first: 30) {\n           edges {\n             node {\n               title\n               quantity\n             }\n           }\n         }\n      }\n    }\n  }"
): (typeof documents)["mutation checkoutCreate($lineItems: [CheckoutLineItemInput!]!) {\n    checkoutCreate(input: {\n      lineItems: $lineItems\n    }) {\n      checkout {\n         id\n         webUrl\n         lineItems(first: 30) {\n           edges {\n             node {\n               title\n               quantity\n             }\n           }\n         }\n      }\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetSingleProduct($productName: String!) {\n    product(handle: $productName) {\n      id\n      title\n      handle\n      description\n      variants(first: 3) {\n        edges {\n          node {\n            id\n            quantityAvailable\n            selectedOptions {\n              value\n            }\n            price {\n              amount\n            }\n          }\n        }\n      }\n      images(first: 1) {\n        edges {\n          node {\n            url\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetSingleProduct($productName: String!) {\n    product(handle: $productName) {\n      id\n      title\n      handle\n      description\n      variants(first: 3) {\n        edges {\n          node {\n            id\n            quantityAvailable\n            selectedOptions {\n              value\n            }\n            price {\n              amount\n            }\n          }\n        }\n      }\n      images(first: 1) {\n        edges {\n          node {\n            url\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query GetProductsPaths {\n    products(first: 30) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          handle\n          description\n          variants(first: 1) {\n            edges {\n              node {\n                price {\n                  amount\n                }\n              }\n            }\n          }\n          images(first: 1) {\n            edges {\n              node {\n                url\n              }\n            }\n          }\n          collections(first: 3) {\n            edges {\n              node {\n                handle\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"
): (typeof documents)["\n  query GetProductsPaths {\n    products(first: 30) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          title\n          handle\n          description\n          variants(first: 1) {\n            edges {\n              node {\n                price {\n                  amount\n                }\n              }\n            }\n          }\n          images(first: 1) {\n            edges {\n              node {\n                url\n              }\n            }\n          }\n          collections(first: 3) {\n            edges {\n              node {\n                handle\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetProductsByCollection($categoryName:String!){\n  collection(handle:$categoryName){\n products(first:3){\n    pageInfo {\n     hasNextPage\n     endCursor\n   }\n     edges {\n       node {\n         id\n         title\n                     handle\n         description\n         variants(first: 1) {\n     edges {\n       node {\n         price {\n           amount\n         }\n       }\n     }\n   }\n         images(first:1){\n     edges {\n       node{\n         url\n       }\n     }\n   }\n       }\n     }\n   \n   }\n }\n \n}"
): (typeof documents)["query GetProductsByCollection($categoryName:String!){\n  collection(handle:$categoryName){\n products(first:3){\n    pageInfo {\n     hasNextPage\n     endCursor\n   }\n     edges {\n       node {\n         id\n         title\n                     handle\n         description\n         variants(first: 1) {\n     edges {\n       node {\n         price {\n           amount\n         }\n       }\n     }\n   }\n         images(first:1){\n     edges {\n       node{\n         url\n       }\n     }\n   }\n       }\n     }\n   \n   }\n }\n \n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetCart($cartId:ID!){\n  cart(id: $cartId) {\n  id\ncost{\ntotalAmount {\namount\ncurrencyCode\n}\n}\n      totalQuantity\n  createdAt\n  updatedAt\n  lines(first: 10) {\n    edges {\n      node {\n        id\n        cost{\n          totalAmount{\n            amount\n            currencyCode\n          }\n        }\n        merchandise {\n            ... on ProductVariant {\n              id\n              quantityAvailable\n                              product {\n                                  title\n                                  handle\n                                  images(first:1){\n                                    edges {\n                                      node{\n                                        url\n                                      }\n                                    }\n                                  }\n                              }\n                              title\n                              price {\n                                amount\n                              }\n            }\n          }\n        quantity\n      }\n    }\n  }\n}\n}\n        "
): (typeof documents)["query GetCart($cartId:ID!){\n  cart(id: $cartId) {\n  id\ncost{\ntotalAmount {\namount\ncurrencyCode\n}\n}\n      totalQuantity\n  createdAt\n  updatedAt\n  lines(first: 10) {\n    edges {\n      node {\n        id\n        cost{\n          totalAmount{\n            amount\n            currencyCode\n          }\n        }\n        merchandise {\n            ... on ProductVariant {\n              id\n              quantityAvailable\n                              product {\n                                  title\n                                  handle\n                                  images(first:1){\n                                    edges {\n                                      node{\n                                        url\n                                      }\n                                    }\n                                  }\n                              }\n                              title\n                              price {\n                                amount\n                              }\n            }\n          }\n        quantity\n      }\n    }\n  }\n}\n}\n        "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetFirst3Products {\n  products(first: 3) {\n   pageInfo {\n    hasNextPage\n    endCursor\n  }\n    edges {\n      node {\n        id\n        title\n        handle\n        description\n        variants(first: 1) {\n    edges {\n      node {\n        price {\n          amount\n        }\n      }\n    }\n  }\n        images(first:1){\n    edges {\n      node{\n        url\n      }\n    }\n  }\n      }\n    }\n  \n  }\n}\n"
): (typeof documents)["query GetFirst3Products {\n  products(first: 3) {\n   pageInfo {\n    hasNextPage\n    endCursor\n  }\n    edges {\n      node {\n        id\n        title\n        handle\n        description\n        variants(first: 1) {\n    edges {\n      node {\n        price {\n          amount\n        }\n      }\n    }\n  }\n        images(first:1){\n    edges {\n      node{\n        url\n      }\n    }\n  }\n      }\n    }\n  \n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetNextProducts($cursorRef:String!) {\n  products(first: 3,after:$cursorRef) {\n   pageInfo {\n    hasNextPage\n    endCursor\n  }\n    edges {\n      node {\n        id\n        title\n        handle\n        description\n        variants(first: 1) {\n    edges {\n      node {\n        price {\n          amount\n        }\n      }\n    }\n  }\n        images(first:1){\n    edges {\n      node{\n        url\n      }\n    }\n  }\n      }\n    }\n  \n  }\n}\n"
): (typeof documents)["query GetNextProducts($cursorRef:String!) {\n  products(first: 3,after:$cursorRef) {\n   pageInfo {\n    hasNextPage\n    endCursor\n  }\n    edges {\n      node {\n        id\n        title\n        handle\n        description\n        variants(first: 1) {\n    edges {\n      node {\n        price {\n          amount\n        }\n      }\n    }\n  }\n        images(first:1){\n    edges {\n      node{\n        url\n      }\n    }\n  }\n      }\n    }\n  \n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
