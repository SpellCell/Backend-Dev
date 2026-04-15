import mongoose from "../config/connection.db.js";

// Sale Schema
const saleSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
    price: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

// Export Model
export default mongoose.model("Sale", saleSchema);