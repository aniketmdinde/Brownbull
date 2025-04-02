import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    type: { type: String, enum: ["box", "container"], required: true },
    dimensions: {
        length: { type: Number, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    },
    weight: { type: Number, required: true },
    units: { type: Number, required: true },
});

const shipmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    client_company: { type: String, required: true },
    pickup_location: { type: String, required: true },
    drop_location: { type: String, required: true },
    transport_mode: { type: String, enum: ["air", "land", "sea"], required: true },
    packages: [packageSchema],
    shipment_date: { type: Date, required: true },
    status: { type: String, enum: ["in progress", "delivered", "lost"], default: "in progress" },
});

export const Shipment = mongoose.model("Shipment", shipmentSchema);