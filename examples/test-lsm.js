import sql from 'k6/x/sql';
import { check } from 'k6';

export const options = {
  vus: 1,
  iterations: 1,
  // duration: '10s'
//   scenarios: {
//     default: {
//       executor: 'constant-arrival-rate',
//       duration: '10s',
//       rate: '10',
//       timeUnit: '1s',
//       preAllocatedVUs: 2,
//       maxVUs: 10
//     }
//   }
}


const connectionString = 'sqlserver://D2L-4bChsM4223c:1433?database=Test&trusted+connection=yes';
const db = sql.open('sqlserver', connectionString);


export default function () {
    const query = `
        SELECT TOP (10) [CourseId]
            ,[CourseCode]
        FROM [dev_2023_01_main].[dbo].[COURSES]
    `;
    const results = sql.query(db, query);
    console.log(results)

}

export function teardown () {
    db.close();
}