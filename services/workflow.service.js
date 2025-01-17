import { wait } from "../utils/js.utils.js"
import { executeQuery } from "../utils/db.utils.js";
import { sendResponse } from "../utils/reqResUtils.js";

// Define the save workflow function
const saveWorkflow = async (name, steps) => {
    try {
        // Initialize variables
        const response = {
            status: 'fail',
            message: 'Failed to save workflow',
            data: {},
            errors: []
        };
        let errors          = [];
        let stepsIds        = [];
        let workflowDetails = null;

        // For each step in the steps array
        for (const step of steps) {
            // Retrieve the step details
            const type      = step?.type;
            const config    = step?.config;

            // Convert config to JSON format
            const configJSON = JSON.stringify(config);
              
            // Define the query and params for step
            const stepQuery = `
                INSERT INTO steps (type, config)
                VALUES ($1, $2)
                RETURNING *;
            `;
            const stepParams = [type, configJSON];

            // Save the step
            const stepsResult = await executeQuery(stepQuery, stepParams);

            // Check if the step was saved successfully
            if (stepsResult.status != 'success') {
                // Merge the errors
               errors = [
                    ...errors,
                    ...stepsResult.errors,
               ];
            } else {
                // Retrieve the query result
                const stepDetails   = stepsResult.data[0];
                const stepID        = stepDetails.id;
                
                // Append the step ID to the stepsIds array
                stepsIds.push(stepID);
            }
        }

        // calculate the total number of steps
        const totalSteps = stepsIds.length;
        const createdSteps = stepsIds.length;

        // Check if all steps were saved
        if (createdSteps === totalSteps) {
            // Convert stepsIds to JSON format
            const stepsJSON = JSON.stringify(stepsIds);

            // Define the query and params for workflow
            const workflowQuery = `
                INSERT INTO workflows (name, steps)
                VALUES ($1, $2)
                RETURNING *;
            `;
            const workflowParams = [name, stepsJSON];

            // Save the workflow
            const workflowResult = await executeQuery(workflowQuery, workflowParams);

            // Check if the workflow was saved successfully
            if (workflowResult.status != 'success') {
                // Merge the errors
                errors = [
                    ...response.errors,
                    ...workflowResult.errors,
                ];
            } else {
                // Retrieve the query result
                workflowDetails = workflowResult.data[0];
            }
        }

        // Check if failed to save workflow
        if (errors.length > 0 || workflowDetails) {
            // Update the response object
            response = {
                ...response, // Spread the existing response object
                errors: errors
            };
        } else {
             // Define the response object
             response = {
                ...response, // Spread the existing response object
                status: 'success',
                message: 'Workflow saved successfully',
                data: {
                    workflow: workflowDetails
                },
            };
        }

        // Return the response
        return response;
    } catch (error) {
        // Define the response object
        const response = {
            status: "fail",
            message: "Exception occurred",
            data: {},
            errors: []
        };

        // return the response
        return response;
    }
};

// Function to get workflow
const getWorkflow = async (workflowId) => {
    try {
        // Initialize variables
        const response = {
            status: 'fail',
            message: 'Failed to retrieve workflow',
            data: {},
            errors: []
        };
        let errors          = [];
        let workflowDetails = null;

        // Define the query and params for workflow
        const workflowQuery = `
            SELECT * FROM workflows
            WHERE id = $1
            LIMIT 1;
        `;
        const workflowParams = [workflowId];

        // Retrieve the workflow
        const workflowResult = await executeQuery(workflowQuery, workflowParams);

        // Check if the workflow was retrieved successfully
        if (workflowResult.status != 'success') {
            // Merge the errors
            errors = [
                ...errors,
                ...workflowResult.errors,
            ];
        } else {
            // Retrieve the workflow details
            const workflow      = workflowResult.data[0];

            // Retrieve the workflow details
            const stepsIdsJson = workflow.steps;

            // Convert stepsJson to array
            const stepsIds = JSON.parse(stepsIdsJson);

            // Define query to retrieve steps
            const stepsQuery = `
                SELECT * FROM steps
                WHERE id IN ($1)
                ORDER BY id;
            `;
            const stepsParams = [stepsIds];

            // Retrieve the steps
            const stepsResult = await executeQuery(stepsQuery, stepsParams);

            // Check if the steps were retrieved successfully
            if (stepsResult.status != 'success') {
                // Merge the errors
                errors = [
                    ...errors,
                    ...stepsResult.errors,
                ];
            } else {
                // Retrieve the steps details
                const steps = stepsResult.data;

                // Update the workflow details
                workflowDetails = {
                    ...workflow,
                    steps: steps
                };
            }
        }

        // Check if failed to retrieve workflow
        if (errors.length > 0 || workflowDetails) {
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
                    workflow: workflowDetails
                },
            };
        }

        // return the response
        return response;
    } catch (error) {
        // Define the response object
        const response = {
            status: "fail",
            message: "Exception occurred",
            data: {},
            errors: []
        };

        // return the response
        return response;
    }
};

// Function to send email
const sendEmail = async (config) => {
    try {
        // Initialize variables
        const response = {
            status: 'fail',
            message: 'Failed to send email',
            data: {},
            errors: []
        };
        let errors          = [];
        let isSent          = false;

        // Retrieve the config details
        const { to, subject, body } = config;

        // HERE WE CAN CALL THE EMAIL SERVICE TO SEND THE EMAIL
        // UPDATE "isSent" AND "response" BASED ON THE RESULT

        // return the response
        return response;
    } catch (error) {
        // Define the response object
        const response = {
            status: "fail",
            message: "Exception occurred",
            data: {},
            errors: []
        };

        // return the response
        return response;
    }
};

// Function to sleep
const sleep = async (config) => {
    try {
        // Retrieve the config details
        const { time} = config; // Time in mili seconds
        return wait(time);
    } catch (error) {
        // Define the response object
        const response = {
            status: "fail",
            message: "Exception occurred",
            data: {},
            errors: []
        };

        // return the response
        return response;
    }
};

export {
    saveWorkflow,
    getWorkflow,
}
