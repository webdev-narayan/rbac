import { DataTypes } from "sequelize";
import sequelize from "../../database/index.ts";
import Role from "./Role.ts";
import Permission from './Permission.ts';

const Role_Permission = sequelize.define("Role_Permission", {
    PermissionId: {
        type: DataTypes.INTEGER,
        references: { model: Permission, key: "id" },
        unique: "role_permission_ids"
    },
    RoleId: {
        type: DataTypes.INTEGER,
        unique: "role_permission_ids",
        references: { model: Role, key: "id", }
    }
}, {
    indexes: [{
        unique: true,
        fields: ["RoleId", "PermissionId"]
    }]
})

Role_Permission.sync();
export default Role_Permission