// graphql/schemas/userSchema.js

const userTypes = `
	type User {
		_id: ID!
		name: String!
		surname: String!
		email: String!
		password: String
		cart: [CartItem!]!
		created: String!
	}

	input UserInput {
		name: String!
		surname: String!
		email: String!
		password: String!
	}
`;

const userQueries = `
	getUser(userId: String!): User
`;

const userMutations = `
	addUser(userInput: UserInput!): User
	addItemToCart(userId: String!, cartItemInput: CartItemInput!): CartItem
	removeItemFromCart(userId: String!, itemId : String!): Boolean
`;

module.exports = { userTypes, userQueries, userMutations };
