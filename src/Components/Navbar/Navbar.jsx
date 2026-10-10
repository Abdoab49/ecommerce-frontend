import React, { useContext, useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const { cartCount } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('lanada_user');
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                setUser(null);
            }
        }
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('lanada_user_id');
        localStorage.removeItem('lanada_user');
        setUser(null);
        closeMenu();
        navigate('/login');
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.menuToggle} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={styles.logo}>
                    <Link to='/'>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>

                <ul className={`${styles.menuItems} ${isMenuOpen ? styles.active : ''}`}>
                    <li>
                        <Link to='/' className={`${styles.link} ${menu === "shop" ? styles.active : ''}`}
                            onClick={() => { setMenu("shop"); closeMenu(); }}>
                            SHOP
                        </Link>
                    </li>
                    <li>
                        <Link to="/mens" className={`${styles.link} ${menu === "mens" ? styles.active : ''}`}
                            onClick={() => { setMenu("mens"); closeMenu(); }}>
                            MEN
                        </Link>
                    </li>
                    <li>
                        <Link to="/womens" className={`${styles.link} ${menu === "womens" ? styles.active : ''}`}
                            onClick={() => { setMenu("womens"); closeMenu(); }}>
                            JACKETS
                        </Link>
                    </li>
                    <li>
                        <Link to="/casquette" className={`${styles.link} ${menu === "casquette" ? styles.active : ''}`}
                            onClick={() => { setMenu("casquette"); closeMenu(); }}>
                            CASQUETTE
                        </Link>
                    </li>
                    <li>
                        <Link to="/shoes" className={`${styles.link} ${menu === "shoes" ? styles.active : ''}`}
                            onClick={() => { setMenu("shoes"); closeMenu(); }}>
                            SHOES
                        </Link>
                    </li>

                    <li className={styles.mobileLogin}>
                        {user ? (
                            <>
                                <Link to="/orders" className={styles.link} onClick={closeMenu}>
                                    👤 {user.fullName}
                                </Link>
                                <button onClick={handleLogout} className={styles.link} style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}>
                                    LOG OUT
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className={styles.link} onClick={closeMenu}>
                                LOG IN
                            </Link>
                        )}
                    </li>
                </ul>

                <div className={styles.rightSection}>
                    {user ? (
                        <div className={styles.userMenu}>
                            <Link to="/orders" className={styles.userBtn}>
                                👤 {user.fullName.split(' ')[0]}
                            </Link>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className={styles.loginBtn}>
                            LOG IN
                        </Link>
                    )}

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