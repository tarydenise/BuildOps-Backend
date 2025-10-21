import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

dotenv.config();

const startServer = async () => {
    connectDB();

    const app = express();
    app.use(cors());
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;

    mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
        });
    })
    .catch(err => console.error("MongoDB connection error:", err));
};

startServer();