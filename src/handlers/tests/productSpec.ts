import app from "../../server";
import supertest from "supertest";
import Client from "../../database";
import { User,users } from "../../models/users";
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
        const sql ="DELETE FROM product ;\nALTER SEQUENCE product_id_seq RESTART WITH 1 ;\n DELETE FROM users ;\nALTER SEQUENCE users_userId_seq RESTART WITH 1 ;";
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
    })
    describe("Product Routes",()=>{
        it("should get list of product",async ()=>{
            const result= await request.get("/products").set("Content-type","application/json").set('Authorization',`Bearer ${token}`)
            expect(result.status).toBe(200)
        })
        it("should get product info",async ()=>{
            const result= await request.get("/products/1").set("Content-type","application/json").set('Authorization',`Bearer ${token}`)
            expect(result.status).toBe(200)
        })
        it("should create product ",async ()=>{
            const result= await request.post("/products").set("Content-type","application/json").set('Authorization',`Bearer ${token}`).send({
               name:"book",
               price:2000
            })
            expect(result.status).toBe(200)
        })
    })
   
     
