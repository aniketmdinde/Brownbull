import {Shipment} from "../models/shipment.model.js"
import { addShipmentToSheet, updateShipmentInSheet } from "../utils/googleSheets.utils.js"

// ✅ Create Shipment
export const createShipment = async (req, res) => {
    try {
        const shipment = new Shipment(req.body);
        await shipment.save();
        await addShipmentToSheet(shipment);
        res.status(201).json({ message: "Shipment added successfully", shipment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get All Shipments
export const getShipments = async (req, res) => {
    try {
        const shipments = await Shipment.find();
        res.status(200).json(shipments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Shipment by ID
export const getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ error: "Shipment not found" });

        res.status(200).json(shipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update Shipment (based on provided values)
export const updateShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) return res.status(404).json({ error: "Shipment not found" });

        // Update only provided fields
        Object.keys(req.body).forEach((key) => {
            shipment[key] = req.body[key];
        });

        await shipment.save();

        // Update status in Google Sheets (if modified)
        if (req.body.status) {
            await updateShipmentInSheet(req.params.id, req.body.status);
        }

        res.status(200).json({ message: "Shipment updated successfully", shipment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Shipment
export const deleteShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndDelete(req.params.id);
        if (!shipment) return res.status(404).json({ error: "Shipment not found" });

        res.status(200).json({ message: "Shipment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update Shipment Status (Auto-delete if delivered)
export const updateShipmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, { status }, { new: true });

        if (!shipment) return res.status(404).json({ error: "Shipment not found" });

        await updateShipmentInSheet(req.params.id, status);

        // Auto-delete after 30 seconds if status is "delivered"
        if (status === "delivered") {
            setTimeout(async () => {
                await Shipment.findByIdAndDelete(req.params.id);
                console.log(`Shipment ${req.params.id} deleted from MongoDB.`);
            }, 30000);
        }

        res.status(200).json({ message: "Shipment status updated successfully", shipment });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};