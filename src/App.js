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
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';

/* PAGES */
import Shop from './pages/Shop';
import ShopCategory from './pages/ShopCategory';
import Product from './pages/Product';
import Cart from './Components/Cart/Cart';
import Login from './pages/Login';        // ✅ Bdel
import Signup from './pages/Signup';      // ✅ Zid
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import SizeSelection from './Components/SizeSelection';
import Casquette from './pages/Casquette';
import Mens from './pages/Mens';
import Jackets from './pages/Jackets';
import Shoes from './pages/Shoes';

/* BANNERS */
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';

/* CONTEXT */
import ShopContextProvider from './Context/ShopContext';

const shoes_banner = "/Assets/ShoeStore/background8.png";

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
                            <Route path='/login' element={<Login />} />        {/* ✅ Bdel */}
                            <Route path='/signup' element={<Signup />} />      {/* ✅ Zid */}
                            <Route path='/size-selection' element={<SizeSelection />} />
                            <Route path='/orders' element={<Orders />} />
                            <Route path='/admin' element={<Admin />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </ShopContextProvider>
    );
}

export default App;