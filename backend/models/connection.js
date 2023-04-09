// Load module
import mysql from 'mysql'
// Initialize pool
var pool = mysql.createPool({
    connectionLimit : 10,
    host     : '97.74.95.243',
    user     : 'admin',
    password : 'Pa$$W0rd',
    database : 'mr_tutor',
    debug    :  false
});
export default pool;