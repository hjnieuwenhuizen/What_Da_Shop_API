// graphql/schemas/cartItemSchema.js

const cartItemTypes = `
	type CartItem {
		_id: ID!
		product: String!
		quantity: Int!
	}

	input CartItemInput {
		product: String!
		quantity: Int!
	}
`;

module.exports = { cartItemTypes };
