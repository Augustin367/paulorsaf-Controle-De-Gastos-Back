import express from 'express';
import admin from 'firebase-admin';
import { createTransactionsRouter } from './transactions/routes.js';

const app = express();

admin.initializeApp({
    credential: admin.credential.cert("serviceAccountKey.json")
});

app.use(express.json());
app.use((request, response, next) => {
    // TODO: allow only secure origins
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,DELETE, PATCH");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})
// Para evitar excesso de escrita: npm install cors
// import cors from 'cors';
// const corsOptions = {
//     origin: '*', // depois você pode restringir
//     methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'DELETE', 'PATCH'],
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
// };
//
// app.use(cors(corsOptions));

const auth = admin.auth();
app.use('/transactions', createTransactionsRouter(auth));

app.listen(5501, () => console.log('API rest iniciada em http://localhost:5501'));