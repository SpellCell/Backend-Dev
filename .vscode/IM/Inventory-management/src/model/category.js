import mongoose from "../config/connection.db.js"

// Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String
});

// Export Model
export default mongoose.model("Category", categorySchema);