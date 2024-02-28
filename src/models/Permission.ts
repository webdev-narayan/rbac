import { DataTypes } from "sequelize";
import sequelize from "../../database/index.ts";
const Permission = sequelize.define("Permission", {
    api: {
        type: DataTypes.STRING
    },
    method: {
        type: DataTypes.ENUM("POST", "GET", "PUT", "DELETE", "PATCH")
    },
    path: {
        type: DataTypes.STRING
    },
    handler: {
        type: DataTypes.STRING
    }
}, {
    indexes: [{
        unique: true,
        fields: ["api", "method", "path", "handler",]
    }],
})

Permission.sync()

export default Permission