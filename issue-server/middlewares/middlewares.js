function checkAuthorisation(req, res, next) {
    return (req, res, next) => {
        console.log('authorised, for now ');return async (req, res, next) => {
            const token = req.cookies.token || null;
            if(!token) {
                req.authorisedUser = null;
                next();
            } else {
                try {
                    const tokenInfo = await jwt.verify(token, jwtSecret);
                    req.authorisedUser = tokenInfo.username;
                    next();
                } catch(err) {
                    console.log('Invalid token');
                }
            }
        }
    }
}

module.exports = {
    checkAuthorisation
}