import { UserNotInformedError } from "./errors/user-not-informed.error.js";
import { UidNotInformedError } from "./errors/uid-not-informed.error.js"
import { TransactionRepository } from "./repository.js";
import { TransactionNotFoundError } from "./errors/transaction-not-found.error.js";
import { UserDoesntOwnTransactionError } from "./errors/user-doesnt-own-transaction.error.js";
import { response } from "express";

export class Transaction {

    date;
    description;
    money;
    transactionType;
    type;
    user;

    #repository;

    constructor(transactionRepository) {
        this.#repository = transactionRepository || new TransactionRepository();
    }

    async findByUser() {
        if (!this.user?.uid) {
            throw new UserNotInformedError();
        }

        return await this.#repository.findByUserUid(this.user.uid);
    }

    findByUid() {
        // buscar no banco de dados por uid
        if (!this.uid) {
            throw new UidNotInformedError(); 
        }

        return this.#repository.findByUid(this.uid).then(transaction => {
            if (!transaction) {
                throw new TransactionNotFoundError();
            }
            if (this.user.uid != transaction.user.uid) {
                return Promise.reject(new UserDoesntOwnTransactionError());
            } 
            
            // popular o modelo  com as informações
            this.date = transaction.date;
            this.description = transaction.description;
            this.money = transaction.money;
            this.transactionType = transaction.transactionType;
            this.type = transaction.type;
            this.user = transaction.user; 
        })

    }

    create(params) {
        this.date = params.date;
        this.description = params.description;
        this.money = params.money;
        this.transactionType = params.transactionType;
        this.type = params.type;
        this.user = params.user;

        return this.#repository.save(this).then(response => {
            this.uid = response.uid;
        });
    }

    update(params) {
        return this.findByUid(this.uid).then(() => {
            this.date = params.date;
            this.description = params.description;
            this.money = params.money;
            this.transactionType = params.transactionType;
            this.type = params.type;
            this.user = params.user;

            return this.#repository.update(this);
        })
    }

    delete() {
        return this.findByUid().then(() => {
            return this.#repository.delete(this);
        })
    }

}