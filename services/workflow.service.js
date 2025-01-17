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

export {
    saveWorkflow,
}
