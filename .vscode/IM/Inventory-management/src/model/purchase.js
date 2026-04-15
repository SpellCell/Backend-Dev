import mongoose from "../config/connection.db.js"

// Purchase Schema
const purchaseSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
    price: Number,
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export Model
export default mongoose.model("Purchase", purchaseSchema);