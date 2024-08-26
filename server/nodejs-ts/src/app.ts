import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import { appConfig } from "./utils/appConfig";
import { isDbServerUp } from "./utils/helpers";
import catchAll from "./middlewares/catchAll";
import { logMW } from "./middlewares/logMW";
import { serverRouters } from "./controllers/serversControllers";

// 
// create server
const server = express();

server.use(cors());

// log
server.use(logMW);

// load body
server.use(express.json());


// register controllers

server.use("/", serverRouters);

// Error handling
server.use(catchAll);

// run server only if DB-server is active
isDbServerUp().then((isUp) => {
    if (isUp) {
        server.listen(appConfig.port, () => {
            console.log(`Listening on http://localhost:${appConfig.port}`);
        })
    } else {
        console.error("\n\n****\nDB server is not up!!!\n****\n");
    }
})
