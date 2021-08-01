import { gql } from "@apollo/client";

export const registerUserMutation = gql`
	mutation ($registerUser: UserSignupInput!) {
		registerUser(user: $registerUser) {
			id
			fullName
			username
			imageUrl
			createdAt
			updatedAt
		}
	}
`;

export const loginUserMutation = gql`
	mutation ($loginUser: UserLoginInput!) {
		loginUser(user: $loginUser) {
			id
			fullName
			username
			imageUrl
			createdAt
			updatedAt
		}
	}
`;

export const logoutUserMutation = gql`
	mutation {
		logoutUser
	}
`;

export const currentUserMutation = gql`
	mutation {
		currentUser {
			id
			fullName
			username
			imageUrl
			createdAt
			updatedAt
		}
	}
`;
