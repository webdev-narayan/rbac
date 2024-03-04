import express from 'express'
import routes from "express-list-endpoints"
import sequelize from './database/index.ts';
import { initialize, EntityPermission } from './index.ts';
import listEndpoints from 'express-list-endpoints';

export const app = express();
sequelize.sync({ alter: true })

const users = (req: any, res: any) => {
    res.status(200).send({ ok: true })
}
app.get("/api/users/:id", users)
app.put("/api/users/:id", users)

async function inits() {
    const pers = await initialize(app)
    const lists = await EntityPermission.listPermission()
    console.log(pers)
    console.log(lists)
}

console.log(listEndpoints(app))
inits()

app.listen(3344, () => {
    console.log("server started on port 3344")
})