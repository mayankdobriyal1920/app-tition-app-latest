// Load module
import mysql from 'mysql2'
// Initialize pool
var pool = mysql.createPool({
    connectionLimit : 10,
    host     : '147.93.108.96',
    user     : 'dbuser',
    password : 'Pa$$W0rd@123$$',
    database : 'mrtutor',
    debug    :  false
});
export default pool;