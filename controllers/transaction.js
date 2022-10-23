import TransactionModal from '../models/transaction.js';
import axios from 'axios';

//Create and Update a Transaction Record
export const recordTransaction = async (req, res) => {
    //Get the data from the body
    const { Customer_id, transaction_amount, Mobile_no, Pincode } = req.body;

    try {
        //Try to find if the Customer already exist
        const oldUser = await TransactionModal.findOne({ Customer_id });

        //If so, then we update the relavent fields
        if(oldUser) {
            oldUser.totalAmount = oldUser.totalAmount + transaction_amount;
            oldUser.transaction_datetime = new Date();
            oldUser.transaction_amount = transaction_amount;
            oldUser.Mobile_no = Mobile_no;
            await TransactionModal.findByIdAndUpdate(oldUser._id, oldUser, { new: true });
            return res.status(200).json({ message: "Transaction is recorded", oldUser });
        }

        const pin = parseInt(Pincode);
        //Used a public api to get the State from the Pincode
        const state = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);

        //If not a old user, We create a new one
        const newUser = await TransactionModal.create({ 
            Customer_id, 
            transaction_amount,
            Mobile_no, 
            Pincode, 
            totalAmount: transaction_amount,
            state: state?.data[0]?.PostOffice[0]?.State
        });
        
        res.status(201).json({ message: "New User and Transaction Created", newUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });

        console.log(error);
    }
}

//To get the Data of customers between the totalAmount range
export const getCustomersViaAmount = async (req, res) => {
    //Geeting lowerBound and UpperBound from body
    const { lowerBound, upperBound } = req.body;
    try {
        //Find all the Transactions
        let response = await TransactionModal.find(); 
        let transactions = []; 

        //For all transactions, keep only those that are between the range
        response.map((el) => {
            if (el.totalAmount >= lowerBound && el.totalAmount <= upperBound)
                transactions.push(el);
        });
        res.json({ transactions });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

//Get the top 5 transaction of each Pincode of a given state
export const getCustomersViaState = async (req, res) => {  
    //Get stateName from the body  
    const { stateName } = req.body;

    try {
        //Find all
        let response = await TransactionModal.find(); 
        let transactions = [];

        //Kepp those who belong to the given state
        response.map((el) => {
            if (el.state === stateName) transactions.push(el);
        });

        //Variable with Pincode as the key and the Array of all the transactions
        //from that Pincode as the Value of the key
        let pincodeSeperator = new Map();

        //See, if the Pincode already exist in the map,
        //if so Push the new transaction to the Array under that Pincode
        //else add a new value to the map with key as Pincode and Value as the Object
        transactions?.map((el) => {
            if (pincodeSeperator[el.Pincode]) {
                pincodeSeperator[el.Pincode].push(el);
            } else {
                pincodeSeperator[el.Pincode] = [el];
            }
        });

        //Sort Array under each Pincode in descending order
        //Slice to get the top 5 of them
        transactions?.map((el) => {
            pincodeSeperator[el.Pincode].sort((a,b) => (a.totalAmount > b.totalAmount) ? -1 : ((b.totalAmount > a.totalAmount) ? 1 : 0));
            pincodeSeperator[el.Pincode] = pincodeSeperator[el.Pincode].slice(0, 5);
        });
        res.json({ pincodeSeperator });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}