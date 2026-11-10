// src/Components/Navbar/Navbar.jsx

import React, { useContext, useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import cart_icon from '../Assets/cart_icon.png';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [menu, setMenu] = useState('shop');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    const { cartCount } = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();

    // Load user
    useEffect(() => {
        const userData = localStorage.getItem('lanada_user');

        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [location.pathname]);

    // Listen for login/logout changes
    useEffect(() => {
        const handleStorageChange = () => {
            const userData = localStorage.getItem('lanada_user');

            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (error) {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('userChanged', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('userChanged', handleStorageChange);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('lanada_user_id');
        localStorage.removeItem('lanada_user');

        setUser(null);
        closeMenu();

        window.dispatchEvent(new Event('userChanged'));

        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>

                {/* Mobile menu toggle */}
                <div
                    className={styles.menuToggle}
                    onClick={toggleMenu}
                    role="button"
                    tabIndex={0}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleMenu();
                        }
                    }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* Logo - New public path */}
                <div className={styles.logo}>
                    <Link to="/" onClick={closeMenu}>
                        <img
                            src="/logo192.png"
                            alt="LANADA Logo"
                            width="48"
                            height="48"
                        />
                    </Link>
                </div>

                {/* Navigation menu */}
                <ul
                    className={`${styles.menuItems} ${
                        isMenuOpen ? styles.active : ''
                    }`}
                >
                    <li>
                        <Link
                            to="/"
                            className={`${styles.link} ${
                                menu === 'shop' ? styles.active : ''
                            }`}
                            onClick={() => {
                                setMenu('shop');
                                closeMenu();
                            }}
                        >
                            SHOP
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/mens"
                            className={`${styles.link} ${
                                menu === 'mens' ? styles.active : ''
                            }`}
                            onClick={() => {
                                setMenu('mens');
                                closeMenu();
                            }}
                        >
                            MEN
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/womens"
                            className={`${styles.link} ${
                                menu === 'womens' ? styles.active : ''
                            }`}
                            onClick={() => {
                                setMenu('womens');
                                closeMenu();
                            }}
                        >
                            JACKETS
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/casquette"
                            className={`${styles.link} ${
                                menu === 'casquette' ? styles.active : ''
                            }`}
                            onClick={() => {
                                setMenu('casquette');
                                closeMenu();
                            }}
                        >
                            CASQUETTE
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/shoes"
                            className={`${styles.link} ${
                                menu === 'shoes' ? styles.active : ''
                            }`}
                            onClick={() => {
                                setMenu('shoes');
                                closeMenu();
                            }}
                        >
                            SHOES
                        </Link>
                    </li>

                    {/* User name - only when logged in */}
                    {user && (
                        <li>
                            <Link
                                to="/orders"
                                className={styles.link}
                                onClick={closeMenu}
                            >
                                {user.fullName?.split(' ')[0] || 'My Account'}
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Right section */}
                <div className={styles.rightSection}>

                    {/* Login / Logout */}
                    {user ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={styles.iconLink}
                            title="Logout"
                            aria-label="Logout"
                        >
                            <FontAwesomeIcon
                                icon={faRightFromBracket}
                                className={styles.userIcon}
                            />
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className={styles.iconLink}
                            title="Login"
                            aria-label="Login"
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className={styles.userIcon}
                            />
                        </Link>
                    )}

                    {/* Cart */}
                    <div className={styles.cart}>
                        <Link to="/cart" aria-label="Shopping cart">
                            <img
                                src={cart_icon}
                                alt="Cart"
                            />
                        </Link>

                        {cartCount > 0 && (
                            <span className={styles.cartCount}>
                                {cartCount}
                            </span>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;