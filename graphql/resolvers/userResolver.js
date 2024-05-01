// graphql/resolvers/userResolvers.js

const User = require('../../mongodb/models/userModel');
const bcrypt = require('bcryptjs');

const userResolvers = {
	/**
	 * @method getUser
	 */
	getUser: async ({ userId }) => {
		try {
			const user = await User.findById(userId);
			console.log(user);
			return user;
		} catch (err) {
			throw err;
		}
	},
	/**
	 * @method addUser
	 */
	addUser: async (args) => {
		try {
			const { userInput } = args;

			// Check if a user with the provided email already exists
			const userFound = await User.findOne({ email: userInput.email });
			if (userFound) {
				throw new Error('User exists already.');
			}

			// Hash the user's password
			const hashedPassword = await bcrypt.hash(userInput.password, 12);

			// Create a new user object with the hashed password and an empty cart
			const user = new User({
				name: userInput.name,
				surname: userInput.surname,
				email: userInput.email,
				password: hashedPassword,
				cart: []
			});

			// Save the new user to the database
			const result = await user.save();

			// Return the user object with password field set to null
			return {
				...result._doc,
				password: null
			};
		} catch (error) {
			console.error('Error adding user:', error);
			throw error;
		}
	},
	/**
	 * @method addItemToCart
	 */
	addItemToCart: async (args) => {
		try {
			const { userId, cartItemInput } = args;

			// Find the user by ID
			const user = await User.findById(userId);
			if (!user) {
				throw new Error('User not found');
			}

			// Check if the cart already contains the item
			const existingCartItemIndex = user.cart.findIndex((item) => item.product.equals(cartItemInput.product));

			if (existingCartItemIndex !== -1) {
				// If the item exists, update its quantity
				user.cart[existingCartItemIndex].quantity += cartItemInput.quantity;
			} else {
				// If the item does not exist, add it to the cart
				user.cart.push(cartItemInput);
			}

			// Save the updated user
			const updatedUser = await user.save();

			// Return the added or updated cart item
			if (existingCartItemIndex !== -1) {
				return updatedUser.cart[existingCartItemIndex];
			} else {
				return updatedUser.cart[updatedUser.cart.length - 1];
			}
		} catch (error) {
			console.error('Error adding item from cart:', error);
			throw error;
		}
	},
	/**
	 * @method removeItemFromCart
	 */
	removeItemFromCart: async (args) => {
		try {
			const { userId, itemId } = args;
			await User.findByIdAndUpdate(
				userId,
				{ $pull: { cart: { _id: itemId } } },
				{ new: true } 
			);
			return true;
		} catch (error) {
			console.error('Error removing item from cart:', error);
			throw error;
		}
	}
};

module.exports = userResolvers;
