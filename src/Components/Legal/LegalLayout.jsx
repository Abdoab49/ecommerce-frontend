
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LegalPages.css';

const LegalLayout = ({
    eyebrow,
    title,
    subtitle,
    children
}) => {
    const navigate = useNavigate();

    return (
        <main className="lanada-legal-page">

            {/* HERO */}
            <header className="lanada-legal-hero">
                <div className="lanada-legal-topbar">
                    <Link to="/" className="lanada-legal-brand">
                        LANADA<span>.</span>
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

                <div className="lanada-legal-hero-content">
                    <span className="lanada-legal-eyebrow">
                        {eyebrow}
                    </span>

                    <h1>{title}</h1>

                    <p>{subtitle}</p>
                </div>

                <div className="lanada-legal-hero-bottom">
                    <span>LANADA — THE ART OF EVERYDAY STYLE</span>
                    <span>OFFICIAL INFORMATION</span>
                </div>
            </header>

            {/* CONTENT */}
            <div className="lanada-legal-container">

                <div className="lanada-legal-breadcrumb">
                    <Link to="/">HOME</Link>
                    <span>/</span>
                    <span>{title.toUpperCase()}</span>
                </div>

                <article className="lanada-legal-content">
                    {children}
                </article>

                {/* BOTTOM NAVIGATION */}
                <div className="lanada-legal-bottom-nav">
                    <Link to="/about">ABOUT LANADA</Link>
                    <Link to="/privacy">PRIVACY POLICY</Link>
                    <Link to="/terms">TERMS & CONDITIONS</Link>
                </div>

                <div className="lanada-legal-copyright">
                    <span>© {new Date().getFullYear()} LANADA.</span>
                    <span>ALL RIGHTS RESERVED.</span>
                </div>

            </div>
        </main>
    );
};

export default LegalLayout;
