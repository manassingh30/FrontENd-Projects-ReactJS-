import React, {useContext} from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/myContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Testimonial from '../../components/testimonial/testimonial'


function Home() {

  
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Testimonial />
    </Layout>
  )
}

export default Home