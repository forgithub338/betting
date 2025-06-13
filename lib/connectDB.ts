import mysql, { Connection } from "mysql2/promise"

let connection: Connection | null = null

export const createConnection = async () => {
  if(!connection) {
    connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    })
  }
  return connection
}