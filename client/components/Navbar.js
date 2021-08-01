import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPostMutation } from "../graphql/mutations/post";
import {
	currentUserMutation,
	logoutUserMutation,
} from "../graphql/mutations/user";
import { IoImage } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import { postsQuery } from "../graphql/queries/post";

function Navbar(props) {
	const [imageUrl, setImageUrl] = useState("");
	const [userLoggedIn, setUserLoggedIn] = useState("");
	const [isImageUrlInputOpen, setIsImageUrlInputOpen] = useState(false);
	const router = useRouter();
	const [createPost] = useMutation(createPostMutation, {
		variables: {
			createPost: {
				imageUrl,
			},
		},
		refetchQueries: [{ query: postsQuery }],
	});
	const [logoutUser] = useMutation(logoutUserMutation);
	const [currentUser] = useMutation(currentUserMutation);

	useEffect(() => {
		const getCurrentUser = async () => {
			const user = await currentUser();
			setUserLoggedIn(user.data.currentUser);
		};
		getCurrentUser();
	}, []);

	const addPhoto = () => {
		createPost();
		setImageUrl("");
	};

	const handleLogoutUser = async () => {
		await logoutUser()
			.then(() => router.push("/login"))
			.catch((err) => console.error(err));
	};

	return (
		<div className="flex items-center bg-black h-14 text-white px-36">
			<div className="flex items-center w-full">
				<div className="flex items-center text-white cursor-pointer">
					<IoImage />
					<Link href="/home">
						<p className="ml-2">Picbook</p>
					</Link>
				</div>
			</div>
			<div className="flex items-center justify-center relative w-full">
				{!props.addPhoto && (
					<>
						<div
							className="flex text-white hover:text-red-300 cursor-pointer"
							onClick={() => setIsImageUrlInputOpen((state) => !state)}
						>
							<p className="mx-4">Add Photo</p>
						</div>
						{isImageUrlInputOpen && (
							<div className="flex items-center text-black absolute top-10 rounded z-10 p-2 bg-black bg-opacity-70">
								<input
									type="text"
									className="w-96 px-3 py-1 rounded outline-none bg-white"
									value={imageUrl}
									onChange={(e) => setImageUrl(e.target.value)}
								></input>
								<TiPlus
									size={32}
									onClick={addPhoto}
									className="text-white bg-red-400 hover:bg-red-500 p-1 ml-2 rounded cursor-pointer"
								/>
							</div>
						)}
					</>
				)}
			</div>
			<div className="flex items-center w-full justify-end">
				<div className="mx-4 cursor-pointer">
					<Link href={`/${encodeURIComponent(userLoggedIn.username)}`}>
						<p className="text-white hover:text-red-300">
							{userLoggedIn.fullName}
						</p>
					</Link>
				</div>
				<div className="cursor-pointer hover:text-red-300">
					<IoMdLogOut size={20} onClick={handleLogoutUser} />
				</div>
			</div>
		</div>
	);
}

export default Navbar;
