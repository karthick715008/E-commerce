import express from 'express'
import { addToCart,getUserCart,updateCart } from '../controllers/cartController.js'
import auth from '../middleware/auth.js'

const cartRoute =express.Router()

cartRoute.post('/get',auth,getUserCart)
cartRoute.post('/add',auth,addToCart)
cartRoute.post('/update',auth,updateCart)

export default cartRoute