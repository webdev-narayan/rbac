
import Role from '../models/Role.ts';
import { IRole, IUpdateRole, } from './../types/Role';
import { Request, Response } from 'express';

export async function create(body: IRole) {
    try {
        const role = await Role.create({
            name: body.name,
            description: body.description
        })
        return role.dataValues
    } catch (error) {
        return { error }
    }
}

export async function find() {
    try {
        const roles = await Role.findAll();
        return roles
    } catch (error) {
        return { error }
    }
}
export async function destroy(id: number) {
    try {
        const roles = await Role.destroy({ where: { id } });
        return true
    } catch (error) {
        return { error }
    }
}
export async function update(body: IUpdateRole) {
    try {

        const [rows, [updatedRole]] = await Role.update({
            name: body.name,
            description: body.description
        }, {
            where: { id: body.id },
            returning: true
        });
        return updatedRole.dataValues
    } catch (error) {
        return { error }
    }
}