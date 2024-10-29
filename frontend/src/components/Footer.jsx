import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_2fr_1fr] gap-14 my-14 mt-40 text-sm'>
            <div>
                <img src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>

            <div className='mt-8'>
                <p className='text-xl font-medium mb-5 '>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>AboutUs</li>
                    <li>Delivery</li>
                    <li>Policy</li>
                </ul>
            </div>
            <div className='mt-8'>
                <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>932673523</li>
                    <li>KASDGF@GMAIL.COM</li>
                    
                </ul>
            </div>
 
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer