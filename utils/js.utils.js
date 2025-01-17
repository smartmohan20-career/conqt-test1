// Function for waiting
const wait = async (ms) => {
    try {
        // initialize variables
        let response = {
            status: 'success',
            message: 'Wait executed successfully',
            data: {},
            errors: []
        };

        // Sleep for the specified amount of time
        await new Promise(resolve => setTimeout(resolve, ms));

        // Return the response
        return response;
    } catch (error) {
        // Define the response object
        let response = {
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
    wait,
}
