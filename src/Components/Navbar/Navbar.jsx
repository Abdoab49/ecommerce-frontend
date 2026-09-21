import styles from './Navbar.module.css';
import React, { useContext, useState } from 'react';
import './Navbar.module.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getTotalCartItems, totalCartItems } = useContext(ShopContext);
    
    const cartCount = typeof getTotalCartItems === 'function' 
        ? getTotalCartItems() 
        : (totalCartItems || 0);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={navbar}>
            <div className={navbarContainer}>
                {/* زر القائمة (Hamburger) */}
                <div className={menuToggle} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* LOGO */}
                <div className={logo}>
                    <Link to='/'>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                {/* MENU ITEMS */}
                <ul className={`${menuItems} ${isMenuOpen ? active : ''}`}>
                    <li>
                        <Link 
                            to='/' 
                            className={`${link} ${menu === "shop" ? active : ''}`}
                            onClick={() => {
                                setMenu("shop");
                                closeMenu();
                            }}
                        >
                            SHOP
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/mens" 
                            className={`${link} ${menu === "mens" ? active : ''}`}
                            onClick={() => {
                                setMenu("mens");
                                closeMenu();
                            }}
                        >
                            MEN
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/womens" 
                            className={`${link} ${menu === "womens" ? active : ''}`}
                            onClick={() => {
                                setMenu("womens");
                                closeMenu();
                            }}
                        >
                            SPORT
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/kids" 
                            className={`${link} ${menu === "kids" ? active : ''}`}
                            onClick={() => {
                                setMenu("kids");
                                closeMenu();
                            }}
                        >
                            KIDS
                        </Link>
                    </li>
                    {/* زر LOGIN داخل القائمة للهواتف */}
                    <li className={mobileLogin}>
                        <Link 
                            to="/login" 
                            className={link}
                            onClick={closeMenu}
                        >
                            LOG IN
                        </Link>
                    </li>
                </ul>

                {/* LOGIN + CART للشاشات الكبيرة */}
                <div className={rightSection}>
                    <Link to="/login" className={loginBtn}>
                        LOG IN
                    </Link>
                    
                    <div className={cart}>
                        <Link to='/cart'>
                            <img src={cart_icon} alt="cart" />
                        </Link>
                        {cartCount > 0 && (
                            <span className={cartCount}>{cartCount}</span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;