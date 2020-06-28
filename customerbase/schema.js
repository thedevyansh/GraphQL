const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

/*
// Hardcoded data
const customers = [
  { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 45 },
  { id: "2", name: "Smith", email: "ssmith@gmail.com", age: 20 },
  { id: "3", name: "Rodric", email: "rodric@gmail.com", age: 32 },
];

*/

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        /*for (let customer of customers) {
          if (customer.id === args.id) {
            return customer;
          }
        }*/
        return axios
          .get("http://localhost:3000/customers/" + args.id)
          .then((res) => res.data);
      },
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        //return customers;
        return axios
          .get("http://localhost:3000/customers")
          .then((res) => res.data);
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
