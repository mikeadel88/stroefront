import Client from "../database";
import bcrypt from "bcrypt"

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD


 export type users={
    userid:number,
    firstname:string,
    lastname:string,
    username:string,
    password:string
 }
 export class User{
        async  create (U:users): Promise<users>{
            try {
            const conn= await Client.connect();
            const sql= `INSERT INTO users (firstname,lastname,username,password) values ($1,$2,$3,$4) returning userId, firstname, lastname, username`
            const hash = bcrypt.hashSync(
                U.password + pepper, 
                parseInt(saltRounds as string)
             );
            const result= await conn.query(sql,[U.firstname,U.lastname,U.username,hash])
            conn.release()
            return result.rows[0]
        }
            catch (error) {
                throw new Error("Can't create User")
            }
 }
        async  index (): Promise<users[]>{
            try {
            const conn= await Client.connect();
            const sql= "SELECT userId, firstname, lastname, username FROM users";
            const result= await conn.query(sql)
            conn.release()
            return result.rows
        }
            catch (error) {
                throw new Error("Can't Show Users")
            }
 }
        async  show (id:string): Promise<users>{
            try {
            const conn= await Client.connect();
            const sql= "SELECT userId, firstname, lastname, username FROM users where userid=($1)"
            const result= await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        }
            catch (error) {
                throw new Error("Can't find user")
            }
 }
    async authenticate(username: string, password: string): Promise<users | null> {
    const conn = await Client.connect()
    const sql = 'SELECT password FROM users WHERE username=($1)'
    const result = await conn.query(sql, [username])
    if(result.rows.length) {
      const user = result.rows[0]      
      if (bcrypt.compareSync(password+pepper, user.password)) {
          const userinfo=await conn.query('SELECT userId, firstname, lastname, username FROM users WHERE username=($1)',[username]);
        return userinfo.rows[0]
      }
    }
    conn.release()
    return null
  }
}



