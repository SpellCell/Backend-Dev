import mongoose from "../config/connection.db.js"

// User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        match:[
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
            ],
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "manager", "staff"],
        default: "staff"
    }
});

// Export Model
export default mongoose.model("User", userSchema);