import express from "express";
import { authorizeRoles, isAuthentificated } from "../middleware/auth";
import { getUnpaidBillsByInvoiceNumber  } from "../controllers/unpaid.controller";


const unpaidRouter = express.Router();

unpaidRouter.get('/unpaid', isAuthentificated, getUnpaidBillsByInvoiceNumber);

export default unpaidRouter; 