import type { CodegenConfig } from "@graphql-codegen/cli";
require('dotenv').config();


const config: CodegenConfig = {
  overwrite: true,
  schema: {
   [process.env.API as string]: {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": `${process.env.API_TOKEN}`,
      },
    },
  },
  documents: ["pages/**/*.tsx", "queries/**/*.tsx", "mutations/**/*.tsx"],
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
};

export default config;
