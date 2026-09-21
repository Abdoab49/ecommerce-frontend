import React, { useContext, useState } from 'react';
import styles from './Navbar.module.css';
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
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                {/* زر القائمة (Hamburger) */}
                <div className={styles.menuToggle} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* LOGO */}
                <div className={styles.logo}>
                    <Link to='/'>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                {/* MENU ITEMS */}
                <ul className={`${styles.menuItems} ${isMenuOpen ? styles.active : ''}`}>
                    <li>
                        <Link 
                            to='/' 
                            className={`${styles.link} ${menu === "shop" ? styles.active : ''}`}
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
                            className={`${styles.link} ${menu === "mens" ? styles.active : ''}`}
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
                            className={`${styles.link} ${menu === "womens" ? styles.active : ''}`}
                            onClick={() => {
                                setMenu("womens");
                                closeMenu();
                            }}
                        >
                            WOMEN
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/kids" 
                            className={`${styles.link} ${menu === "kids" ? styles.active : ''}`}
                            onClick={() => {
                                setMenu("kids");
                                closeMenu();
                            }}
                        >
                            KIDS
                        </Link>
                    </li>
                    {/* زر LOGIN داخل القائمة للهواتف */}
                    <li className={styles.mobileLogin}>
                        <Link 
                            to="/login" 
                            className={styles.link}
                            onClick={closeMenu}
                        >
                            LOG IN
                        </Link>
                    </li>
                </ul>

                {/* LOGIN + CART للشاشات الكبيرة */}
                <div className={styles.rightSection}>
                    <Link to="/login" className={styles.loginBtn}>
                        LOG IN
                    </Link>
                    
                    <div className={styles.cart}>
                        <Link to='/cart'>
                            <img src={cart_icon} alt="cart" />
                        </Link>
                        {cartCount > 0 && (
                            <span className={styles.cartCount}>{cartCount}</span>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;