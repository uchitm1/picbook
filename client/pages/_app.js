import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
	uri: "http://localhost:4000/graphql",
	credentials: "include",
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
