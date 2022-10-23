// Routers to decide the API paths
import express from 'express';

import { recordTransaction, getCustomersViaAmount, getCustomersViaState } from '../controllers/transaction.js';

const router = express.Router();

//For Amount Filter between the two ranges
router.post('/filteramount', getCustomersViaAmount);

//For State Filter to display top 5 from each Pincode
router.post('/filterstate', getCustomersViaState);

//For Creating or Updating a new Transaction
router.post('/', recordTransaction);

export default router;