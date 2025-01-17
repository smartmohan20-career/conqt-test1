import { saveWorkflow, getWorkflow } from "../services/workflow.service.js";
import { sendResponse } from "../utils/reqResUtils.js";

// Define the createworkflow controller
const createWorkflowCon = async (req, res) => {
    try {
        const { name, steps } = req.body;

        // Call the saveWorkflow service
        const workflow = await saveWorkflow(name, steps);

        // Define the response object
        const response = {
            status: 200,
            message: "Workflow created successfully",
            data: workflow,
            errors: []
        };

        // Send the response
        sendResponse(res, 200, response);
    } catch (error) {
        // Define the response object
        const response = {
            status: 500,
            message: "Internal Server Error",
            data: {},
            errors: [error.message]
        };

        // Send the response
        sendResponse(res, 500, response);
    }
};

// Function to get workflow
const getWorkflowCon = async (req, res) => {
    try {
        const { workflowId } = req.params;

        // Call the getWorkflow service
        const workflow = await getWorkflow(workflowId);

        // Define the response object
        const response = {
            status: 200,
            message: "Workflow retrieved successfully",
            data: workflow,
            errors: []
        };

        // Send the response
        sendResponse(res, 200, response);
    } catch (error) {
        // Define the response object
        const response = {
            status: 500,
            message: "Internal Server Error",
            data: {},
            errors: [error.message]
        };

        // Send the response
        sendResponse(res, 500, response);
    }
};

export {
    createWorkflowCon,
    getWorkflowCon,
}
