const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true // Ensures email is unique
        },
        password: {
            type: String, // Usually hashed
            required: true
        },
        profilePic: {
            type: String,
            required: false // Profile picture is usually optional
        }
    },
    {
        timestamps: true // Adds createdAt & updatedAt fields automatically
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
