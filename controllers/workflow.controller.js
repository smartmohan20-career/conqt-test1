import { saveWorkflow, getWorkflow } from "../services/workflow.service.js";
import { sendResponse } from "../utils/reqResUtils.js";

// Define the createworkflow controller
const createWorkflowCon = async (req, res) => {
    try {
        // Initialize variables
        const response = {
            status: 'fail',
            message: 'Failed to create workflow',
            data: {},
            errors: []
        };
        let errors          = [];
        let statusCode      = 400;

        // Retrieve the data from the request
        const { name, steps } = req.body;

        // Call the saveWorkflow service
        const workflowRes = await saveWorkflow(name, steps);

        // Check if the workflow was saved successfully
        if (workflowRes.status != 'success') {
            errors = [
                ...errors,
                ...workflowRes.errors,
            ];

            // Update the response object
            response = {
                ...response, // Spread the existing response object
                errors: errors
            };
        } else {
            // Update the response object
            response = {
                ...response, // Spread the existing response object
                status: 'success',
                message: 'Workflow created successfully',
                data: {
                    workflow: workflowRes.data.workflow
                },
            };
        }

        // Send the response
        sendResponse(res, statusCode, response);
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
        // Initialize variables
        const response = {
            status: 'fail',
            message: 'Failed to retrieve workflow',
            data: {},
            errors: []
        };
        let errors          = [];
        let statusCode      = 400;

        // Retrieve the data from the request
        const { workflowId } = req.params;

        // Call the getWorkflow service
        const workflow = await getWorkflow(workflowId);

        // Check if the workflow was retrieved successfully
        if (workflow.status != 'success') {
            errors = [
                ...errors,
                ...workflow.errors,
            ];

            // Update the response object
            response = {
                ...response, // Spread the existing response object
                errors: errors
            };
        } else {
            // Update the response object
            response = {
                ...response, // Spread the existing response object
                status: 'success',
                message: 'Workflow retrieved successfully',
                data: {
                    workflow: workflow.data.workflow
                },
            };
        }

        // Send the response
        sendResponse(res, statusCode, response);
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
