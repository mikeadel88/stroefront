import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productRoute from './handlers/product'
import userRoute from './handlers/users'
import OrderRoute from './handlers/order'
const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
productRoute(app);
userRoute(app);
OrderRoute(app);
app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
export default app
