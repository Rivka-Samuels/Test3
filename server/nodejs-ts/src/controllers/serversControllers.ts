import express, { Request, Response, NextFunction } from "express";
import { appConfig } from "../utils/appConfig";
import { getServers, updateStatus } from "../services/serversService";
import { StatusCode } from "../models/statusEnum";

export const serverRouters = express.Router();

serverRouters.get(appConfig.routePrefix + "/servers", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const servers = await getServers(); 
        res.status(StatusCode.Ok).json(servers); 
    } catch (error) {
        console.error("Error fetching servers:", error);
        next(error); 
    }
});

serverRouters.post(appConfig.routePrefix + "/servers/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id; 
        const newValue = req.body.newValue; 

        if (typeof newValue !== 'boolean') {
            return res.status(StatusCode.BadRequest).send("newValue must be a boolean"); 
        }

        await updateStatus(id, newValue);
        res.status(StatusCode.Ok).send("Server status updated successfully"); 

    } catch (error) {
        console.error("Error updating server status:", error);
        next(error); 
    }
});

