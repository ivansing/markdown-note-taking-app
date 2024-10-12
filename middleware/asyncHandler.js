const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next).cath(next))
    }
}

module.exports = asyncHandler