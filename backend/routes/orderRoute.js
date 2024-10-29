import express from 'express'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrder,userOrders,updateStatus, verifyStripe} from '../controllers/OrderController.js'
import adminAuth from '../middleware/adminAuth.js'
import auth from '../middleware/auth.js'


const orderRouter = express.Router()

//admin features
orderRouter.post('/list',adminAuth,allOrder)
orderRouter.post('/update',adminAuth,updateStatus)

//payment
orderRouter.post('/stripe',auth,placeOrderStripe)
orderRouter.post('/place',auth,placeOrder)
orderRouter.post('/razorpay',auth,placeOrderRazorpay)

//userfeayture
orderRouter.post('/userorder',auth,userOrders)

//verify payment
orderRouter.post('/verifyStripe',auth,verifyStripe)
export default orderRouter