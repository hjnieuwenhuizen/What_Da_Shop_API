// graphql/resolvers/index.js

const userResolver = require('./userResolver');
const productResolver = require('./productResolver');

module.exports =  {
    ...userResolver,
    ...productResolver
}