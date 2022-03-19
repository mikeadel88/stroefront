import Client from "../../database";
import { User,users } from "../users";


const store=new User();
describe("User Model", () => {
afterAll(async()=>{
const conn= await Client.connect()
const sql ="DELETE FROM users ; \nALTER SEQUENCE users_userId_seq RESTART WITH 1;";
await conn.query(sql)
conn.release()
})
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
    it('should have an show method', () => {
      expect(store.show).toBeDefined();
    });
    it('should have an create method', () => {
      expect(store.create).toBeDefined();
    });
    it('should have an authenticate method', () => {
      expect(store.authenticate).toBeDefined();
    });
    it('create method should add a user',  async () => {
      const result = await store.create({
        firstname: "test",
        lastname: "test2",
        username:"test1test",
        password:"12345"
      }as users);
      expect(result).toEqual({
        userid:1,
        firstname: "test",
        lastname: "test2",
        username:"test1test",
      }as users);
    });
    it('create method should return list a user', async () => {
      const result = await store.index()
      expect(result).toEqual([{
        userid:1,
        firstname: "test",
        lastname: "test2",
        username:"test1test",
      }as users]);
    });
    it('create method should  return a user', async () => {
      const result = await store.show("1")
      expect(result).toEqual({
        userid:1,
        firstname: "test",
        lastname: "test2",
        username:"test1test",
      }as users);
    });
    it('create method should authicate user', async () => {
      const result = await store.authenticate("test1test","12345")
      expect(result).toEqual({
        userid:1,
        firstname: "test",
        lastname: "test2",
        username:"test1test",
      }as users);
    });
})  