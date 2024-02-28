import { DataTypes } from "sequelize";
import sequelize from "../../database/index.ts";

const Role = sequelize.define("Role", {
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    description: {
        type: DataTypes.TEXT
    }
})

Role.sync()
export default Role