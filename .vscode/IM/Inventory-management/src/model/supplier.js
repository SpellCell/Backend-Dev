import mongoose from "../config/connection.db.js"

// Supplier Schema
const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: String,
    email: String,
    address: String
});

// Export Model
export default mongoose.model("Supplier", supplierSchema);