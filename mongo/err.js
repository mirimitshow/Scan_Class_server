module.exports = (UserSchema, GroupSchema, BoardSchema, ScanSchema) => {

    UserSchema.post('save', (error, res, next) => {
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if (error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
    UserSchema.post('update', (error, res, next) => {
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if (error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
    BoardSchema.post('save', (error, res, next) => {
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if (error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
    BoardSchema.post('update', (error, res, next) => {
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if (error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
    GroupSchema.post('save', (error, res, next) => {
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if (error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
    GroupSchema.post('update', (error, res, next) => {
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if (error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
    ScanSchema.post('save', (error, res, next) => {
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if (error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
    ScanSchema.post('update', (error, res, next) => {
        if ((error.name === 'MongoError' || error.name === 'BulkWriteError') && error.code === 11000) next(new user_duplicate("duplicate error"));
        else if (error.name === "ValidationError") next(new ValidationError(error.message));
        else next(error);
    });
}