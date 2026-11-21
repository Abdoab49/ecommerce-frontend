
import React from 'react';
import './App.css';

import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from 'react-router-dom';

// GLOBAL COMPONENTS
import Navbar from './Components/Navbar/Navbar';
import MyOrdersButton from './Components/MyOrdersButton/MyOrdersButton';
import BottomNavBar from './Components/BottomNavBar/BottomNavBar';
import NotificationBell from './Components/NotificationBell/NotificationBell';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import GiveawayPromo from './Components/GiveawayPromo/GiveawayPromo';
import Footer from './Components/Footer/Footer';

// MAIN PAGES
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

// LEGAL PAGES
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';

// OFF-CUT
import Offcut from './pages/Offcut/Offcut';

// NIGHT '26
import Night26 from './pages/Night26/Night26';

// MAISON VERREL
import MaisonVerrel from './pages/MaisonVerrel';

// BANNERS
import kid_banner from './Components/Assets/banner_kids.png';

// CONTEXT
import ShopContextProvider from './Context/ShopContext';


function AppContent() {

    const location = useLocation();

    // Maison Verrel is an isolated full-screen page
    const isMaisonVerrel = location.pathname === '/the-rail';

    const pageRoutes = (
        <Routes>

            {/* MAISON VERREL */}
            <Route
                path="/the-rail"
                element={<MaisonVerrel />}
            />

            {/* HOME */}
            <Route
                path="/"
                element={
                    <>
                        <Shop />
                        <GiveawayPromo />
                    </>
                }
            />

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

            {/* HEALTH */}
            <Route
                path="/health"
                element={<HealthCheck />}
            />

            {/* ABOUT */}
            <Route
                path="/about"
                element={<About />}
            />

            {/* PRIVACY */}
            <Route
                path="/privacy"
                element={<PrivacyPolicy />}
            />

            {/* TERMS */}
            <Route
                path="/terms"
                element={<TermsConditions />}
            />

            {/* OFF-CUT */}
            <Route
                path="/offcut"
                element={<Offcut />}
            />

            {/* NIGHT '26 */}
            <Route
                path="/night-26-shell"
                element={<Night26 />}
            />

        </Routes>
    );

    // Isolated Maison Verrel layout
    if (isMaisonVerrel) {
        return pageRoutes;
    }

    // Normal LANADA layout
    return (
        <>
            <ScrollToTop />

            <div className="app-background">

                <div id="stars"></div>

                <div className="app-content">

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
                            {pageRoutes}
                        </div>

                        <Footer
                            logoSrc="/logo512.png"
                        />

                    </div>

                    <BottomNavBar />

                </div>

            </div>
        </>
    );
}


function App() {
    return (
        <ShopContextProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </ShopContextProvider>
    );
}

export default App;
