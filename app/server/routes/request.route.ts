import express from "express";
import { authorizeRoles, isAuthentificated } from "../middleware/auth";
import {
    createRequest,
    getRequest,
    getAllRequests,
    updateRequest,
    deleteRequest
} from "../controllers/request.controller";


const requestRouter = express.Router();

requestRouter.get('/requests', isAuthentificated, getAllRequests);
requestRouter.post('/requests', isAuthentificated, createRequest);
requestRouter.get('/requests/:id', isAuthentificated, getRequest);
requestRouter.put('/requests/:id', isAuthentificated, updateRequest);
requestRouter.delete('/requests/:id', isAuthentificated, deleteRequest);


export default requestRouter; 