// graphql/schemas/index.js

const { userTypes, userQueries, userMutations } = require('./userSchema');
const { cartItemTypes } = require('./cartItemSchema');
const { productTypes, productQueries, productMutations } = require('./productSchema');

const schemas = `
    ${userTypes}
    ${cartItemTypes}
    ${productTypes}

    type RootQuery {
        ${userQueries}
        ${productQueries}
    }

    type RootMutation {
        ${userMutations}
        ${productMutations}
    }

    schema {
        query: RootQuery,
        mutation: RootMutation
    }
`;

module.exports = schemas;
