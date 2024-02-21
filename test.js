import sql from 'k6/x/sql';
import { check } from 'k6';

export const options = {
  // vus: 2,
  // //iterations: 4,
  // duration: '10s'
  scenarios: {
    default: {
      executor: 'constant-arrival-rate',
      duration: '5s',
      rate: '10',
      timeUnit: '1s',
      preAllocatedVUs: 2,
      maxVUs: 10
    }
  }
}

const connectionString = 'sqlserver://D2L-4bChsM4223c:1433?database=Test&trusted+connection=yes';
const db = sql.open('sqlserver', connectionString);

export function setup() {
  db.exec(`IF object_id('person') is null
    CREATE TABLE person (
      [id] INT IDENTITY PRIMARY KEY,
      [email] varchar(50) NOT NULL,
      [first_name] varchar(50),
      [last_name] varchar(50)
    );`);

  db.exec(
    "INSERT INTO person (email, first_name, last_name) VALUES('johndoe@email.com', 'John', 'Doe');"
  );
  db.exec(
    "INSERT INTO person (email, first_name, last_name) VALUES('marysue@email.com', 'Mary', 'Sue');"
  );
  db.exec(
    "INSERT INTO person (email, first_name, last_name) VALUES('dorydoe@email.com', 'Dory', 'Doe');"
  );
}

export function teardown() {
  db.exec('DROP TABLE person;');
  db.close();
}

export default function () {
  const results = sql.query(db, 'SELECT * FROM person;');
  check(results, {
    'is length 3': (r) => r.length === 3,
  });

  // for (const row of results) {
  //   console.log(`Hello ${row.first_name} ${row.last_name}, at ${row.email}`);
  // }
}
