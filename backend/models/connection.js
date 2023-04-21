// Load module
import mysql from 'mysql'
// Initialize pool
var pool = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'mrtutor',
    password : 'Dhkd338@3',
    database : 'admin_mrtutor',
    debug    :  false
});
export default pool;