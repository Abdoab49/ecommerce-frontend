import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LegalPages.css";

const LegalLayout = ({
    title,
    eyebrow = "LANADA",
    subtitle,
    updated,
    children,
}) => {
    const navigate = useNavigate();

    return (
        <main className="lanada-legal-page">

            {/* HERO */}
            <header className="lanada-legal-hero">

                {/* TOP BAR */}
                <div className="lanada-legal-topbar">

                    <Link
                        to="/"
                        className="lanada-legal-brand"
                        aria-label="LANADA Home"
                    >
                        <img
                            src="/logo192.png"
                            alt="LANADA"
                            className="lanada-legal-logo"
                        />
                    </Link>

                    <button
                        type="button"
                        className="lanada-legal-back"
                        onClick={() => navigate(-1)}
                    >
                        <span aria-hidden="true">←</span>
                        BACK
                    </button>

                </div>

                {/* HERO CONTENT */}
                <div className="lanada-legal-hero-content">

                    <p className="lanada-legal-eyebrow">
                        {eyebrow}
                    </p>

                    <h1>{title}</h1>

                    {subtitle && (
                        <p className="lanada-legal-subtitle">
                            {subtitle}
                        </p>
                    )}

                </div>

                {/* HERO BOTTOM */}
                <div className="lanada-legal-hero-bottom">
                    <span>LANADA OFFICIAL</span>

                    {updated && (
                        <span className="lanada-legal-updated">
                            LAST UPDATED: {updated}
                        </span>
                    )}
                </div>

            </header>

            {/* MAIN CONTENT */}
            <div className="lanada-legal-container">

                {/* BREADCRUMB */}
                <div className="lanada-legal-breadcrumb">
                    <Link to="/">HOME</Link>
                    <span>/</span>
                    <span>{title}</span>
                </div>

                {/* PAGE CONTENT */}
                <article className="lanada-legal-content">
                    {children}
                </article>

                {/* BOTTOM NAVIGATION */}
                <nav
                    className="lanada-legal-bottom-nav"
                    aria-label="Legal navigation"
                >
                    <Link to="/about">ABOUT</Link>
                    <Link to="/privacy">PRIVACY POLICY</Link>
                    <Link to="/terms">TERMS & CONDITIONS</Link>
                </nav>

                {/* COPYRIGHT */}
                <footer className="lanada-legal-copyright">
                    <span>© {new Date().getFullYear()} LANADA.</span>
                    <span>ALL RIGHTS RESERVED.</span>
                </footer>

            </div>

        </main>
    );
};

export default LegalLayout;