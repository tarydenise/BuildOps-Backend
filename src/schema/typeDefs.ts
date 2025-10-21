import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Crew {
        id: ID!
        name: String!
        role: String!
        active: Boolean!
    }

    type Query {
        crews: [Crew]!
    }

    type Mutation {
        createCrew(name: String!, role: String!, active: Boolean): Crew!
    }
`;