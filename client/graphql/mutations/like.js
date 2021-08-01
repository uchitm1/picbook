import { gql } from "@apollo/client";

export const likePostMutation = gql`
	mutation Mutation($likedPostId: ID!) {
		likePost(postId: $likedPostId) {
			id
			user {
				id
				fullName
			}
			post {
				id
			}
		}
	}
`;
