import CartContext from '../components/CartContext';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'https://skin-therapy-6413.myshopify.com/api/2023-01/graphql.json',
  fetchOptions: () => {
    const token = '6ed49a8426a76f3ebfce089ee7b70f69'
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `${token}`,
      },
    };
  },
});

export default function MyApp({ Component, pageProps,children }) {

  return (
    <Provider value={client}>
      <CartContext>
        {children}
      </CartContext>
      <Component {...pageProps} />
    </Provider>
  )
}



