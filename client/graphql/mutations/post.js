import { gql } from "@apollo/client";

export const createPostMutation = gql`
	mutation ($createPost: CreatePostInput!) {
		createPost(post: $createPost) {
			id
			imageUrl
			description
			createdAt
			updatedAt
			createdBy {
				username
			}
		}
	}
`;
