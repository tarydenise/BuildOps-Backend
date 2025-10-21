import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { connectDB } from "./config/db";
import { makeExecutableSchema } from "@graphql-tools/schema";

dotenv.config();

const startServer = async () => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    //Executable schema for GraphiQL
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    //Serve GraphiQL at /graphiql
    app.use("/graphiql", graphqlHTTP({
        schema,
        graphiql: true
    }));

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
            console.log(`GraphiQL UI available at http://localhost:${PORT}/graphiql`);
        });
    })
    .catch(err => console.error("MongoDB connection error:", err));
};

startServer();