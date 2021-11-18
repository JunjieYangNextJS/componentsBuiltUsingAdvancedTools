import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider as ReduxProvider } from "react-redux";
import userReducer from "./../features/user";
import themeReducer from "./../features/theme";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});

const client = new ApolloClient({
  uri: "https://graphql-compose.herokuapp.com/northwind",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
}

export default MyApp;
