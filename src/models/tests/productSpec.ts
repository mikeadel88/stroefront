import Client from "../../database";
import { Product,products } from "../product";
const store=new Product();
describe("Product Model", () => {
  afterAll(async()=>{
    const conn= await Client.connect()
    const sql ="DELETE FROM product ;\nALTER SEQUENCE product_id_seq RESTART WITH 1 ;";
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
    it('create method should add a product',  async () => {
      const result = await store.create({
        id:1,
        name: "book",
        price: 2000,
      });
      expect(result).toEqual({
        id:1,
        name: "book",
        price: 2000,
      });
    });
    it('create method should return list a product', async () => {
      const result = await store.index()
      expect(result).toEqual([{
        id: 1,
        name: "book",
        price: 2000,
      }]);
    });
    it('create method should return  product', async () => {
      const result = await store.show("1")
      expect(result).toEqual({
        id: 1,
        name: "book",
        price: 2000,
      });
    });
})  