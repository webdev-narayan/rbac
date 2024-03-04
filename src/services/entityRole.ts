
import { Op, Model } from 'sequelize';
import Role from '../models/Role.ts';
import Role_Permission from '../models/Role_Permission.ts';
import { IRole, IUpdateRole, IUpdateRolePermission, IfindRole } from '../types/Role.ts';

export async function createRole(data: IRole): Promise<IRole> {
    try {
        const [find] = await Role.findOrCreate(data as any)
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
export async function updateRole(data: IUpdateRole): Promise<IUpdateRole> {
    try {
        const [rows, [role]] = await Role.update({ name: data.name, description: data.description }, { where: { id: data.id }, returning: true })
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
export async function updateRolePermission(data: IUpdateRolePermission): Promise<{ message: string }> {
    try {
        if (data.permissions?.length) {
            let arrayOfPermission = data.permissions.map(item => {
                return {
                    RoleId: data.id,
                    PermissionId: item
                }
            })
            await Role_Permission.bulkCreate(arrayOfPermission, { updateOnDuplicate: ["RoleId", "PermissionId"] })
        }
        if (data.removePermissions?.length) {
            await Role_Permission.destroy({ where: { id: { [Op.in]: data.removePermissions } } })
        }
        return { message: "Permission updated successfully!" }
    } catch (error) {
        throw error
    }
}
export async function associateRole<T extends Model>(data: { model: typeof Model & { new(): T } }): Promise<void> {
    try {
        Role.hasMany(data.model as any, { foreignKey: "RoleId", as: "user" })
        data.model.belongsTo(Role, { foreignKey: "RoleId", as: "users" })
    } catch (error) {
        throw error
    }
}