
import React from 'react';
import LegalLayout from '../Components/Legal/LegalLayout';

const About = () => {
    return (
        <LegalLayout
            eyebrow="OUR STORY · OUR IDENTITY"
            title="About LANADA."
            subtitle="A modern destination for everyday style, confidence and personal expression."
        >

            <div className="legal-intro">
                <p>
                    LANADA is more than a fashion destination.
                    It is a space dedicated to personal style,
                    modern essentials and the confidence that
                    comes from wearing what feels right to you.
                    We believe fashion should be expressive,
                    accessible and effortless.
                </p>
            </div>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">01</span>
                    Our Story
                </h2>

                <p>
                    LANADA was built around a simple idea:
                    everyday fashion deserves attention to detail.
                    From the first look to the finishing touch,
                    we want every part of the shopping experience
                    to feel clear, considered and enjoyable.
                </p>

                <p>
                    Our approach brings together contemporary
                    influences, familiar styles and selected pieces
                    for people who see clothing as a way to express
                    who they are.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">02</span>
                    What We Believe
                </h2>

                <p>
                    We believe good style is personal. It does not
                    need to be complicated, and it should never
                    take away from individuality.
                </p>

                <ul>
                    <li>
                        <strong>Individuality:</strong> Your style
                        should reflect you.
                    </li>
                    <li>
                        <strong>Simplicity:</strong> Shopping should
                        be easy to understand and navigate.
                    </li>
                    <li>
                        <strong>Care:</strong> Product presentation
                        and customer experience matter.
                    </li>
                    <li>
                        <strong>Confidence:</strong> The right
                        everyday pieces can help you feel your best.
                    </li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">03</span>
                    Our Collections
                </h2>

                <p>
                    Explore a variety of styles across clothing,
                    footwear, headwear and selected collections.
                    Our product range is presented to help you
                    discover pieces that match your preferences
                    and everyday needs.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">04</span>
                    The LANADA Experience
                </h2>

                <p>
                    We aim to make browsing, choosing products
                    and placing orders as straightforward as possible.
                    Product details, available sizes, prices and
                    delivery information should be reviewed before
                    completing an order.
                </p>

                <p>
                    Thank you for being part of LANADA.
                    Your style, your choice.
                </p>
            </section>

            <div className="legal-updated">
                LANADA · THE ART OF EVERYDAY STYLE
            </div>

        </LegalLayout>
    );
};

export default About;
