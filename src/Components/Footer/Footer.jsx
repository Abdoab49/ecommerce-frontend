
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({
    logoSrc = '/logo192.png',
    contactEmail = '',
    onNewsletterSubmit,
}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);
    const [logoError, setLogoError] = useState(false);

    const year = new Date().getFullYear();

    // NEWSLETTER SUBMISSION
    const handleNewsletter = async (event) => {
        event.preventDefault();

        const cleanEmail = email.trim().toLowerCase();

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!cleanEmail || !emailPattern.test(cleanEmail)) {
            setMessageType('error');
            setMessage('Please enter a valid email address.');
            return;
        }

        if (loading) return;

        try {
            setLoading(true);
            setMessage('');
            setMessageType('');

            // Submit through backend callback
            if (typeof onNewsletterSubmit === 'function') {
                await onNewsletterSubmit(cleanEmail);

                setMessageType('success');
                setMessage(
                    'Thank you! You have successfully joined LANADA.'
                );

                setEmail('');
                return;
            }

            // Open email application
            if (contactEmail) {
                const subject = encodeURIComponent(
                    'LANADA Newsletter Subscription'
                );

                const body = encodeURIComponent(
                    `Hello LANADA,

Please add this email to your newsletter:

${cleanEmail}

Thank you.`
                );

                const mailtoUrl =
                    `mailto:${contactEmail}?subject=${subject}&body=${body}`;

                window.location.href = mailtoUrl;

                setMessageType('info');
                setMessage(
                    'Your email application is opening. Send the message to complete your request.'
                );

                return;
            }

            setMessageType('error');
            setMessage(
                'Newsletter service is not connected yet. Please try again later.'
            );

        } catch (error) {
            console.error('Newsletter submission error:', error);

            setMessageType('error');
            setMessage(
                error?.message || 'Something went wrong. Please try again.'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="lanada-footer">

            <div className="lanada-footer-container">

                {/* LOGO */}

                <div className="lanada-footer-logo-area">

                    {!logoError && logoSrc ? (
                        <img
                            src={logoSrc}
                            alt="LANADA logo"
                            className="lanada-footer-logo"
                            onError={() => setLogoError(true)}
                        />
                    ) : (
                        <span className="lanada-footer-logo-text">
                            LANADA<span>.</span>
                        </span>
                    )}

                    <p className="lanada-footer-tagline">
                        THE ART OF EVERYDAY STYLE.
                    </p>

                </div>

                {/* ABOUT */}

                <section className="lanada-footer-about">
                    <h2>ABOUT LANADA</h2>

                    <p>
                        LANADA is more than a fashion destination.
                        It is a reflection of individuality, confidence
                        and personal expression. We believe great style
                        is timeless, effortless and uniquely yours.
                        Discover a collection made for the way you live.
                    </p>

                    <Link
                        to="/about"
                        className="lanada-footer-about-link"
                    >
                        DISCOVER OUR STORY
                        <span aria-hidden="true"> →</span>
                    </Link>
                </section>

                {/* NEWSLETTER */}

                <section className="lanada-footer-newsletter">

                    <h3>STAY IN TOUCH.</h3>

                    <p>
                        Receive the latest collections, new arrivals
                        and exclusive updates directly in your inbox.
                    </p>

                    <form
                        className="lanada-footer-email-form"
                        onSubmit={handleNewsletter}
                        noValidate
                    >

                        <div className="lanada-footer-email-input">

                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect
                                    x="3"
                                    y="5"
                                    width="18"
                                    height="14"
                                    rx="2"
                                />

                                <path d="m4 7 8 6 8-6" />
                            </svg>

                            <input
                                type="email"
                                name="newsletterEmail"
                                placeholder="Enter your email address"
                                aria-label="Enter your email address"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value);
                                    setMessage('');
                                    setMessageType('');
                                }}
                                required
                                disabled={loading}
                            />

                        </div>

                        <button
                            type="submit"
                            className="lanada-footer-email-submit"
                            disabled={loading}
                            aria-label="Subscribe"
                        >
                            {loading ? (
                                <span className="lanada-footer-spinner"></span>
                            ) : (
                                <svg
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M5 12h14" />
                                    <path d="m13 5 7 7-7 7" />
                                </svg>
                            )}
                        </button>

                    </form>

                    {message && (
                        <p
                            className={`lanada-footer-message ${messageType}`}
                            role="status"
                            aria-live="polite"
                        >
                            {message}
                        </p>
                    )}

                    <span className="lanada-footer-note">
                        NO SPAM. JUST WHAT YOU LOVE.
                    </span>

                </section>

                {/* FOOTER NAVIGATION */}

                <nav
                    className="lanada-footer-navigation"
                    aria-label="Footer navigation"
                >
                    <Link to="/shop">SHOP</Link>

                    <Link to="/about">ABOUT</Link>

                    <Link to="/orders">MY ORDERS</Link>

                    <Link to="/privacy">PRIVACY POLICY</Link>

                    <Link to="/terms">TERMS & CONDITIONS</Link>
                </nav>

                {/* CONTACT */}

                {contactEmail && (
                    <a
                        className="lanada-footer-contact"
                        href={`mailto:${contactEmail}`}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <rect
                                x="3"
                                y="5"
                                width="18"
                                height="14"
                                rx="2"
                            />

                            <path d="m4 7 8 6 8-6" />
                        </svg>

                        CONTACT LANADA
                    </a>
                )}

                {/* COPYRIGHT */}

                <div className="lanada-footer-bottom">

                    <p>
                        © {year} LANADA. ALL RIGHTS RESERVED.
                    </p>

                    <p>
                        MADE FOR YOUR STYLE.
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;
