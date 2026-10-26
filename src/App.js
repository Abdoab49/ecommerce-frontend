// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* COMPONENTS */
import Navbar from './Components/Navbar/Navbar';
import MyOrdersButton from './Components/MyOrdersButton/MyOrdersButton';
import BottomNavBar from './Components/BottomNavBar/BottomNavBar';
import NotificationBell from './Components/NotificationBell/NotificationBell';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import Footer from './Components/Footer/Footer';

/* PAGES */
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

/* BANNERS */
import kid_banner from './Components/Assets/banner_kids.png';

/* CONTEXT */
import ShopContextProvider from './Context/ShopContext';

function App() {
    return (
        <ShopContextProvider>
            <BrowserRouter>
                <ScrollToTop />
                <div className="app-background">
                    <div id="stars"></div>
                    <div className="app-content">
                        <Navbar />
                        <NotificationBell />

                        <MyOrdersButton />

                        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                            
                            <div style={{ flex: 1 }}>
                                <Routes>
                                    <Route path='/' element={<Shop />} />
                                    <Route path='/shop' element={<Shop />} />
                                    <Route path='/mens' element={<Mens />} />
                                    <Route path='/womens' element={<Jackets />} />
                                    <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
                                    <Route path='/shoes' element={<Shoes />} />
                                    <Route path='/casquette' element={<Casquette />} />
                                    <Route path='/product/:productId' element={<Product />} />
                                    <Route path='/cart' element={<Cart />} />
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/signup' element={<Signup />} />
                                    <Route path='/forgot-password' element={<ForgotPassword />} />
                                    <Route path='/reset-password/:token' element={<ResetPassword />} />
                                    <Route path='/size-selection' element={<SizeSelection />} />
                                    <Route path='/orders' element={<Orders />} />
                                    <Route path='/admin' element={<Admin />} />
                                </Routes>
                            </div>

                            <Footer />
                        </div>

                        <BottomNavBar />
                    </div>
                </div>
            </BrowserRouter>
        </ShopContextProvider>
    );
}

export default App;