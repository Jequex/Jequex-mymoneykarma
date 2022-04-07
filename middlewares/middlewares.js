exports.verbCheck = async (req, res, next) => {
    if (req.method !== 'POST') {
        return res.status(405).send({message: 'invalid request method'});
    } else {
        next();
    }
};

exports.auth = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(403).send({ message: 'unauthorized' });
    } else {
        req.user = token;
        next();
    }
}