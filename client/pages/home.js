import { useQuery } from "@apollo/client";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { postsQuery } from "../graphql/queries/post";

function Home() {
	const { data, loading } = useQuery(postsQuery);

	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<div className="w-4/5 mx-auto my-4">
				<div className="grid grid-cols-3 gap-3 auto-rows-0.5fr">
					{loading ? (
						<div className="col-start-2 col-end-2 w-20 mt-40 mx-auto">
							<img src="/assets/loader.gif" alt="blue-spinner" />
						</div>
					) : (
						data.posts.map((post) => <Post key={post.id} post={post} />)
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
