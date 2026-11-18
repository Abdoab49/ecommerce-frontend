import React, { useContext, useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import cart_icon from '../Assets/cart_icon.png';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { useTranslation } from 'react-i18next';

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

    const { t, i18n } = useTranslation();

    const currentLanguage = (
        i18n.resolvedLanguage ||
        i18n.language ||
        'en'
    ).split('-')[0];

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLanguageChange = (event) => {
        const language = event.target.value;

        i18n.changeLanguage(language);
        closeMenu();
    };

    // Load user
    useEffect(() => {
        const userData = localStorage.getItem('lanada_user');

        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch {
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
                } catch {
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

    // Logout
    const handleLogout = () => {
        localStorage.removeItem('lanada_user_id');
        localStorage.removeItem('lanada_user');

        setUser(null);
        closeMenu();

        window.dispatchEvent(new Event('userChanged'));

        navigate('/login');
    };

    const handleNavigation = (menuName) => {
        setMenu(menuName);
        closeMenu();
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

                {/* Logo */}
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
                            onClick={() => handleNavigation('shop')}
                        >
                            {t('nav.shop')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/mens"
                            className={`${styles.link} ${
                                menu === 'mens' ? styles.active : ''
                            }`}
                            onClick={() => handleNavigation('mens')}
                        >
                            {t('nav.men')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/womens"
                            className={`${styles.link} ${
                                menu === 'womens' ? styles.active : ''
                            }`}
                            onClick={() => handleNavigation('womens')}
                        >
                            {t('nav.jackets')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/casquette"
                            className={`${styles.link} ${
                                menu === 'casquette' ? styles.active : ''
                            }`}
                            onClick={() => handleNavigation('casquette')}
                        >
                            {t('nav.caps')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/shoes"
                            className={`${styles.link} ${
                                menu === 'shoes' ? styles.active : ''
                            }`}
                            onClick={() => handleNavigation('shoes')}
                        >
                            {t('nav.shoes')}
                        </Link>
                    </li>

                    {user && (
                        <li>
                            <Link
                                to="/orders"
                                className={styles.link}
                                onClick={closeMenu}
                            >
                                {user.fullName?.split(' ')[0] ||
                                    t('common.account')}
                            </Link>
                        </li>
                    )}
                </ul>

                {/* Right section */}
                <div className={styles.rightSection}>

                    {/* Language selector */}
                    <div className="lanada-language-switcher">
                        <span aria-hidden="true">🌐</span>

                        <select
                            value={currentLanguage}
                            onChange={handleLanguageChange}
                            aria-label="Select website language"
                        >
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="ar">العربية</option>
                        </select>
                    </div>

                    {/* Login / Logout */}
                    {user ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={styles.iconLink}
                            title={t('auth.logout')}
                            aria-label={t('auth.logout')}
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
                            title={t('auth.login')}
                            aria-label={t('auth.login')}
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className={styles.userIcon}
                            />
                        </Link>
                    )}

                    {/* Cart */}
                    <div className={styles.cart}>
                        <Link
                            to="/cart"
                            aria-label={t('nav.cart')}
                        >
                            <img
                                src={cart_icon}
                                alt={t('nav.cart')}
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
