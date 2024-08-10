require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IInternCreditRequest extends Document {
  reference: string;
  status: string;
  name: string;
  amount: number;
  bank: mongoose.Schema.Types.ObjectId;
  payment_mode: mongoose.Schema.Types.ObjectId;
  payment_date: Date;
  userId: string;
  assignTo: string;
  createdBy: string;
  modifiedBy: string;
  deleted: boolean;
  deletedBy: string;
  deletedAt: Date;
}

const internCreditRequestSchema: Schema<IInternCreditRequest> = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bank: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'banks', // Référence au modèle 'bank'
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
    payment_mode: {
      type:  mongoose.Schema.Types.ObjectId,
      ref: 'payment_modes', // Référence au modèle 'payModeModel'
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "draft",
    },
    assignTo: {
      type: String,
      required: false,
    },
    createdBy: {
      type: String,
      required: false,
    },
    modifiedBy: {
      type: String,
      required: false,
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    deletedBy: {
      type: String,
      required: false,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const requestModel: Model<IInternCreditRequest> = mongoose.model("requests", internCreditRequestSchema);

export default requestModel;
