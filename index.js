// index.js
require('dotenv').config();
require('./mongodb/db');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const schemas = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');

// express app
const app = express();

// Define the GraphQL endpoint
app.use(
	'/graphql',
	graphqlHTTP({
		schema: buildSchema(`${schemas}`),
		rootValue: resolvers,
		graphiql: true // Enable GraphiQL interface for testing in the browser
	})
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

