import { Query } from "mongoose";

export const resolvers = {
    Query: {
        hello: () => "Hello from BuildOps.",
    },
};