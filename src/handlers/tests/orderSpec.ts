import app from "../../server";
import supertest from "supertest";
import Client from "../../database";
import { users,User } from "../../models/users";
 const usermodel=new User()
 const request=supertest(app)
 let token:string='';

 describe("Test Authenticate method",()=>{
    beforeAll( async()=>{
        await usermodel.create({
            firstname: "test",
            lastname: "test2",
            username: "test1test",
            password: "12345",
            } as users)
        })
    afterAll(async()=>{
        const conn= await Client.connect()
        const sql ="DELETE FROM order_product ;\nALTER SEQUENCE order_product_id_seq RESTART WITH 1; \n DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1 ; \n DELETE FROM product; \nALTER SEQUENCE product_id_seq RESTART WITH 1 ;\n DELETE FROM users; \nALTER SEQUENCE users_userId_seq RESTART WITH 1 ;";
         await conn.query(sql)
         conn.release()
    })
     it("should get token to authenticate",async ()=>{
         const result= await request.post("/users/authenticate").set("Content-type","application/json").send(
             { username:"test1test",
             password:"12345"
             }
         )
         expect(result.status).toBe(200)
          token=result.body.token
     })
    describe("Order Routes",()=>{
        it("should get list of orders",async ()=>{
            const result= await request.get("/orders").set("Content-type","application/json").set('Authorization',`Bearer ${token}`)
            expect(result.status).toBe(200)
        })
        it("should get orders info",async ()=>{
            const result= await request.get("/orders/1").set("Content-type","application/json").set('Authorization',`Bearer ${token}`)
            expect(result.status).toBe(200)
        })
        it("should create orders ",async ()=>{
            const result= await request.post("/orders").set("Content-type","application/json").set('Authorization',`Bearer ${token}`).send({
               status: "active",
               user_id: 1
            })
            expect(result.status).toBe(200)
        })
        it("should add product ",async ()=>{
            const result= await request.post("/orders/1/product").set("Content-type","application/json").set('Authorization',`Bearer ${token}`).send({
               quantity: 20,
               order_id: 1,
               product_id: 1
            })
            expect(result.status).toBe(200)
        })
        it("should get user order",async ()=>{
           const result= await request.get("/orders/users/1").set("Content-type","application/json").set('Authorization',`Bearer ${token}`)
           expect(result.status).toBe(200)
       })
    })
 })
