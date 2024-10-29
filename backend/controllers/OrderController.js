//placing Orders in COD method

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import razorpay from 'razorpay'

//global variables
const currency = 'usd'
const deliverycharge =10


//GATEWAY INITIALIZE
const stripe =new Stripe(process.env.STRIPE_SECRET_KEY)
// const razorpayInstance= new razorpay({
//     key_id:process.env.RAZORPAY_KEY_ID,
//     key_secret:process.env.RAZORPAY_KEY_SECRET,
// })


const placeOrder = async (req,res) =>{
    try {
        const {userId, items, amount, address} = req.body;

        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod:"cod",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true, message:"Ordered Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}
//placing Orders in stripe method

const placeOrderStripe = async (req,res) =>{
    try {
        const {userId, items, amount, address} = req.body;
        const {origin}=req.headers;

        const orderData ={
            userId,
            items,
            amount,
            address,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items =items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price * 100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery fee'
                },
                unit_amount:deliverycharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:"payment",
        })
        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message}) 
    }
}
//verify stripe
const verifyStripe =async(req,res)=>{
    const {orderId,success,userId}=req.body
    try {
        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


//placing Orders in Razorpay Method 

const placeOrderRazorpay = async (req,res) =>{
    // try {
    //     const {userId, items, amount, address} = req.body;
        

    //     const orderData ={
    //         userId,
    //         items,
    //         amount,
    //         address,
    //         paymentMethod:"Razorpay",
    //         payment:false,
    //         date:Date.now()
    //     }

    //     const newOrder = new orderModel(orderData)
    //     await newOrder.save()

    //     const options ={
    //         amount: amount*100,
    //         currency:currency.toUpperCase(),
    //         receipt:newOrder._id.toString()
    //     }
    //     await razorpayInstance.orders.create(options,(error,order)=>{
    //         if(error){
    //             console.log(error);
    //             return res.json({success:false,message:error})
    //         }
    //         res.json({success:true,order})
    //     })
    // } catch (error) {
    //     console.log(error);
    //         res.json({success:false, message:error.message})
    // }
}

// All order data in admin panel
const allOrder = async (req,res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// userOrderData for frontend
const userOrders = async (req,res) =>{
    try {
        const {userId } = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//update status
const updateStatus = async (req,res) =>{
    try {
        const {orderId,status} =req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
export{placeOrder,placeOrderStripe,placeOrderRazorpay,allOrder,userOrders,updateStatus,verifyStripe}