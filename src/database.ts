import {Pool} from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {
    pg_host,
    pg_database,
    pg_user,
    password,
    pg_database_test,
    ENV,
} = process.env

console.log(ENV)
 const Client = new Pool({
        database: ENV === "dev"? pg_database:pg_database_test,
        host:pg_host,
        user:pg_user,
        password:password,
    
    })  




export default Client;