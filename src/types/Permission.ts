export interface IPermission {
    api: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | string;
    path: string;
    handler: string;
}