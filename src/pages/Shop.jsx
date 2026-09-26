import React, { lazy, Suspense } from 'react';

// ✅ المكونات اللي فوق — تحميل فوري (مهمة)
import Hero from '../Components/Hero/Hero';
import ScrollingText from '../Components/ScrollingText';
import Carousel from '../Components/Carousel/Carousel';
import OverlayCard from '../Components/OverlayCard';

// ✅ المكونات اللي تحت — Lazy Loading
const LogoSlider = lazy(() => import('../Components/LogoSlider'));
const ProductGrid = lazy(() => import('../Components/ProductGrid'));
const MarqueeBusiness = lazy(() => import('../Components/MarqueeBusiness'));
const ShoeStore = lazy(() => import('../Components/ShoeStore'));
const ShoesCard = lazy(() => import('../Components/ShoesCard'));
const NewOverlayCard = lazy(() => import('../Components/NewOverlayCard'));
const NewShoeStore = lazy(() => import('../Components/NewShoeStore'));
const Slider = lazy(() => import('../Components/Slider'));
const BannerCard = lazy(() => import('../Components/BannerCard'));
const SimpleCard = lazy(() => import('../Components/SimpleCard'));
const PromoCard = lazy(() => import('../Components/PromoCard'));
const NewPromoCard = lazy(() => import('../Components/NewPromoCard'));
const Newsletter = lazy(() => import('../Components/NewsLetter/NewsLetter'));
const SocialIcons = lazy(() => import('../Components/SocialIcons/SocialIcons'));
const LogoScroller = lazy(() => import('../Components/LogoScroller'));

const Shop = () => {
    return (
        <div>
            {/* ✅ المكونات المهمة — تحميل فوري */}
            <Hero />
            <ScrollingText />
            <Carousel />
            <OverlayCard />

            {/* ✅ المكونات الأخرى — Lazy */}
            <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
                <LogoSlider />
                <ProductGrid />
                <MarqueeBusiness />
                <ShoeStore />
                <ShoesCard />
                <NewOverlayCard />
                <NewShoeStore />
                <Slider />
                <BannerCard />
                <SimpleCard />
                <PromoCard />
                <NewPromoCard />
                <Newsletter />
                <SocialIcons />
                <LogoScroller />
            </Suspense>
        </div>
    );
};

export default Shop;