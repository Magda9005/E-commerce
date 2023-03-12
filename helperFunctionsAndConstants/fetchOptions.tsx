const url = process.env.NEXT_PUBLIC_API;
const token = process.env.NEXT_PUBLIC_API_TOKEN;
export const fetchOptions = {
  url: url || "",
  fetchOptions: () => {
    return {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": `${token}`,
      },
    };
  },
};
