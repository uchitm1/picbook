import { gql } from "@apollo/client";

export const postsQuery = gql`
	query {
		posts {
			id
			imageUrl
			description
			createdAt
			updatedAt
			createdBy {
				fullName
				imageUrl
			}
		}
	}
`;

export const postsByUserIdQuery = gql`
	query {
		postsByUserId {
			id
			imageUrl
			description
			createdAt
			updatedAt
		}
	}
`;
