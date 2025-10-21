import { Crew } from "../models/Crew";

export const resolvers = {
    Query: {
        crews: async () => await Crew.find(),
    },
    Mutation: {
        createCrew: async (_: any, args: { name: string; role: string; active?: boolean }) => {
            const newCrew = new Crew({
                name: args.name,
                role: args.role,
                active: args.active ?? true,
            });
            return await newCrew.save();
        },
    },
};