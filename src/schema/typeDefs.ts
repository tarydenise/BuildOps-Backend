import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Crew {
        id: ID!
        name: String!
        role: String!
        active: Boolean!
    }

    type Query {
        crews: [Crew]!          # Get all
        crew(id: ID!): Crew     #Get by ID
    }

    type Mutation {
        createCrew(name: String!, role: String!, active: Boolean): Crew!            #POST
        updateCrew(id: ID!, name: String, role: String, active: Boolean): Crew!     #PUT
        deleteCrew(id: ID!): Boolean                                                #DELETE
    }
`;