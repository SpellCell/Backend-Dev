import mongoose from "../config/connection.db.js"

// Product Schema
const productSchema = new mongoose.Schema({
    // product:[Object]
    name: {
        type: String,
        required: true
    },
    category: String,
    price: Number,
    quantity: {
        type: Number,
        default: 0
    },
    supplier: String,
    description: String
});

// Export Model
export default mongoose.model("Product", productSchema);