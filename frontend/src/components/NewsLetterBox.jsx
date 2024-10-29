import React from 'react'

const NewsLetterBox = () => {
    const OnSubmiHandler =(e)=>{
        e.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-mediu text-gray-800'>Subscribe Now & 20% Offer</p>
        <p className=' mt-3 text-gray-400'>sadfsagf sfgslfh akjsfdkjasf skajhfsajhf ksaajfhksajfh</p>
        
        
        <form onSubmit={OnSubmiHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required />
            <button  type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox