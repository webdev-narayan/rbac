import { Roles } from "./src/constants/index.ts"
import Role from './src/models/Role.ts';
import { Express } from "express";
import { registerRoutes } from "./src/services/endpoints.ts"
import Permission from './src/models/Permission.ts';

import * as entityRole from "./src/services/entityRole.ts";
import * as entityPermission from "./src/services/entityPermission.ts";

export async function initialize(app: Express): Promise<{ message: string }> {
    try {
        const roles = await Role.bulkCreate(Roles, { updateOnDuplicate: ["name"] })
        const endpoints = await registerRoutes(app)
        const permissions = await Permission.bulkCreate(endpoints as any, { updateOnDuplicate: ["api", "method", "path", "handler"] })
        return { message: "Successfully initialized app - created roles , endpoints" }
    } catch (error) {
        throw error
    }
}


export const EntityRole = entityRole;
export const EntityPermission = entityPermission;

