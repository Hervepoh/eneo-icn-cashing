require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { sqlQuery } from "../config/request";
import { executeQuery, getConnection, releaseConnection } from "../utils/db.oracle";
import { isEmpty } from "../utils/formatter";


//---------------------------------------------------------
//              GET ICN CODE 
//---------------------------------------------------------
export const getICNNextCode = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      // Fetch data from the database
      const result = await executeQuery(sqlQuery.icn_next_code);

      // send the response
      return res.status(200).json({
        success: true,
        icn_code: result.rows[0][0] ?? ""
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);

//---------------------------------------------------------
//              GET ICN DEMATERIALIZE CODE 
//---------------------------------------------------------
export const getICNDematerializeCode = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      // Fetch data from the database
      const result = await executeQuery(sqlQuery.icn_next_dematerialisation_code);

      // send the response
      return res.status(200).json({
        success: true,
        dematerialisation: result.rows[0][0] ?? ""
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);


//---------------------------------------------------------
//              GET GROUPES
//---------------------------------------------------------
export const getICNGroupes = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      // Fetch data from the database
      const result = await executeQuery(sqlQuery.select_groupes);

      // send the response
      return res.status(200).json({
        success: true,
        groupes: result.rows
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);

//---------------------------------------------------------
//              GET GROUPES
//---------------------------------------------------------
export const getICN = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { id: icn_number, type } = req.body
      // TODO :  Define the contraint due to the period 
      if (isEmpty(icn_number)) {
        return next(new ErrorHandler("Invalid parameters", 400));
      }

      let query = "";
      let value : string[] = [];
      switch (type) {
        case "full":
          console.log("Full")
          query = sqlQuery.icn_fulldata
          value = [icn_number];
          break;
        case "light":
          console.log("Light")
          query = sqlQuery.icn_lightdata
          value = [icn_number,icn_number,icn_number];
          break;
        default:
          console.log("oTher")
          query = sqlQuery.icn_infos;
          value = [icn_number];
          break;
      }
      const result = await executeQuery(query, value);

      // send the response
      return res.status(200).json({
        success: true,
        data: result.rows
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);
