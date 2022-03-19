import { User,users } from "../../models/users";
import app from "../../server";
import supertest from "supertest";
import Client from "../../database";
 const store=new User()
 const request=supertest(app)
 let token:string='';

 describe("Test Authenticate method",()=>{
     beforeAll( async()=>{
         await store.create({
    firstname: "test",
    lastname: "test2",
    username: "test1test",
    password: "12345",
} as users)
     })
afterAll(async()=>{
    const conn= await Client.connect()
    const sql ="DELETE FROM users;\nALTER SEQUENCE users_userId_seq RESTART WITH 1;";
     await conn.query(sql)
     conn.release()
})
     it("should get token to authenticate",async ()=>{
         const result= await request.post("/users/authenticate").set("Content-type",'application/json').send(
             { username:"test1test",
             password:"12345"
             }
         )
         expect(result.status).toBe(200)
          token=result.body.token
     })
    })
    describe("user Route",()=>{
        it("should get list of Users",async ()=>{
            const result= await request.get("/users").set("Content-type","application/json").set('Authorization',`Bearer ${token}`)
            expect(result.status).toBe(200)
        })
        it("should get User info",async ()=>{
            const result= await request.get("/users/1").set("Content-type","application/json").set('Authorization',`Bearer ${token}`)
            expect(result.status).toBe(200)
        })
    })


