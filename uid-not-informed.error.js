export class UidNotInformedError extends Error {
    constructor() {
        super("UID não informado");
        this.name = "UidNotInformedError";
    }
}