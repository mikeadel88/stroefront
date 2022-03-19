import Client from "../../database";
import { Orders,order } from "../orders";
import { Product, products } from "../product";
import { users,User } from "../users";



const store=new Orders();
const usermodel=new User();
const productModel=new Product()
describe("Order Model", () => {
  beforeAll( async()=>{
    await productModel.create({
      name:"book",
      price:2000,
    }as products)
    await usermodel.create({
        firstname: "test",
        lastname: "test2",
        username: "test1test",
        password: "12345",
        } as users)
    })
  afterAll(async()=>{
    const conn= await Client.connect()
    const sql ="DELETE FROM order_product ;\nALTER SEQUENCE order_product_id_seq RESTART WITH 1; \n DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1 ; \n DELETE FROM product; \nALTER SEQUENCE product_id_seq RESTART WITH 1 ;\n DELETE FROM users; \nALTER SEQUENCE users_userId_seq RESTART WITH 1 ;"
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
    it('should have an addProduct method', () => {
      expect(store.addProduct).toBeDefined();
    });
    it('should have an addProduct method', () => {
      expect(store.currentOrder).toBeDefined();
    });
    it('create method should add a order',  async () => {
      const result = await store.create({
        status: "active",
        user_id: 1,
      }as order);
      expect(result).toEqual({
        id:1,
        status: "active",
        user_id: 1,
      }as order);
    });
    it('create method should return list a order', async () => {
      const result = await store.index()
      expect(result).toEqual([{
        id:1,
        status: "active",
        user_id: 1,
      }as order]);
    });
    it('create method should  return a order', async () => {
      const result = await store.show("1")
      expect(result).toEqual({
        id:1,
        status: "active",
        user_id: 1,
      }as order);
    });
    it('create method should addProduct', async () => {
      const result = await store.addProduct(20,1,1)
      expect(result).toEqual({
          id: 1,
          quantity: 20,
          order_id: 1,
          product_id: 1,
        } );
    });
    it('create method should CurrentOrder', async () => {
      const result = await store.currentOrder(1)
      expect(result[0].id).toBe(1);
    });
})  