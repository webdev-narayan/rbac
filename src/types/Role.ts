import { ModelDefined } from "sequelize";

export interface IRole {
    name: string;
    description: string
}

export interface IUpdateRole extends IRole {
    id: number
}
export interface IfindRole extends IUpdateRole {
    createdAt: string,
    updatedAt: string
}
export interface IUpdateRolePermission {
    id: string;
    permissions?: number[]
    removePermissions?: number[]
}
export interface IAssciateRole {
    model: string
}