import React from 'react'
import Hero from '../Components/Hero/Hero'
import Carousel from '../Components/Carousel/Carousel'
import SocialIcons from '../Components/SocialIcons/SocialIcons'
import ShoesCard from '../Components/ShoesCard'
import ShoeStore from '../Components/ShoeStore'
import LogoSlider from '../Components/LogoSlider'
import MarqueeBusiness from '../Components/MarqueeBusiness'
import ProductGrid from '../Components/ProductGrid'
import OverlayCard from '../Components/OverlayCard'
import SimpleCard from '../Components/SimpleCard'
import BannerCard from '../Components/BannerCard'
import PromoCard from '../Components/PromoCard'
import ScrollingText from '../Components/ScrollingText'
import NewOverlayCard from '../Components/NewOverlayCard'
import NewShoeStore from '../Components/NewShoeStore'
import NewPromoCard from '../Components/NewPromoCard'
import Slider from '../Components/Slider'
import ShoeCard from '../Components/ShoeCard/ShoeCard';
import BannerVideo from '../Components/BannerVideo/BannerVideo';
const Shop = () => {
    return (
        <div>
            <Hero />
            <ScrollingText />
            <Carousel />
            <OverlayCard />
            <LogoSlider />
            <ProductGrid />
            <MarqueeBusiness />
            <ShoeStore />
            <ShoesCard />
            <NewOverlayCard />            
            <NewShoeStore />
            <BannerCard />
            <SimpleCard />
            <PromoCard />
            <NewPromoCard />
            <ShoeCard />
            <Slider />
            <BannerVideo />
            <SocialIcons />
        </div>
    )
}

export default Shop