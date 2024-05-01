// graphql/resolvers/productResolver.js

const Product = require('../../mongodb/models/productModel');

const productResolver = {
	products: async() => {
		try {
			const result = await Product.find();
			return result.map((product) => {
				return {
					...product._doc
				}
			})
		} catch (err) {
			throw err;
		}
	},
	addProduct: async (args) => {
		try {
			const product = new Product({
				name: args.productInput.name,
				price: args.productInput.price
			});
			const result = await product.save();
			return {
				...result._doc
			};
		} catch (err) {
			throw err;
		}
	}
};

module.exports = productResolver;
