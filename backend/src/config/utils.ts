import { getConnection } from "typeorm";

export const getDbConnection = async () => {
    return await getConnection();
};

export const runDbMigrations = async () => {
    let conn = await getDbConnection();
    await conn.runMigrations();
};

export const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};
