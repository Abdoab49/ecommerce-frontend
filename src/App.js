import React from 'react';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

/* COMPONENTS */
import Navbar from './Components/Navbar/Navbar';
import NotificationBell from './Components/NotificationBell/NotificationBell';

/* PAGES */
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import Orders from './pages/Orders';
import SizeSelection from './Components/SizeSelection';

/* BANNERS */
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

/* CONTEXT */
import ShopContextProvider from './Context/ShopContext';

function App() {
    return (
        <ShopContextProvider>
            <BrowserRouter>
                <div className="app-background">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                    <div className="app-content">
                        <Navbar />
                        <NotificationBell />
                        <Routes>
                            <Route path='/' element={<Shop />} />
                            <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
                            <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
                            <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
                            <Route path='/product/:productId' element={<Product />} />
                            <Route path='/cart' element={<Cart />} />
                            <Route path='/login' element={<LoginSignup />} />
                            <Route path='/size-selection' element={<SizeSelection />} />
                            <Route path='/orders' element={<Orders />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </ShopContextProvider>
    );
}

export default App;