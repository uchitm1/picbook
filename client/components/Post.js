import { useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";

function Post(props) {
	const { post } = props;
	const [isPortrait, setIsPortrait] = useState(null);

	useEffect(() => {
		const image = document.createElement("img");
		image.src = post.imageUrl;
		if (image.width > image.height) {
			setIsPortrait(false);
		} else {
			setIsPortrait(true);
		}
	}, []);

	return (
		<div
			className={
				isPortrait
					? "col-span-1 row-span-2 overflow-hidden rounded relative"
					: "col-span-1 row-span-1 overflow-hidden rounded relative"
			}
		>
			<img
				src={post.imageUrl}
				alt={post.description}
				className="w-full h-full object-cover cursor-pointer"
			></img>
			{/* <div className="flex absolute bottom-2 left-2 h-6 overflow-hidden rounded">
				<img src={post.createdBy.imageUrl} alt="profile-pic" />
				<p className="text-sm text-white bg-black bg-opacity-40 px-2 pt-0.5 align-middle">
					{post.createdBy.fullName}
				</p>
			</div> */}
			<div className="absolute bottom-3 inset-x-1/2">
				<BsFillHeartFill
					size={20}
					className="text-black text-opacity-50 cursor-pointer transition duration-300 ease-in transform hover:text-red-400 hover:scale-125"
				/>
			</div>
		</div>
	);
}

export default Post;
