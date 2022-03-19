import express ,{Request,Response} from "express";
import { User,users } from "../models/users";
import verifyToken from "../middleware/auth";
import jwt from "jsonwebtoken"
 const Users= new User()

 const index=async(_req:Request,res:Response)=>{
     try {
        const allUser= await Users.index()
        res.json(allUser)
     } catch (error) {
         res.json(error)
     }

 }
 const show=async(req:Request,res:Response)=>{
     try {
        const showUser=await Users.show(req.params.id);
        res.json(showUser)
     } catch (error) {
        res.json(error) 
     }

 }
 const create=async (req:Request,res:Response)=>{
    const user:users={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        userid: req.body.id,
        username:req.body.username,
        password:req.body.password
    }
    try {
        const newUser=await Users.create(user)
        res.json(newUser);
    } catch (error) {
        res.status(401)
        res.json(error)
    }

 }
 const authenticate = async (req: Request, res: Response) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
    }
    try {
        const u = await Users.authenticate(user.username, user.password)
        if(u){
            let token = jwt.sign({ user:u }, process.env.TOKEN_SECRET as string);
            res.json({token:token})
        }
        else{
            res.json({msg:"User can't sign in"})
        }
      
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
  }
 const userRoute=(app:express.Application)=>{
    app.post("/users",create)
    app.post("/users/authenticate",authenticate)
     app.get("/users",verifyToken,index)
     app.get("/users/:id",verifyToken,show)
 }
 export default userRoute;