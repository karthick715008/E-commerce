import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/SHopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
const Collections = () => {
  const {products,search,showSearch}=useContext(ShopContext);
  const [productList, setProductList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [sortBy, setSortBy] = useState('relevant');
  
  const ToggleCategory =(e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setCategory(prev=>[...prev, e.target.value])
    }
  }

  const ToggleType =(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item !== e.target.value))
    }else{
      setSubCategory(prev=>[...prev, e.target.value])
    }
  }

  const ApplyFilter=()=>{
    let productsCopy =products.slice();

    if(showSearch && search){
      productsCopy=productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if(category.length>0){
      productsCopy=productsCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length>0){
      productsCopy=productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setProductList(productsCopy);
  }


  const SortItBy =()=>{
    let fbcopy=productList.slice();

    switch(sortBy){
      case 'low-high':
        setProductList(fbcopy.sort((a,b)=>(a.price-b.price)));
        break;
      case 'high-low':
        setProductList(fbcopy.sort((a,b)=>(b.price-a.price)));
        break;
      default:
        ApplyFilter();
        break;
    }
  }

  useEffect(()=>{
    SortItBy();
  },[sortBy]);


  useEffect(() => {
    
    ApplyFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[category,subCategory,search,showSearch,products]);

  
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* category filter */}
        <div  className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' value={'Men'} type="checkbox" onChange={ToggleCategory}/>Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' value={'Women'} type="checkbox" onChange={ToggleCategory}/>Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' value={'Kids'} type="checkbox" onChange={ToggleCategory}/>Kids
            </p>
          </div>
        </div>

        {/* Type  Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-3 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' value={'Topwear'} type="checkbox" onChange={ToggleType}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' value={'Bottomwear'} type="checkbox" onChange={ToggleType}/>BottomWear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' value={'Winterwear'} type="checkbox" onChange={ToggleType}/>WinterWear
            </p>
          </div>
        </div>
      </div>

      {/* RightSide */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product Sort */}
          <select onChange={(e)=>setSortBy(e.target.value)} className='border-2 border-gray-300 text-sm px-2' name="" id="">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* Map Product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-9'>
        {
          productList.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default Collections