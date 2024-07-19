import 'express-async-errors'
import express, { Express } from "express"
import { NextFunction, Request, Response } from "express"
import { Route } from "./route"
import { Api } from "../../api"
import cors from 'cors'
import fileUpload from 'express-fileupload'


export class ApiExpress implements Api {
    public app: Express

    private constructor(routes: Route[]){
        this.app = express()
        this.app.use(express.json())
        this.configCors()
        this.app.use(fileUpload())
        this.addRoutes(routes)
    }

    public static create(routes: Route[]){
        return new ApiExpress(routes)
    }

    
    public errorHandling = (err: Error, req: Request, res: Response, next: NextFunction) => {
        res.status(500).json({
        message: err.message,
        });
    };

    private addRoutes(routes: Route[]){
        routes.forEach((route) => {
            const path = route.getPath()
            const method = route.getMethod()
            const handler = route.getHandler()

            this.app[method](path, handler)
        })
    }

    private configCors(){
        this.app.use(cors({ origin: '*' }))
        this.app.use((_, res, next) => {
          res.header('Access-Control-Allow-Origin', '*')
          res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
          next()
        })
    }

    public start(port: number){
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`)
            this.listRoutes()
            this.app.use(this.errorHandling)
        })
    }

    private listRoutes() {
        const routes = this.app._router.stack
        .filter((route: any) => route.route)
        .map((route: any) => {
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        })

        console.table(routes)

    }
}