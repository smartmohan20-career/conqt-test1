import { Router } from "express";
import { createWorkflowCon, getWorkflowCon } from "../controllers/workflow.controller.js";

// Create a router
const router = Router();

// Define route for creating workflow
router.post("/", createWorkflowCon);

// Define route for getting workflow
router.get("/:workflowId", getWorkflowCon);

export default router;
