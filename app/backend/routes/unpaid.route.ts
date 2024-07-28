import express from "express";
import { authorizeRoles, isAuthentificated } from "../middleware/auth";
import { getUnpaidBillsByContractNumber, getUnpaidBillsByInvoiceNumber  } from "../controllers/unpaid.controller";


const unpaidRouter = express.Router();

unpaidRouter.get('/getUnpaidBillsByContractNumber', isAuthentificated, getUnpaidBillsByContractNumber);

unpaidRouter.get('/getUnpaidBillsByInvoiceNumber', isAuthentificated, getUnpaidBillsByInvoiceNumber);


export default unpaidRouter; 