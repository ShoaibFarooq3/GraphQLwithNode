import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

const app = express();
const port = 4000;

// In-memory data store
const data = {
  warriors: [
    { id: "001", name: "Jaime" },
    { id: "002", name: "Jorah" },
    { id: "003", name: "Jaime" },
    { id: "004", name: "Jorah" },
    { id: "005", name: "Jaime" },
    { id: "006", name: "Jorah" },
    { id: "007", name: "Jaime" },
    { id: "008", name: "Jorah", email: "jorah@example.com" },
  ],
};

// Schema
const typeDefs = `
type Warrior {
  id: ID!
  name: String!
  email: String
}

type Query {
  warriors: [Warrior]!
}
`;

// Resolver for warriors
const resolvers = {
  Query: {
    warriors: (obj, args, context) => context.warriors,
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Entrypoint
app.use(
  "/",
  graphqlHTTP({
    schema: executableSchema,
    context: data,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Running a server at http://localhost:${port}`);
});
