import React from 'react'
import Hero from '../Components/Hero/Hero'
import Carousel from '../Components/Carousel/Carousel'
import Newsletter from '../Components/NewsLetter/NewsLetter'
import SocialIcons from '../Components/SocialIcons/SocialIcons'
import ShoesCard from '../Components/ShoesCard'
import ShoeStore from '../Components/ShoeStore'
import LogoSlider from '../Components/LogoSlider'
import MarqueeBusiness from '../Components/MarqueeBusiness'
import ProductGrid from '../Components/ProductGrid'
import OverlayCard from '../Components/OverlayCard'
import Slider from '../Components/Slider'
import SimpleCard from '../Components/SimpleCard'
import BannerCard from '../Components/BannerCard'
import PromoCard from '../Components/PromoCard'
import ScrollingText from '../Components/ScrollingText'
import LogoScroller from '../Components/LogoScroller'
import NewOverlayCard from '../Components/NewOverlayCard'
import NewShoeStore from '../Components/NewShoeStore'
import ImageCarousel from '../Components/ImageCarousel'
import HeroCard from '../Components/HeroCard'
const Shop = () => {
    return (
        <div>

            <Hero />
            <ScrollingText />
            <Carousel />
            <HeroCard />
            <OverlayCard />
            <LogoSlider />
            <ProductGrid />
            <MarqueeBusiness />
            <ShoeStore />
            <ShoesCard />
            <NewOverlayCard />            
            <NewShoeStore />
            <ImageCarousel />
            <Slider />
            <BannerCard />
            <SimpleCard />
            <PromoCard />
            <Newsletter />
            <SocialIcons />
            <LogoScroller />
        </div>
    )
}

export default Shop