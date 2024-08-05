require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IInternCreditRequest extends Document {
  requestId: string;
  contract: string;
  bill: string;
  amountUnpaid: number;
  amountTopaid: number;
}

const internCreditRequestSchema: Schema<IInternCreditRequest> = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: false,
    },
    contract: {
      type: String,
      required: true,
    },
    bill: {
      type: String,
      required: true,
    },
    amountUnpaid: {
      type: Number,
      required: true,
    },
    amountTopaid: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

const requestDetailModel: Model<IInternCreditRequest> = mongoose.model("internalCreditRequestsInfos", internCreditRequestSchema);

export default requestDetailModel;
