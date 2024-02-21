import sql from "k6/x/sql";
export { runtest1 } from "./runtest1.js";

export const options = {
    "scenarios": {
        "scenario1": {
          "executor": "shared-iterations",
          "vus": 1,
          "iterations": 1,
          "exec": "runtest1"
        }
      }
}

// const testConfig = JSON.parse(open("./conf.json"));

export function setup() {
    const connectionString = 'sqlserver://D2L-4bChsM4223c:1433?database=Test&trusted+connection=yes';
    //   const db = sql.open("mysql", "root:@tcp(127.0.0.1:3306)/testing");

    // console.log(db);
    return connectionString;
}

export default function (data) {
  console.log("running test cases...");
  data.exec(`
  CREATE TABLE person (
    [id] INT IDENTITY PRIMARY KEY
  );`);
}

export function teardown(data) {
//   data.db.close();
}