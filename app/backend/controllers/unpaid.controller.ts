require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { sqlQuery } from "../config/request";
import { executeQuery, getConnection, releaseConnection } from "../utils/db.oracle";


//---------------------------------------------------------
//              get all Unpaid Bills Using Query Parameters
//---------------------------------------------------------
export const getUnpaidBills = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      // Get Query Parameters
      const name = req.query.name;
      const value = req.query.value;
      if (name == undefined || name == null || name == "") {
        return next(new ErrorHandler("Bad request", 402));
      }
      if (name === "invoice") {
        getUnpaidBillsByInvoiceNumber(req, res, next);
      } else if (name === "contract") {
        getUnpaidBillsByContractNumber(req, res, next);
      }

    } catch (error: any) {
      console.error('Internal error:', error);
      return next(new ErrorHandler(error.message, 500));
    }
  }

);


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


//---------------------------------------------------------
//              get all Unpaid Bills By Contract Number 
//---------------------------------------------------------
export const getUnpaidBillsByContractNumber = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      // Get Invoice Number from the request body
      const { contract_number } = req.body;

      // Fetch data from the database
      const result = await executeQuery(sqlQuery.unpaid_bills_by_contract_number, [contract_number], next);

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
      next();
    }
  }

);

