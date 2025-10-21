import mongoose from "mongoose";

const crewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    active: { type: Boolean, default: true },
});

export const Crew = mongoose.model('Crew', crewSchema);