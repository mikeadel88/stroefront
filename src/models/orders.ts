import Client from "../database";

export type order={
    id:number,
    status:string,
    user_id:number,
}
export class Orders{
    async  create (p:order): Promise<order>{
        try {
        const conn= await Client.connect();
        const sql= `INSERT INTO orders (status,user_id) values ($1,$2) returning *`
        const result= await conn.query(sql,[p.status,p.user_id])
        conn.release()
        return result.rows[0]
    }
        catch (error) {
            throw new Error("Can't create order")
        }
}
async index(): Promise<order[]>{
    try {
        const conn=await Client.connect();
        const sql=`SELECT * FROM  orders `;
        const result= await conn.query(sql)
        conn.release()
        return result.rows


    } catch (error) {
        throw new Error("Can't Show order")
    }
}
async  show (id?:string): Promise<order>{
    try {
    const conn= await Client.connect();
    const sql= "SELECT * FROM orders WHERE id=($1)"
    const result= await conn.query(sql,[id])
    conn.release()
    return result.rows[0]
}
    catch (error) {
        throw new Error(`Can't find order ${error}`)
    }
}
    async addProduct(quantity: number, orderId: number, productId: number): Promise<unknown> {
        try {
          const conn = await Client.connect();
          const sql = 'INSERT INTO order_product (quantity,order_id, product_id) VALUES($1, $2, $3) RETURNING *';
          const result = await conn.query(sql, [quantity, orderId, productId]);
          const order = result.rows[0];
          conn.release()
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }
   async currentOrder (user_id:number):Promise<order[]>  {
       try {
        const conn = await Client.connect();
        const sql = 'SELECT userId,firstname ,lastname , username,orders.id ,orders.status FROM users INNER JOIN orders ON users.userId = orders.user_id WHERE user_id=($1) ';
        const result = await conn.query(sql,[user_id]);
        conn.release()
        return result.rows;
       } catch (error) {
        throw new Error(`Could not Show order`)

       }
   }
}
