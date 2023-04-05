import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        github: String,
        domain: [String],
        active: Boolean,
        candidatesInterested: {
            type: [String],
            default: []
        }
    },
    { timestampes: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;