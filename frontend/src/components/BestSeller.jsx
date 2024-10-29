import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/SHopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const{products}=useContext(ShopContext)
    const [bestSeller, setBestSellert] = useState([]);
    useEffect(() => {
        const bestProduct=products.filter((item)=>(item.bestseller))
        setBestSellert(bestProduct.slice(0,5));
    }, [products]);


  return (
    <div className='my-10'>
    <div className='text-center py-8 text-3xl'>
        <Title text1={'BEST'} text2={'SELLER'}/>
        <p className='w-3/4 m-auto text-xs sm:text-xm md:text-base text-gray-500'>Lorem ipdum paragraph </p>
    </div>
    {/* Rendering products */}
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-9'>
    {
      bestSeller.map((item,index)=>(
        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
      ))
    }
    </div>

</div>
  )
}

export default BestSeller