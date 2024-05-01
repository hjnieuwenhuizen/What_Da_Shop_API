// graphql/schemas/productItemSchema.js

const productTypes = `
	type Product {
		_id: ID!
		name: String!
		price: Float!
	}

	input ProductInput {
		name: String!
		price: Float!
	}
`;

const productQueries = `
	products: Product
`;

const productMutations = `
	addProduct(productInput: ProductInput!): Product
`;

module.exports = { productTypes, productQueries, productMutations };
