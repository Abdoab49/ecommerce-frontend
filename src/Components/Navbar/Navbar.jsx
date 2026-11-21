
import React, { useContext, useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import cart_icon from '../Assets/cart_icon.png';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);

    const { cartCount } = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const loadUser = () => {
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

        loadUser();
    }, [location.pathname]);

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

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('lanada_user_id');
        localStorage.removeItem('lanada_user');

        setUser(null);
        closeMenu();

        window.dispatchEvent(new Event('userChanged'));

        navigate('/login');
    };

    const navLinks = [
        { label: 'SHOP', path: '/', key: 'shop' },
        { label: 'MEN', path: '/mens', key: 'mens' },
        { label: 'JACKETS', path: '/womens', key: 'womens' },
        { label: 'CASQUETTE', path: '/casquette', key: 'casquette' },
        { label: 'SHOES', path: '/shoes', key: 'shoes' },
        { label: 'OFFCUT', path: '/offcut', key: 'offcut' }
    ];

    return (
        <nav
            className={`${styles.navbar} ${
                isHomePage ? styles.homeNavbar : styles.innerNavbar
            }`}
        >
            <div className={styles.navbarContainer}>

                {/* LOGO */}

                <Link
                    to="/"
                    className={styles.logo}
                    onClick={closeMenu}
                    aria-label="LANADA Home"
                >
                    <img
                        src="/logo192.png"
                        alt="LANADA"
                        width="48"
                        height="48"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}

                <ul
                    className={`${styles.menuItems} ${
                        isMenuOpen ? styles.active : ''
                    }`}
                >
                    {navLinks.map((item) => {
                        const isActive =
                            item.path === '/'
                                ? location.pathname === '/'
                                : location.pathname === item.path;

                        return (
                            <li key={item.key}>
                                <Link
                                    to={item.path}
                                    className={`${styles.link} ${
                                        isActive ? styles.activeLink : ''
                                    }`}
                                    onClick={closeMenu}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}

                    {user && (
                        <li>
                            <Link
                                to="/orders"
                                className={`${styles.link} ${
                                    location.pathname === '/orders'
                                        ? styles.activeLink
                                        : ''
                                }`}
                                onClick={closeMenu}
                            >
                                {user.fullName?.split(' ')[0] || 'MY ACCOUNT'}
                            </Link>
                        </li>
                    )}

                    {/* MOBILE ACCOUNT ACTIONS */}

                    <li className={styles.mobileAccount}>
                        {user ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className={styles.mobileAction}
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} />
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className={styles.mobileAction}
                                onClick={closeMenu}
                            >
                                <FontAwesomeIcon icon={faUser} />
                                Login
                            </Link>
                        )}

                        <Link
                            to="/cart"
                            className={styles.mobileAction}
                            onClick={closeMenu}
                        >
                            <img src={cart_icon} alt="" />
                            Shopping Cart
                            {cartCount > 0 && (
                                <span className={styles.mobileCartCount}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>

                {/* RIGHT SECTION */}

                <div className={styles.rightSection}>

                    {user ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={styles.iconLink}
                            title="Logout"
                            aria-label="Logout"
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className={styles.iconLink}
                            title="Login"
                            aria-label="Login"
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    )}

                    <Link
                        to="/cart"
                        className={styles.cart}
                        aria-label="Shopping cart"
                    >
                        <img src={cart_icon} alt="Cart" />

                        {cartCount > 0 && (
                            <span className={styles.cartCount}>
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link
                        to={user ? '/orders' : '/signup'}
                        className={styles.registerButton}
                    >
                        {user ? 'MY ACCOUNT' : 'REGISTER'}
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

                {/* MOBILE MENU BUTTON */}

                <button
                    type="button"
                    className={styles.menuToggle}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>
        </nav>
    );
};

export default Navbar;
