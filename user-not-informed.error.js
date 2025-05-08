export class UserNotInformedError extends Error {

    constructor() {
        super("Usuário não informado");
        this.name = "user-not-informed";
        this.code = 500;
    }


}