export const successResult = (res, result) => {
    res.status(200).json({
        isSuccess : true,
        result
    });
}

export const internalServerErrorResult = (res, message, er) => {
    res.status(500).json({
        isSuccess : false,
        message, 
        er
    });
}

export const methodNotAllowed = (res) => {
    res.status(405).json({         
        isSuccess : false,
        message: 'Method Not Allowed',
        er : null
    });
}