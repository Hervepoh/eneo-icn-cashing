require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IInternCreditRequest extends Document {
  icn: string;
  userId: string;
  name: string;
  amount: number;
  bank: string;
  payment_mode: string;
  payment_date: Date;
  status: string;
  assignTo: string;
  createdBy: string;
  modifiedBy: string;
}

const internCreditRequestSchema: Schema<IInternCreditRequest> = new mongoose.Schema(
  {
    icn: {
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
      type: String,
      required: true,
    },
    payment_date: {
      type: Date,
      required: true,
    },
    payment_mode: {
      type: String,
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
  },
  { timestamps: true }
);

const requestModel: Model<IInternCreditRequest> = mongoose.model("internalCreditRequests", internCreditRequestSchema);

export default requestModel;
