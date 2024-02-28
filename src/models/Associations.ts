import Role from './Role.ts';
import Permission from './Permission.ts'
import Role_Permission from './Role_Permission';

Permission.belongsToMany(Role, {
    as: "roles",
    through: Role_Permission
})
Role.belongsToMany(Permission, {
    as: "permissions",
    through: Role_Permission
})