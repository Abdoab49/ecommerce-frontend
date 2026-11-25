
import React, { useState } from 'react';
import './App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

/* =========================================
   GLOBAL COMPONENTS
========================================= */

import Navbar from './Components/Navbar/Navbar';
import MyOrdersButton from './Components/MyOrdersButton/MyOrdersButton';
import BottomNavBar from './Components/BottomNavBar/BottomNavBar';
import NotificationBell from './Components/NotificationBell/NotificationBell';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import GiveawayPromo from './Components/GiveawayPromo/GiveawayPromo';
import Footer from './Components/Footer/Footer';

/* =========================================
   INTERACTIVE CARD STACK
========================================= */

import InteractiveCardStack from './Components/InteractiveCardStack/InteractiveCardStack';

import { RefreshCcw } from 'lucide-react';

/* =========================================
   MAIN PAGES
========================================= */

import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';

import Cart from './Components/Cart/Cart';

import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import Orders from './pages/Orders';
import Admin from './pages/Admin';
import SizeSelection from './Components/SizeSelection';

import Casquette from './pages/Casquette';
import Mens from './pages/Mens';
import Jackets from './pages/Jackets';
import Shoes from './pages/Shoes';
import HealthCheck from './pages/HealthCheck';

/* =========================================
   LEGAL & INFORMATION PAGES
========================================= */

import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

/* =========================================
   OFF-CUT PAGE
========================================= */

import Offcut from './pages/Offcut/Offcut';

/* =========================================
   NIGHT '26 SHELL PAGE
========================================= */

import Night26 from './pages/Night26/Night26';

/* =========================================
   BANNERS
========================================= */

import kid_banner from './Components/Assets/banner_kids.png';

/* =========================================
   CONTEXT
========================================= */

import ShopContextProvider from './Context/ShopContext';

/* =========================================
   CARD IMAGES
========================================= */

const IMAGES = [
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format',
    'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format'
];

/* =========================================
   INTERACTIVE CARD SECTION
========================================= */

function InteractiveCardSection() {
    const [key, setKey] = useState(0);

    const cardItems = IMAGES.map((src, index) => (
        <div
            key={index}
            className="lanada-card-content"
        >
            <img
                src={src}
                alt={`Showcase ${index + 1}`}
                loading="lazy"
            />

            <div className="lanada-card-overlay" />
        </div>
    ));

    return (
        <section className="lanada-card-stack-section">

            <h2 className="lanada-card-stack-title">
                Interactive Card Stack
            </h2>

            <div className="lanada-card-stack-wrapper">

                <InteractiveCardStack
                    key={key}
                    cards={cardItems}
                    randomRotation={true}
                    sensitivity={180}
                    sendToBackOnClick={true}
                    autoplay={false}
                    autoplayDelay={3500}
                    pauseOnHover={true}
                    mobileClickOnly={false}
                />

                <button
                    type="button"
                    onClick={() => setKey((prev) => prev + 1)}
                    className="lanada-card-reset"
                    aria-label="Reset Animation"
                    title="Reset Animation"
                >
                    <RefreshCcw size={20} />
                </button>

            </div>

            <p className="lanada-card-stack-hint">
                Drag or click the top card to cycle
            </p>

        </section>
    );
}

/* =========================================
   APP
========================================= */

function App() {
    return (
        <ShopContextProvider>

            <BrowserRouter>

                <ScrollToTop />

                <div className="app-background">

                    <div id="stars"></div>

                    <div className="app-content">

                        {/* GLOBAL COMPONENTS */}

                        <Navbar />

                        <NotificationBell />

                        <MyOrdersButton />

                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                minHeight: '100vh'
                            }}
                        >

                            <div style={{ flex: 1 }}>

                                <Routes>

                                    {/* HOME */}

                                    <Route
                                        path="/"
                                        element={
                                            <>
                                                <Shop />

                                                <InteractiveCardSection />

                                                <GiveawayPromo />
                                            </>
                                        }
                                    />

                                    {/* SHOP */}

                                    <Route
                                        path="/shop"
                                        element={
                                            <>
                                                <Shop />
                                                <GiveawayPromo />
                                            </>
                                        }
                                    />

                                    {/* SHOP CATEGORIES */}

                                    <Route
                                        path="/mens"
                                        element={<Mens />}
                                    />

                                    <Route
                                        path="/womens"
                                        element={<Jackets />}
                                    />

                                    <Route
                                        path="/kids"
                                        element={
                                            <ShopCategory
                                                banner={kid_banner}
                                                category="kid"
                                            />
                                        }
                                    />

                                    <Route
                                        path="/shoes"
                                        element={<Shoes />}
                                    />

                                    <Route
                                        path="/casquette"
                                        element={<Casquette />}
                                    />

                                    {/* PRODUCT */}

                                    <Route
                                        path="/product/:productId"
                                        element={<Product />}
                                    />

                                    {/* CART */}

                                    <Route
                                        path="/cart"
                                        element={<Cart />}
                                    />

                                    {/* AUTHENTICATION */}

                                    <Route
                                        path="/login"
                                        element={<Login />}
                                    />

                                    <Route
                                        path="/signup"
                                        element={<Signup />}
                                    />

                                    <Route
                                        path="/forgot-password"
                                        element={<ForgotPassword />}
                                    />

                                    <Route
                                        path="/reset-password/:token"
                                        element={<ResetPassword />}
                                    />

                                    {/* ORDERS */}

                                    <Route
                                        path="/orders"
                                        element={<Orders />}
                                    />

                                    {/* ADMIN */}

                                    <Route
                                        path="/admin"
                                        element={<Admin />}
                                    />

                                    {/* SIZE SELECTION */}

                                    <Route
                                        path="/size-selection"
                                        element={<SizeSelection />}
                                    />

                                    {/* HEALTH CHECK */}

                                    <Route
                                        path="/health"
                                        element={<HealthCheck />}
                                    />

                                    {/* ABOUT LANADA */}

                                    <Route
                                        path="/about"
                                        element={<About />}
                                    />

                                    {/* PRIVACY POLICY */}

                                    <Route
                                        path="/privacy"
                                        element={<PrivacyPolicy />}
                                    />

                                    {/* TERMS & CONDITIONS */}

                                    <Route
                                        path="/terms"
                                        element={<TermsConditions />}
                                    />

                                    {/* OFF-CUT */}

                                    <Route
                                        path="/offcut"
                                        element={<Offcut />}
                                    />

                                    {/* NIGHT '26 SHELL */}

                                    <Route
                                        path="/night-26-shell"
                                        element={<Night26 />}
                                    />

                                </Routes>

                            </div>

                            {/* FOOTER */}

                            <Footer logoSrc="/logo512.png" />

                        </div>

                        {/* MOBILE NAVIGATION */}

                        <BottomNavBar />

                    </div>

                </div>

            </BrowserRouter>

        </ShopContextProvider>
    );
}

export default App;
