import Client from "../database";

 export type products={
    id:number,
    name:string,
    price:number
 }
 export class Product{
        async  create (p:products): Promise<products>{
            try {
            const conn= await Client.connect();
            const sql= `INSERT INTO product (name,price) values ($1,$2) returning *`
            const result= await conn.query(sql,[p.name,p.price])
            conn.release()
            return result.rows[0]
        }
            catch (error) {
                throw new Error("Can't create product")
            }
 }
        async  index (): Promise<products[]>{
            try {
            const conn= await Client.connect();
            const sql= "SELECT * FROM product"
            const result= await conn.query(sql)
            conn.release()
            return result.rows
        }
            catch (error) {
                throw new Error("Can't Show product")
            }
 }
        async  show (id?:string): Promise<products>{
            try {
            const conn= await Client.connect();
            const sql= "SELECT * FROM product WHERE id=($1)"
            const result= await conn.query(sql,[id])
            conn.release()
            return result.rows[0]
        }
            catch (error) {
                throw new Error(`Can't find product ${error}`)
            }
 }
}


