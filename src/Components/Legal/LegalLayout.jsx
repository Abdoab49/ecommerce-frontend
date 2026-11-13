import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./LegalPages.css";

/**
 * @typedef {Object} LegalLayoutProps
 * @property {string} title - Main page title.
 * @property {string} [eyebrow] - Small label displayed above the title.
 * @property {string} [subtitle] - Short introduction below the title.
 * @property {string} [updated] - Last updated date.
 * @property {React.ReactNode} children - Legal page content.
 */

/**
 * Shared layout for LANADA information and legal pages.
 *
 * @param {LegalLayoutProps} props
 * @returns {React.ReactElement}
 */
function LegalLayout({
    title,
    eyebrow = "LANADA / INFORMATION",
    subtitle = "Everything you need to know about LANADA.",
    updated,
    children,
}) {
    const location = useLocation();

    const navigationLinks = [
        { label: "About", path: "/about" },
        { label: "Privacy", path: "/privacy" },
        { label: "Terms", path: "/terms" },
    ];

    return (
        <main className="lanada-legal-page">
            {/* Header */}
            <header className="legal-header">
                <div className="legal-header-inner">
                    <Link
                        to="/"
                        className="legal-brand"
                        aria-label="LANADA homepage"
                    >
                        <img
                            src="/logo192.png"
                            alt="LANADA"
                            className="legal-brand-logo"
                        />
                    </Link>

                    <nav
                        className="legal-header-nav"
                        aria-label="Main navigation"
                    >
                        <Link to="/shop">Shop</Link>
                        <Link to="/orders">My orders</Link>
                    </nav>

                    <Link to="/shop" className="legal-shop-link">
                        Explore collection
                        <span aria-hidden="true">↗</span>
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="legal-hero">
                <div className="legal-hero-inner">
                    <div className="legal-hero-copy">
                        <div className="legal-eyebrow">
                            <span className="legal-eyebrow-line" />
                            {eyebrow}
                        </div>

                        <h1>{title}</h1>

                        {subtitle && (
                            <p className="legal-hero-subtitle">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    <div className="legal-hero-aside">
                        <span className="legal-hero-aside-index">
                            LANADA
                        </span>

                        <div className="legal-hero-aside-rule" />

                        <p>
                            A clear approach to the way we work,
                            communicate, and serve our customers.
                        </p>

                        <span className="legal-hero-aside-bottom">
                            INFORMATION & POLICIES
                        </span>
                    </div>

                    <div className="legal-hero-bottom">
                        <span>INFORMATION CENTRE</span>
                        <span>CASUAL · CONTEMPORARY · LANADA</span>
                    </div>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="legal-breadcrumb-wrap">
                <div className="legal-breadcrumb">
                    <Link to="/">Home</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{title}</span>
                </div>
            </div>

            {/* Main content */}
            <section className="legal-main">
                <aside className="legal-sidebar">
                    <div className="legal-sidebar-sticky">
                        <span className="legal-sidebar-label">
                            INFORMATION
                        </span>

                        <h2>
                            The details
                            <br />
                            matter.
                        </h2>

                        <p className="legal-sidebar-description">
                            Find the information you need about
                            our brand, policies, and terms.
                        </p>

                        <div className="legal-sidebar-divider" />

                        <span className="legal-sidebar-nav-title">
                            EXPLORE
                        </span>

                        <nav
                            className="legal-sidebar-nav"
                            aria-label="Information pages"
                        >
                            {navigationLinks.map((item, index) => {
                                const isActive =
                                    location.pathname === item.path;

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={
                                            isActive
                                                ? "legal-sidebar-link active"
                                                : "legal-sidebar-link"
                                        }
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                    >
                                        <span className="legal-sidebar-link-number">
                                            0{index + 1}
                                        </span>

                                        <span>{item.label}</span>

                                        <span
                                            className="legal-sidebar-link-arrow"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {updated && (
                            <div className="legal-sidebar-updated">
                                <span>LAST UPDATED</span>
                                <strong>{updated}</strong>
                            </div>
                        )}
                    </div>
                </aside>

                <article className="legal-article">
                    <div className="legal-article-top">
                        <span>LANADA / {title.toUpperCase()}</span>
                        <span>OFFICIAL INFORMATION</span>
                    </div>

                    <div className="legal-article-content">
                        {children}
                    </div>

                    <div className="legal-article-bottom">
                        <span>THANK YOU FOR CHOOSING LANADA</span>
                        <Link to="/shop">
                            BACK TO SHOP <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                </article>
            </section>

            {/* Footer */}
            <footer className="legal-footer">
                <div className="legal-footer-main">
                    <Link
                        to="/"
                        className="legal-footer-brand"
                        aria-label="LANADA homepage"
                    >
                        <img src="/logo192.png" alt="LANADA" />
                    </Link>

                    <p>
                        Designed to be clear.
                        <br />
                        Made for the LANADA community.
                    </p>

                    <nav
                        className="legal-footer-links"
                        aria-label="Legal links"
                    >
                        <Link to="/about">About</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms & Conditions</Link>
                    </nav>
                </div>

                <div className="legal-footer-bottom">
                    <span>
                        © {new Date().getFullYear()} LANADA. ALL RIGHTS RESERVED.
                    </span>

                    <Link to="/shop">CONTINUE SHOPPING ↗</Link>
                </div>
            </footer>
        </main>
    );
}

export default LegalLayout;