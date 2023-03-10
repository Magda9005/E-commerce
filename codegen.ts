import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://skin-therapy-6413.myshopify.com/api/2023-01/graphql.json": {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": `6ed49a8426a76f3ebfce089ee7b70f69`,
      },
    },
  },
  documents:["pages/**/*.tsx","queries/**/*.tsx","mutations/**/*.tsx"] ,
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
