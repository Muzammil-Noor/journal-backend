import express from "express";
import { authenticate } from "../middleware/auth.js";
import {
    createEntry,
    getEntries,
    makeEntry,
    updateEntry,
    deleteEntry,
} from "../controllers/journalController.js";

const router = express.Router();

router.get( "/:id", authenticate(), getEntries);
router.post("/", authenticate(), createEntry);
router.post("/make", authenticate(), makeEntry);
router.put("/:id", authenticate(), updateEntry);
router.delete("/:id", authenticate(), deleteEntry);
export default router;
