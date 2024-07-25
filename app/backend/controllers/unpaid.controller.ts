require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import connectOracleDB from "../utils/db.oracle";
import { sqlQuery } from "../config/request";

//---------------------------------------------------------
//              get all Unpaid Bills By Invoice Number 
//---------------------------------------------------------
export const getUnpaidBillsByInvoiceNumber = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = sqlQuery.unpaid_bills_by_contract_number ;
      console.log(query);

      // res.status(200).json({
      //   success: true,
      //   notifications,
      // });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//-----------------------------------------------
//              get user notifications
//-----------------------------------------------
export const getUserNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const notifications = await notificationModel
      //   .find({ user: req.user?._id })
      //   .sort({ createdAt: -1 });

      // res.status(200).json({
      //   success: true,
      //   notifications,
      // });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//-----------------------------------------------
//              update notifications status
//-----------------------------------------------
export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationModel.findById(req.params.id);

      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      }
      if (notification.status) {
        notification.status = "read";
        await notification.save();
      }

      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        notifications,
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//-----------------------------------------------
//              delete notifications -- only for admin
//-----------------------------------------------
cron.schedule('0 0 0 * * *', async() => {
  const thirtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await notificationModel.deleteMany({status: "read", createdAt: {$lt: thirtyDayAgo}});
  console.log('----------------------------');
  console.log('Delete read notifications');
  console.log('----------------------------');
});