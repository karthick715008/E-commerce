/* eslint-disable no-case-declarations */
import React, { useContext, useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/frontend_assets/assets';
import { ShopContext } from '../context/SHopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const PlaceOrder = () => {

  

  const [method,setMethod]=useState('cod');
  const {navigate,backendUrl,token,cartItems,setCartItems, getCartAmount,Delivery_fee,products}=useContext(ShopContext);
  const [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = async(e)=>{
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({...data,[name]:value}))
  }

    const onSubmitHandler = async(e)=>{
      e.preventDefault();
      try {
        let orderItem =[]
        for(const items in cartItems){
          for(const item in cartItems[items]){
            if(cartItems[items][item]>0){
              const itemInfo=structuredClone(products.find(product =>product._id===items))
              if (itemInfo){
                itemInfo.size = item
                itemInfo.quantity = cartItems[items][item]
                orderItem.push(itemInfo)

              }
            }
          }
        }
        let orderData ={
          address: formData,
          items: orderItem,
          amount: getCartAmount() + Delivery_fee
        }
        switch(method){
          case 'cod':
            const response = await axios.post(backendUrl + '/api/order/place', orderData,{headers:{token}})
            if(response.data.success){
              setCartItems({})
              navigate('/orders')
            }else{
              toast.error(response.data.message)
            }
            break;

          case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
            if(responseStripe.data.success){
              const{session_url} =responseStripe.data
              window.location.replace(session_url)
            } else{
              toast.error(responseStripe.data.message)
            }
            break;

          // case 'razorpay':
          //   const responseRaxorpay = await axios.post(backendUrl + '/api/order/razorpay',orderData,{headers:{token}})
          //   if(responseRaxorpay.data.success)
          //     console.log(responseRaxorpay.data.order);
              
          //   break;

          default:
            break;
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
        
      }
    }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  min-h-[80hv] border-t '>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div  className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <div  className='flex gap-3'>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        </div>
        <div  className='flex gap-3'>
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="text" placeholder='Street' />
          
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="number" placeholder='Zip Code' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded pu-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
        </div>
      </div>

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          <div className='flex gap-3 flex-col lg:flex-row md:flex-col'>
            <div onClick ={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe' ? 'bg-green-400':''}` }></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick ={()=>setMethod('razopay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razopay' ? 'bg-green-400':''}` }></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick ={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod' ? 'bg-green-400' : ''}` }></p>
              <p className='text-gray-500 textt-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit'  className='bg-black text-white px-8 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder