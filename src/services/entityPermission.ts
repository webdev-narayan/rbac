import { IPermission } from './../types/Permission.ts';
import Permission from './../models/Permission.ts';
import Role_Permission from './../models/Role_Permission.ts';

export async function listPermission(): Promise<(IPermission & { createdAt: string, updatedAt: string })[]> {
    try {
        const permissions = await Permission.findAll();
        return permissions.map(item => {
            return {
                api: item.dataValues.api,
                handler: item.dataValues.handler,
                method: item.dataValues.method,
                path: item.dataValues.path,
                createdAt: item.dataValues.createdAt,
                updatedAt: item.dataValues.updatedAt
            }
        })
    } catch (error) {
        throw error
    }
}
export async function byApi(api: string): Promise<(IPermission & { createdAt: string, updatedAt: string })[]> {
    try {
        const permissions = await Permission.findAll({ where: { api: api } });
        return permissions.map(item => {
            return {
                api: item.dataValues.api,
                handler: item.dataValues.handler,
                method: item.dataValues.method,
                path: item.dataValues.path,
                createdAt: item.dataValues.createdAt,
                updatedAt: item.dataValues.updatedAt
            }
        })
    } catch (error) {
        throw error
    }
}
export async function findOne(id: number): Promise<(IPermission & { createdAt: string, updatedAt: string, Role_Permission: object })> {
    try {
        const permissions = await Permission.findByPk(id);
        return {
            api: permissions?.dataValues.api,
            handler: permissions?.dataValues.handler,
            method: permissions?.dataValues.method,
            path: permissions?.dataValues.path,
            createdAt: permissions?.dataValues.createdAt,
            updatedAt: permissions?.dataValues.updatedAt,
            Role_Permission: permissions?.dataValues.Role_Permission
        }

    } catch (error) {
        throw error
    }
}