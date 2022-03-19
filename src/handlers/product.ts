import express ,{Request,Response} from "express";
import verifyToken from "../middleware/auth";
import { Product,products } from "../models/product";
 const Products= new Product()
 const index=async(_req:Request,res:Response)=>{
     try {
        const allProduct= await Products.index()
        res.json(allProduct)
     } catch (error) {
         res.json(error)
     }

 }
 const show=async(req:Request,res:Response)=>{
     try {
        const showProduct=await Products.show(req.params.id);
        res.json(showProduct)
     } catch (error) {
         res.status(401)
         res.json(error)
     }
 
 }
 const create=async (req:Request,res:Response)=>{
     try {
         const product:products={
             name: req.body.name,
             price: req.body.price,
             id: req.body.id
         }
         const newProduct=await Products.create(product)
         res.json(newProduct)
         
     } catch (error) {
         res.status(401)
         res.json(error)
     }
 }
 const productRoute=(app:express.Application)=>{
     app.get("/products",index)
     app.get("/products/:id",show)
     app.post("/products",verifyToken,create)
 }
 export default productRoute;