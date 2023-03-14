import type { CodegenConfig } from "@graphql-codegen/cli";
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });


const config: CodegenConfig = {
  overwrite: true,
  schema: {
   [process.env.NEXT_PUBLIC_API as string]: {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": `${process.env.NEXT_PUBLIC_API_TOKEN}`,
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
