// Refine a helper function to send a response
const sendResponse = async (res, statusCode, data) => {
    res.status(statusCode).json(data);
};

export {
    sendResponse,
}
