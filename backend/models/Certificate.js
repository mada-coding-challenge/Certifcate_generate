// models/Certificate.js
import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Training",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    fileUrl: {
        type: String,
        required: true
    }
});

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;