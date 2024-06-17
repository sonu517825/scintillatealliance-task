const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: false,
            trim: true,
        },
        content: {
            type: String,
            required: false,
            trim: true,
        },
        timestamp: {
            type: Date,
            required: false,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Chat", contactSchema);
