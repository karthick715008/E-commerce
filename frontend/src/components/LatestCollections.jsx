/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/SHopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollections = () => {
    const{products}=useContext(ShopContext)
    const [latestProduct, setLatestProduct] = useState([]);
    useEffect(() => {
        
        setLatestProduct(products.slice(0,10));
    }, [products]);
    
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-xm md:text-base text-gray-500'>Lorem ipdum paragraph </p>
        </div>
        {/* Rendering products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-9'>
        {
          latestProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
        </div>

    </div>
  )
}

export default LatestCollections