import { authenticateToken } from '../authenticate-jwt.js'

describe("Authenticate jwt", () => {

    test('given no authorization header, then return error 401', async () => {
        const request = {
            headers: {}
        };
        const response = new ResponseMock();
        const next = () => {};

        const authMock = {
            verifyIdToken: () => Promise.resolve({sub: "anyUserUid"})
        }
        
        
        await authenticateToken(authMock)(request, response, next);

        expect(response._status).toEqual(401);
    })

    test('given authoriztation header, when invalid, then return error 401', async () => {
        const request = {
            headers: {authorization: "invalid"}
        };
        const response = new ResponseMock();
        const next = () => {};

        const authMock = {
            verifyIdToken: () => Promise.reject()
        }
        
        await authenticateToken(authMock)(request, response, next, {
            verifyIdToken: () => Promise.reject()
        });

        expect(response._status).toEqual(401);
    })

    test('given authorization header, when valid, then add user to request', async () => {
        const request = {
            headers: {authorization: "valid"}
        };
        const response = new ResponseMock();
        const next = jest.fn();

        const authMock = {
            verifyIdToken: () => Promise.resolve({sub: "anyUserUid"})
        };
        
        await authenticateToken(authMock)(request, response, next);

        expect(request.user).toEqual({uid: "anyUserUid"});
    })

    class ResponseMock {
        _status;
        status(value) {
            this._status = value;
            return this;
        }
        json(value) {

        }
    }

})