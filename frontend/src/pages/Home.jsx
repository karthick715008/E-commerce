import React from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import ProductItem from '../components/ProductItem'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
      
      
    </div>
  )
}

export default Home