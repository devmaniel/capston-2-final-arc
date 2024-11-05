exports.InvalidRequest = (req, res, next) => {
    res.status(400).json({
        error: 'Invalid search request',
        message: 'The search request is invalid. Please check your query and try again.'
    });
};