import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { currentUserMutation } from "../graphql/mutations/user";
import { postsByUserIdQuery } from "../graphql/queries/post";

function Profile() {
	const [currentUser] = useMutation(currentUserMutation);
	const { data, loading } = useQuery(postsByUserIdQuery, {
		fetchPolicy: "no-cache",
	});
	const [userLoggedIn, setUserLoggedIn] = useState("");

	useEffect(() => {
		const getCurrentUser = async () => {
			const user = await currentUser();
			setUserLoggedIn(user.data.currentUser);
		};
		getCurrentUser();
	}, []);

	return (
		<div>
			<Head>
				<title>
					{!userLoggedIn
						? "Loading..."
						: userLoggedIn.fullName + " - " + userLoggedIn.username}
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar addPhoto={true} />
			{!userLoggedIn ? (
				<div className="col-start-2 col-end-2 w-20 mt-40 mx-auto">
					<img src="/assets/loader.gif" alt="blue-spinner" />
				</div>
			) : (
				<div className="w-4/5 mx-auto my-4 text-center">
					<div className="w-1/5 mx-auto overflow-hidden rounded">
						{userLoggedIn.imageUrl ? (
							<img src={userLoggedIn.imageUrl} alt="profile-pic" />
						) : (
							<img src="/assets/default-dp.jpg" alt="profile-pic" />
						)}
					</div>
					<div className="text-xl mt-2">
						<p>{userLoggedIn.fullName}</p>
					</div>
					<div className="text-gray-500">
						<p>@{userLoggedIn.username}</p>
					</div>
					<div className="mt-3 mb-5 w-max bg-black text-white mx-auto px-3 py-1 rounded">
						<p>
							<span className="font-semibold">
								{loading ? 0 : data.postsByUserId.length}
							</span>{" "}
							Pics
						</p>
					</div>
					<div className="grid grid-cols-3 gap-3 auto-rows-0.5fr">
						{loading ? (
							<div className="col-start-2 col-end-2 w-20 mt-40 mx-auto">
								<img src="/assets/loader.gif" alt="blue-spinner" />
							</div>
						) : (
							data.postsByUserId.map((post) => (
								<Post key={post.id} post={post} />
							))
						)}
					</div>
				</div>
			)}
		</div>
	);
}

export default Profile;
