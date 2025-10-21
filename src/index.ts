import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

const PORT = process.env.PORT || 4000;

startServer().then(() => {
    app.listen(PORT, () => {
        console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
});