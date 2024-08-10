import express from "express";
import { authorizeRoles, isAuthentificated } from "../middleware/auth";
import {
    readAll,
    read,
    create,
    update,
    softDelete,
    fulldelete,
    bulkCreate,
    bulkSolftDelete, 
} from "../controllers/request.controller";


const requestRouter = express.Router();

requestRouter.get('/requests', isAuthentificated, authorizeRoles("user","admin"), readAll);
requestRouter.post('/requests', isAuthentificated, create);
requestRouter.get('/requests/:id', isAuthentificated, read);
requestRouter.put('/requests/:id', isAuthentificated, update);
requestRouter.delete('/requests/:id', isAuthentificated, softDelete);

requestRouter.post('/requests-bulk', isAuthentificated, authorizeRoles("admin"), bulkCreate);
requestRouter.delete('/requests-full/:id', isAuthentificated, authorizeRoles("admin"),fulldelete);
requestRouter.delete('/requests-bulk', isAuthentificated,authorizeRoles("admin"), bulkSolftDelete);


export default requestRouter; 