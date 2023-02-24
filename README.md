# cpp-xk6-sql 
POC of using xk6-sql with CPP.

Repo: https://github.com/grafana/xk6-sql
Blog: https://k6.io/blog/load-testing-sql-databases-with-k6/

## Build binary
Binary is build using xk6-cmd with the change to the build command to include xk6-sql 
```
xk6 build --with xk6-cmd=. --with github.com/grafana/xk6-sql
```

## MS SQL Server
This extension uses go modules and those repos contain more information that can be helpful.
- https://github.com/denisenkom/go-mssqldb

### Connection setup
If get an error like the following on local db connection: 
```
Unable to open tcp connection with host 'localhost:1433': dial tcp 127.0.0.1:1433: connectex: No connection could be made because the target machine actively refused it.
```
Need to complete the following steps to enable TCP/IP connections:
1. Open Sql Server Configuration Manger
2. Expand `SQL Server Network Configuration` and select `Protocols for MSSQSLSERVER`
3. Set TCP/IP to `Enabled`
4. Restart computer
Reference: https://stackoverflow.com/questions/32010749/go-with-sql-server-driver-is-unable-to-connect-successfully-login-fail

- Use the connection string like the following to use Windows Authentication:
`'sqlserver://D2L-4bChsM4223c:1433?database=Test&trusted+connection=yes'`