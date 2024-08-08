require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import requestModel from "../models/request.model";
import moment from "moment";

export const summary = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const from = moment(req.body.from, 'DD/MM/YYYY').toDate();
      const to = moment(req.body.to, 'DD/MM/YYYY').toDate();

      // Récupération du nombre de requêtes par statut
      const requestCountByStatus = await requestModel.aggregate([
        { $match: { createdAt: { $gte: from, $lte: to } } },
        { $group: { _id: '$status', count: { $count: {} } } }
      ]);

      // Récupération du nombre total de requêtes
      const totalRequestCount = await requestModel.countDocuments({ createdAt: { $gte: from, $lte: to } });

      // Récupération du montant des requêtes par statut
      const amountByStatus = await requestModel.aggregate([
        { $match: { createdAt: { $gte: from, $lte: to } } },
        { $group: { _id: '$status', totalAmount: { $sum: '$amount' } } }
      ]);

      // Récupération des 10 principaux demandeurs de requêtes par statut
      const topRequestersByStatus = await requestModel.aggregate([
        { $match: { createdAt: { $gte: from, $lte: to } } },
        { $group: { _id: { status: '$status', userId: '$userId' }, count: { $count: {} } } },
        { $sort: { count: -1 } },
        { $group: { _id: '$_id.status', topRequesters: { $push: { userId: '$_id.userId', count: '$count' } } } },
        { $project: { _id: 0, status: '$_id', topRequesters: { $slice: ['$topRequesters', 10] } } }
      ]);


      return res.status(200).json({
        success: true,
        data: {
          requestCountByStatus,
          totalRequestCount,
          amountByStatus,
          topRequestersByStatus
        }
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);


export const analytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      // const from = new Date(req.body.from);
      // const to = new Date(req.body.to);
      const from = moment(req.body.from, 'DD/MM/YYYY').toDate();
      const to = moment(req.body.to, 'DD/MM/YYYY').toDate();
      const userId = req.user?._id;


      // Récupération du nombre de requêtes par statut
      const requestCountByStatus = await requestModel.aggregate([
        { $match: { createdAt: { $gte: from, $lte: to }, userId } },
        { $group: { _id: '$status', count: { $count: {} } } }
      ]);

      // Récupération du nombre total de requêtes
      const totalRequestCount = await requestModel.countDocuments({ createdAt: { $gte: from, $lte: to }, userId });

      // Récupération du montant des requêtes par statut
      const amountByStatus = await requestModel.aggregate([
        { $match: { createdAt: { $gte: from, $lte: to }, userId } },
        { $group: { _id: '$status', totalAmount: { $sum: '$amount' } } }
      ]);

      // Récupération des 10 principaux demandeurs de requêtes par statut
      const topRequestersByStatus = await requestModel.aggregate([
        { $match: { createdAt: { $gte: from, $lte: to }, userId } },
        { $group: { _id: { status: '$status', userId: '$userId' }, count: { $count: {} } } },
        { $sort: { count: -1 } },
        { $group: { _id: '$_id.status', topRequesters: { $push: { userId: '$_id.userId', count: '$count' } } } },
        { $project: { _id: 0, status: '$_id', topRequesters: { $slice: ['$topRequesters', 10] } } }
      ]);

      return res.status(200).json({
        success: true,
        data: {
          requestCountByStatus,
          totalRequestCount,
          amountByStatus,
          topRequestersByStatus
        }
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }

);
