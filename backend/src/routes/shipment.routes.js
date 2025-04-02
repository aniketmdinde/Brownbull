import { Router } from "express";
import { createShipment,
    getShipments,
    getShipmentById,
    updateShipment,
    updateShipmentStatus,
    deleteShipment
 } from "../controllers/shipment.controllers.js"

const router = Router();

router.post("/", createShipment);
router.get("/", getShipments);                 
router.get("/:id", getShipmentById);            
router.put("/update/:id", updateShipment);    
router.put("/status/:id", updateShipmentStatus);
router.delete("/:id", deleteShipment);

export default router;