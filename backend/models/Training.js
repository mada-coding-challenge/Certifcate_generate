import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: String
    }, // مثال: "3 أيام"
});

const Training = mongoose.model("Training", trainingSchema);

export default Training;