class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode
        this.message = message
    }
}

const handleError = (err, res) => {
    let statusCode = err.status || 404
    let message = err.message || 'Internal Error'
    let errorResponse =  {
        status: "error",
        statusCode,
        message
    }

    console.log(errorResponse)
    res.status(statusCode).json(errorResponse)
}

module.exports = {
    ErrorHandler,
    handleError
}