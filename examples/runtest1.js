// const connectionString = 'sqlserver://D2L-4bChsM4223c:1433?database=Test&trusted+connection=yes';
import sql from "k6/x/sql";

export function runtest1(data) {
    const db = sql.open('sqlserver', data);
    db.exec(`
    CREATE TABLE person (
      [id] INT IDENTITY PRIMARY KEY
    );`);
}