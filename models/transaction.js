//The Schema of the Transaction Object, containing additional 
//inputs of totalAmount and state
import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    transaction_amount: { type: Number, required: true },
    Mobile_no: { type: String, required: true },
    transaction_datetime: { type: Date, default: new Date() },
    Pincode: { type: String, required: true},
    Customer_id: { type: Number, required: true },
    totalAmount: { type: Number, default: 0 },
    state: { type: String }
});

export default mongoose.model("Transaction", transactionSchema);