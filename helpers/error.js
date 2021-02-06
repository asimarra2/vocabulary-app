class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode
        this.message = message
    }
}

const handleError = (err, res) => {
    const { statusCode, message } = err

    let errorResponse =  {
        status: err,
        statusCode,
        message
    }

    // console.log(errorResponse)
    res.status(statusCode).json(errorResponse)
}

module.exports = {
    ErrorHandler,
    handleError
}