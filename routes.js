import express from 'express';
import { authenticateToken } from '../middlewares/authenticate-jwt.js';
import { TransactionController } from './controller.js';
import { validateTransaction } from './validators/create-transaction.validator.js';

export function createTransactionsRouter(auth){
    const app = express();
    const transactionController = new TransactionController();

    const authMiddleware = authenticateToken(auth);

    app.get(
        '/',
        authMiddleware,
        transactionController.findByUser.bind(transactionController)
    );
    app.get(
        '/:uid',
        authMiddleware,
        transactionController.findByUid.bind(transactionController)
    );
    app.post('/',
        // Middleware de validação
        validateTransaction, 
        authMiddleware,
        transactionController.create.bind(transactionController)
    );
    app.patch('/:uid',
        validateTransaction,
        authMiddleware,
        transactionController.update.bind(transactionController)
    );
    app.delete('/:uid',
        authMiddleware,
        transactionController.delete.bind(transactionController)
    )
    return app;
}