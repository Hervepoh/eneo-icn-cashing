require("dotenv").config();

import mongoose from "mongoose";
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { appConfig } from "../config/app.config";
import { redis } from "../utils/redis";
import { parseDMY } from "../utils/formatter";
import ErrorHandler from "../utils/errorHandler";
import userModel from "../models/user.model";
import bankModel from "../models/bank.model";
import payModeModel from "../models/payMode.model";
import requestModel from "../models/request.model";

/* 
* readAll, is an asynchronous function 
* that retrieves all records from a database and populates 
* the associated data for the bank and payment_mode fields
*/
export const readAll = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const soft = (req.user?.role === "user") ? { deleted: false } : {};
      const datas = await requestModel
        .find(soft)
        .populate({
          path: 'bank',
          select: 'name _id',
          model: bankModel,
        })
        .populate({
          path: 'payment_mode',
          select: 'name _id',
          model: payModeModel,
        })
        .sort({ createdAt: -1 });

      const result = datas.map(item => ({
        ...item["_doc"],
        bank: item.bank ? item.bank?.name : null,
        payment_mode: item.payment_mode ? item.payment_mode?.name : null,
      }));

      return res.status(200).json({
        success: true,
        data: result
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);

/* 
* bulkCreate is an asynchronous function that creates records in the database.
* It first retrieves the user information from the database, and then creates records with the provided data,
* including the payment date, the name of the user who created the record, and the user's ID.
* If the user is not found, it returns an error with a 401 (Unauthorized) status code.
*/
export const bulkCreate = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      // get the user information
      const user = await userModel.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler("Unauthorize ressource", 401));
      }

      const data = {
        ...req.body,
        payment_date: parseDMY(req.body.payment_date),
        createdBy: user.name,
        userId: user._id,
      };

      const request = await requestModel.create(data);

      res.status(201).json({
        success: true,
        data: request
      });


    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);

//---------------------------------------------------------
//              CREATE REQUEST
//---------------------------------------------------------
export const create = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      // get the user information
      const user = await userModel.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler("Unauthorize ressource", 401));
      }

      const data = {
        ...req.body,
        payment_date: parseDMY(req.body.payment_date),
        createdBy: user._id,
        userId: user._id,
      };

      const request = await requestModel.create(data);

      res.status(201).json({
        success: true,
        data: request
      });


    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);

//---------------------------------------------------------
//              READ REQUEST 
//---------------------------------------------------------
export const read = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const requestId = req.params.id;

      const isCachedExist = await redis.get(requestId);
      if (isCachedExist) {
        const request = JSON.parse(isCachedExist);
        return res.status(200).json({
          success: true,
          request,
        });
      } else {
        const request = await requestModel
          .findById(requestId)
          .select(
            '-_id -userId'
          );

        // Put into Redis for caching futur purpose
        await redis.set(requestId, JSON.stringify(request), 'EX', appConfig.redis_session_expire);

        return res.status(200).json({
          success: true,
          data: request,
        });
      }

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);



//---------------------------------------------------------
//              UPDATE REQUEST
//---------------------------------------------------------
export const update = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const data = req.body;

      const requestId = req.params.id;
      const request = await requestModel.findByIdAndUpdate(
        requestId,
        { $set: data },
        { new: true }
      );
      // TODO update redis courseId and allCourses
      return res.status(200).json({
        success: true,
        data: request,
      });


    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);

//---------------------------------------------------------
//            SOFT  DELETE REQUEST
//---------------------------------------------------------
export const softDelete = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { id } = req.params;
      // check if the provided courseId is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid request id", 400));
      }
      const request = await requestModel.findById(id);
      if (!request) {
        return next(new ErrorHandler("Request not found", 404));
      }
      // get the user information
      const user = await userModel.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler("Unauthorize ressource", 401));
      }

      await requestModel.findByIdAndUpdate(
        id,
        {
          $set: {
            deleted: true,
            deletedBy: user._id,
            deletedAt: new Date()
          }
        },
        { new: true }
      );
      await redis.del(id)

      return res.status(200).json({
        success: true,
        message: "Request soft deleted successfully",
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);

//---------------------------------------------------------
//            HARD DELETE REQUEST
//---------------------------------------------------------
export const fulldelete = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { id } = req.params;
      // check if the provided courseId is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid request id", 400));
      }
      const request = await requestModel.findById(id);
      if (!request) {
        return next(new ErrorHandler("Request not found", 404));
      }
      await request.deleteOne({ _id: id })
      await redis.del(id)

      return res.status(200).json({
        success: true,
        message: "Request deleted successfully",
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);

//---------------------------------------------------------
//            SOFT BULK DELETE REQUEST
//---------------------------------------------------------
export const bulkSolftDelete = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { id } = req.params;
      // check if the provided courseId is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid request id", 400));
      }
      const request = await requestModel.findById(id);
      if (!request) {
        return next(new ErrorHandler("Request not found", 404));
      }
      await request.deleteOne({ _id: id })
      await redis.del(id)

      return res.status(200).json({
        success: true,
        message: "Request deleted successfully",
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);