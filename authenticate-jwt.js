export function authenticateToken(auth) {
    return async function(request, response, next) {
        let jwt = request.headers.authorization;
        if (!jwt) {
            response.status(401).json({message: "Usuário não autorizado"});
            return;
        }

        let decodedIdToken = "";
        try {
            decodedIdToken = await auth.verifyIdToken(jwt, true);
        } catch (e) {
            response.status(401).json({message: "Usuário não autorizado"});
            return;
        }

        request.user = {
            uid: decodedIdToken.sub
        };

        next();
    }
}