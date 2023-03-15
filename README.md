# E-commerce Skin Therapy

Application using static site generation (SSG), created in React and Next.js, using TypeScript.

## Libraries and technologies used while working on the project

- Next.js for Static Site Generation 
- TypeScript to create type safe components
- Shopify Storefront GraphQL API
- Material UI for styled components
- GraphQL Code Generator to get the requests and responses typed
- URQL to interact with Storefront API
- Insomnia to test API requests
- js-cookie to get and set cookies on the client side
- use-debounce to optimize the  shopping cart updates
- Prettier to keep the code well formatted
- Sass to style components using modules

### How to setup the project:

1. In the `.env` file you will find the environment variables which are necessary to be set:

- `NEXT_PUBLIC_API_TOKEN`
- `NEXT_PUBLIC_API`

In order to get API endpoint and access token you can follow the Shopify Storefront GraphQL API documentation.

2. Install dependencies: `npm install`

3. Start the development server: `npm run dev`
