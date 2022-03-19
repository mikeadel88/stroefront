import express ,{Request,Response} from "express";
import verifyToken from "../middleware/auth";
import { order,Orders } from "../models/orders";
 const orders= new Orders()
 const index=async(_req:Request,res:Response)=>{
     try {
        const allOrders= await orders.index()
        res.json(allOrders)
     } catch (error) {
         res.json(error)
     }
  
 }
 const show=async(req:Request,res:Response)=>{
     try {
        const showOrders=await orders.show(req.params.id);
        res.json(showOrders)
     } catch (error) {
         res.status(401)
         res.json(error)
     }
 
 }
 const create=async (req:Request,res:Response)=>{
     try {
         const order:order={
             id:req.body.id,
             status: req.body.status,
             user_id:req.body.user_id
         }
         const newOrder=await orders.create(order)
         res.json(newOrder)
         
     } catch (error) {
         res.status(401)
         res.json(error)
     }
 }
 const addProduct = async (req: Request, res: Response) => {
    const orderId: number = Number(req.params.id) 
    const productId: number = req.body.productId
    const quantity: number = parseInt(req.body.quantity)
  
    try {
      const addedProduct = await orders.addProduct(quantity, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 
  const currentOrder= async (req: Request, res: Response)=>{
      const user_id:number=Number(req.params.id)
      try {
         const CurrentOrder=await orders.currentOrder(user_id) 
         res.json(CurrentOrder)
      } catch (err) {
        res.status(400)
        res.json(err)
      }
  }
 const OrderRoute=(app:express.Application)=>{
    app.get("/orders/users/:id",verifyToken,currentOrder)
     app.get("/orders",verifyToken,index)
     app.get("/orders/:id",verifyToken,show)
     app.post("/orders",verifyToken,create)
     app.post("/orders/:id/product",verifyToken,addProduct)
 }
 export default OrderRoute;