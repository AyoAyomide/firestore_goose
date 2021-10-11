
function errorHook({ error, message, functionName }) {
    let errorMessage = {};
    if (process.env.NODE_ENV !== 'production' && error) errorMessage.error = error;
    if (functionName) errorMessage.functionName = `Error from ${functionName}`;
    if (message) errorMessage.message = `${message}`;
    console.error('Error:', errorMessage);
    throw message;
}

module.exports = errorHook;