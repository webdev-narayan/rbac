import listEndpoints from "express-list-endpoints";
import { Express } from "express";
import { IPermission } from "../types/Permission";

export async function registerRoutes(app: Express): Promise<IPermission[]> {
    try {
        const endpoints = listEndpoints(app)
        return endpoints.flatMap(item => {
            return item.methods.map(method => {
                return {
                    api: item.path.split("/")[2],
                    method: method,
                    path: item.path,
                    handler: item.middlewares[item.middlewares.length - 1]
                }
            })
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}