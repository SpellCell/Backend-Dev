import mongoose from "../config/connection.db.js";

// Inventory Schema
const inventorySchema = new mongoose.Schema({
    totalProducts: {
        type: Number,
        default: 0
    },
    totalQuantity: {
        type: Number,
        default: 0
    },
    totalValue: {
        type: Number,
        default: 0
    },
    lowStockItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }
    ]
});

// Export Model
export default mongoose.model("Inventory", inventorySchema);