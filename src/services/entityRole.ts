
import Role from '../models/Role.ts';
import Role_Permission from '../models/Role_Permission.ts';
import { IRole, IUpdateRole, IUpdateRolePermission, IfindRole } from '../types/Role.ts';

export async function createRole(body: IRole): Promise<IRole> {
    try {
        const [find] = await Role.findOrCreate(body as any)
        return find.dataValues
    } catch (error) {
        throw error
    }
}
export async function deleteRole(id: number): Promise<Boolean> {
    try {
        const role = await Role.destroy({ where: { id: id } })
        if (role) {
            return true
        } else {
            return false
        }
    } catch (error) {
        throw error
    }
}
export async function updateRole(body: IUpdateRole): Promise<IUpdateRole> {
    try {
        const [rows, [role]] = await Role.update({ name: body.name, description: body.description }, { where: { id: body.id }, returning: true })
        return role.dataValues
    } catch (error) {
        throw error
    }
}
export async function findRole(): Promise<IfindRole[]> {
    try {
        const roles = await Role.findAll();
        return roles.map(item => {
            return {
                id: item.dataValues.id,
                name: item.dataValues.name,
                description: item.dataValues.description,
                createdAt: item.dataValues.createdAt,
                updatedAt: item.dataValues.updatedAt
            }
        })
    } catch (error) {
        throw error
    }
}
export async function updateRolePermission(body: IUpdateRolePermission): Promise<{ message: string }> {
    try {
        if (body.permissions?.length) {
            let arrayOfPermission = body.permissions.map(item => {
                return {
                    RoleId: body.id,
                    PermissionId: item
                }
            })
            await Role_Permission.bulkCreate(arrayOfPermission, { updateOnDuplicate: ["RoleId", "PermissionId"] })
        }
        if (body.removePermissions?.length) {

        }
        return { message: "Permission updated successfully!" }
    } catch (error) {
        throw error
    }
}
