require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { sqlQuery } from "../config/request";
import { getConnection, releaseConnection } from "../utils/db.oracle";

//---------------------------------------------------------
//              get all Unpaid Bills By Invoice Number 
//---------------------------------------------------------
export const getUnpaidBillsByInvoiceNumber = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    let connection;
    try {
      // Get Invoice Number from the request body
      const { invoice_number } = req.body;

      // Fetch data from the database
      connection = await getConnection();
      const result = await connection.execute(sqlQuery.unpaid_bills_by_invoice_number, [invoice_number]);

      // send the response
      res.status(200).json({
        success: true,
        bills: result.rows
      });
    } catch (error: any) {
      // Catch the error and return and error response
      console.error('Internal error:', error);
      return next(new ErrorHandler(error.message, 500));
      //res.status(500).json({ error: 'Erreur interne du serveur' });
    } finally {
      // close the connection to the database
      if (connection) {
        await releaseConnection(connection);
      }
    }
  }

);