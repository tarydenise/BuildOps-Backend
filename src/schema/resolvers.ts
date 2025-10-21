import { Crew } from "../models/Crew";

export const resolvers = {
    Query: {
        crews: async () => await Crew.find(),
        crew: async (_: any, args: { id: string }) => {
            return await Crew.findById(args.id);
        },
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
        updateCrew: async (_: any, args: { id: string; name?: string; role?: string; active?: boolean }) => {
            const updatedCrew = await Crew.findByIdAndUpdate(
                args.id,
                {
                    ... (args.name && { name: args.name }),
                    ... (args.role && { role: args.role }),
                    ... (args.active !== undefined && { active: args.active }),
                },
                { new: true }
            );
            return updatedCrew;
        },
        deleteCrew: async (_: any, args: { id: string }) => {
            const deleted = await Crew.findByIdAndDelete(args.id);
            return !!deleted;
        },
    },
};