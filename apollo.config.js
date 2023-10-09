module.exports = {
  client: {
    tagName: "gql",
    includes: ["./app/**/*.ts"],
    service: {
      name: "my-local-apollo-service", // the name of your graph in Studio
      localSchemaFile: "./app/graphql/schema.graphql",
    },
  },
}
