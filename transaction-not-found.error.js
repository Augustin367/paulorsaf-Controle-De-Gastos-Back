export class TransactionNotFoundError extends Error {

    constructor() {
        super("Transação não encontrada");
        this.name = "transaction-not-found";
        this.code = 404;
    }

}