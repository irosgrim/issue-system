function checkAuthorisation(req, res, next) {
    return async (req, res, next) => {
        const token = req.cookies && req.cookies.token || null;
        if(!token) {
            req.authorisedUser = null;
            next();
        } else {
            if(token === 'the secret') {
                req.authorisedUser = 'testUser';
                next();
            } else {
                res.status(403).send('Unauthorised!')
            }
            // try {
            //     const tokenInfo = await jwt.verify(token, jwtSecret);
            //     req.authorisedUser = tokenInfo.username;
            //     next();
            // } catch(err) {
            //     console.log('Invalid token');
            // }
        }
    }
}

module.exports = {
    checkAuthorisation
}