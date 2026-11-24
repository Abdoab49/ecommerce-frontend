
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({
    logoSrc = '/logo192.png',
    contactEmail = '',
    onNewsletterSubmit,
    imageSrc = '/Assets/footer-campaign.jpg',
}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);
    const [logoError, setLogoError] = useState(false);
    const [mouse, setMouse] = useState({ x: -100, y: -100 });
    const [entered, setEntered] = useState(false);

    const footerRef = useRef(null);

    const year = new Date().getFullYear();

    useEffect(() => {
        const footer = footerRef.current;
        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setEntered(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (event) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const rect = footerRef.current?.getBoundingClientRect();
        if (!rect) return;

        setMouse({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleScan = () => {
        if (!footerRef.current) return;

        footerRef.current.classList.remove('lanada-scan');
        void footerRef.current.offsetWidth;
        footerRef.current.classList.add('lanada-scan');
    };

    const handleNewsletter = async (event) => {
        event.preventDefault();

        const cleanEmail = email.trim().toLowerCase();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(cleanEmail)) {
            setMessage('Please enter a valid email address.');
            setMessageType('error');
            return;
        }

        if (loading) return;

        try {
            setLoading(true);
            setMessage('');
            setMessageType('');

            if (typeof onNewsletterSubmit === 'function') {
                await onNewsletterSubmit(cleanEmail);

                setMessage('Thank you for joining LANADA.');
                setMessageType('success');
                setEmail('');
                return;
            }

            if (contactEmail) {
                const subject = encodeURIComponent(
                    'LANADA Newsletter Subscription'
                );

                const body = encodeURIComponent(
                    `Hello LANADA,\n\nPlease add this email to your newsletter:\n\n${cleanEmail}\n\nThank you.`
                );

                window.location.href =
                    `mailto:${contactEmail}?subject=${subject}&body=${body}`;

                setMessage('Your email application is opening.');
                setMessageType('info');
                return;
            }

            setMessage('Newsletter service is not connected yet.');
            setMessageType('error');
        } catch (error) {
            console.error('Newsletter error:', error);

            setMessage(
                error?.message || 'Something went wrong. Please try again.'
            );
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const footerLinks = [
        {
            title: 'EXPLORE',
            links: [
                { label: 'Shop All', to: '/shop' },
                { label: 'Men', to: '/mens' },
                { label: 'Jackets', to: '/womens' },
                { label: 'Shoes', to: '/shoes' },
                { label: 'Casquette', to: '/casquette' },
                { label: 'Offcut', to: '/offcut' },
            ],
        },
        {
            title: 'LANADA',
            links: [
                { label: 'Our Story', to: '/about' },
                { label: 'Night 26', to: '/night-26-shell' },
                { label: 'My Orders', to: '/orders' },
            ],
        },
        {
            title: 'INFORMATION',
            links: [
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Terms & Conditions', to: '/terms' },
            ],
        },
    ];

    return (
        <footer
            ref={footerRef}
            className={`lanada-editorial-footer ${entered ? 'is-visible' : ''}`}
            onMouseMove={handleMouseMove}
            onClick={handleScan}
            style={{
                '--mouse-x': `${mouse.x}px`,
                '--mouse-y': `${mouse.y}px`,
            }}
        >
            {/* CAMPAIGN IMAGE */}

            <div className="lanada-footer-art">
                <img
                    src={imageSrc}
                    alt=""
                    className="lanada-footer-art-image"
                    loading="lazy"
                />

                <div className="lanada-footer-art-overlay" />

                <div className="lanada-footer-art-caption">
                    <span>LANADA STUDIO</span>
                    <span>COLLECTION / 2026</span>
                </div>

                <div className="lanada-footer-art-index">
                    <span>01</span>
                    <span>—</span>
                    <span>26</span>
                </div>
            </div>

            {/* MAIN RED FIELD */}

            <div className="lanada-footer-red">

                {/* POINTER EFFECT */}

                <div
                    className="lanada-footer-pointer"
                    aria-hidden="true"
                />

                <div className="lanada-footer-topline">
                    <span>THE ART OF EVERYDAY STYLE.</span>
                    <span>MADE TO BE DIFFERENT.</span>
                </div>

                {/* BRAND */}

                <div className="lanada-footer-brand">

                    <div className="lanada-footer-brand-logo">
                        {!logoError && logoSrc ? (
                            <img
                                src={logoSrc}
                                alt="LANADA"
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <span>LANADA</span>
                        )}
                    </div>

                    <h2 className="lanada-footer-wordmark">
                        LANADA
                    </h2>

                    <div className="lanada-footer-brand-description">
                        <p>
                            NOT JUST CLOTHING.
                            <br />
                            A WAY OF SEEING THE WORLD.
                        </p>

                        <span className="lanada-footer-brand-number">
                            L—001
                        </span>
                    </div>
                </div>

                {/* NEWSLETTER */}

                <section className="lanada-footer-newsletter">

                    <div className="lanada-footer-newsletter-copy">
                        <span className="lanada-footer-eyebrow">
                            THE LANADA LETTER
                        </span>

                        <h3>
                            Stay ahead.
                            <br />
                            Stay <em>different.</em>
                        </h3>

                        <p>
                            New collections. Unexpected drops.
                            Stories worth knowing.
                        </p>
                    </div>

                    <form
                        className="lanada-footer-form"
                        onSubmit={handleNewsletter}
                        noValidate
                    >
                        <label htmlFor="lanada-newsletter-email">
                            YOUR EMAIL ADDRESS
                        </label>

                        <div className="lanada-footer-input-row">
                            <input
                                id="lanada-newsletter-email"
                                type="email"
                                name="newsletterEmail"
                                placeholder="name@email.com"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setMessage('');
                                    setMessageType('');
                                }}
                                disabled={loading}
                                required
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                aria-label="Subscribe to newsletter"
                            >
                                {loading ? (
                                    <span className="lanada-footer-loader" />
                                ) : (
                                    <span className="lanada-footer-arrow">
                                        ↗
                                    </span>
                                )}
                            </button>
                        </div>

                        {message && (
                            <p
                                className={`lanada-footer-feedback ${messageType}`}
                                role="status"
                                aria-live="polite"
                            >
                                {message}
                            </p>
                        )}

                        <span className="lanada-footer-privacy">
                            NO SPAM. ONLY GOOD THINGS.
                        </span>
                    </form>
                </section>

                {/* NAVIGATION */}

                <div className="lanada-footer-links">

                    {footerLinks.map((column) => (
                        <nav
                            key={column.title}
                            className="lanada-footer-link-column"
                            aria-label={column.title}
                        >
                            <h4>{column.title}</h4>

                            {column.links.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                >
                                    {link.label}
                                    <span>↗</span>
                                </Link>
                            ))}
                        </nav>
                    ))}

                    {/* CONTACT */}

                    <div className="lanada-footer-link-column lanada-footer-contact-column">
                        <h4>GET IN TOUCH</h4>

                        {contactEmail ? (
                            <a href={`mailto:${contactEmail}`}>
                                {contactEmail}
                                <span>↗</span>
                            </a>
                        ) : (
                            <Link to="/about">
                                Contact LANADA
                                <span>↗</span>
                            </Link>
                        )}

                        <p>
                            Casablanca
                            <br />
                            Morocco
                        </p>

                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Instagram
                            <span>↗</span>
                        </a>
                    </div>
                </div>

                {/* BOTTOM */}

                <div className="lanada-footer-bottom">

                    <div className="lanada-footer-bottom-left">
                        <span>© {year} LANADA</span>
                        <span>ALL RIGHTS RESERVED.</span>
                    </div>

                    <button
                        type="button"
                        className="lanada-footer-back-top"
                        onClick={(event) => {
                            event.stopPropagation();
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth',
                            });
                        }}
                    >
                        BACK TO TOP
                        <span>↑</span>
                    </button>

                    <span className="lanada-footer-bottom-tag">
                        MADE FOR YOUR STYLE.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
