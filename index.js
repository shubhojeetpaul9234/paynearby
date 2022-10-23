import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import transactionRoutes from './routes/transaction.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//Start the baseusl from hostUrl/transacton
app.use('/transaction', transactionRoutes); 

app.get('/', (req, res) => {
    res.send('APP IS RUNNING');
})

mongoose.connect(process.env.CONNECTION_URL).then(() => {
    app.listen(process.env.PORT, () => console.log(`server is running on port: ${process.env.PORT}`))
}).catch((error) => console.log(error.message));