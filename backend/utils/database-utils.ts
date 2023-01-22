import mysql, { MysqlError, OkPacket } from "mysql";
import type { Connection } from "mysql";

let connection: Connection | null = null;

export const getConnection = (): Connection => {
  if (connection) {
    return connection;
  }

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cook-suggester",
  });

  connection = con;

  return con;
};

export const executeQuery = <Type = unknown>(
  query: string,
  params: (string | number | string[] | number[])[] = []
): Promise<Type[]> => {
  const con = getConnection();
  return new Promise((resolve, reject) => {
    con.query(query, params, (err: MysqlError | null, result: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(result as Type[]);
      }
    });
  });
};

export const insertQuery = (
  query: string,
  params: (string | number | string[] | number[])[] = []
): Promise<OkPacket> => {
  const con = getConnection();
  return new Promise((resolve, reject) => {
    con.query(query, params, (err: MysqlError | null, result: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(result as OkPacket);
      }
    });
  });
};