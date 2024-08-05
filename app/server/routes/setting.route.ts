import express from "express";
import { authorizeRoles, isAuthentificated } from "../middleware/auth";
import { create, deletion, get, getAll, update } from "../controllers/categories.controller";


const settingRouter = express.Router();

settingRouter.get('/categories', getAll);
settingRouter.post('/categories', isAuthentificated, create);
settingRouter.get('/categories/:id', isAuthentificated, get);
settingRouter.put('/categories/:id', isAuthentificated, update);
settingRouter.delete('/categories/:id', isAuthentificated, deletion);


export default settingRouter; 