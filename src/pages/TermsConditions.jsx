
import React from 'react';
import LegalLayout from '../Components/Legal/LegalLayout';

const TermsConditions = () => {
    return (
        <LegalLayout
            eyebrow="PLEASE READ BEFORE ORDERING"
            title="Terms & Conditions."
            subtitle="The terms that guide access to the LANADA website, shopping, orders and customer responsibilities."
        >

            <div className="legal-intro">
                <p>
                    By browsing or using the LANADA website,
                    you agree to use it responsibly and to review
                    the information presented before placing an order.
                    These terms describe the general conditions
                    for using the online store.
                </p>
            </div>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">01</span>
                    Website Use
                </h2>

                <p>
                    You agree to use the website only for lawful
                    purposes. You must not interfere with its
                    operation, attempt unauthorised access,
                    misuse its features or submit false information.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">02</span>
                    Customer Accounts
                </h2>

                <p>
                    When creating an account, you are responsible
                    for providing accurate information and keeping
                    your login credentials secure.
                </p>

                <p>
                    Please notify LANADA if you believe your account
                    has been accessed or used without your permission.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">03</span>
                    Products and Availability
                </h2>

                <p>
                    Product descriptions, images, colours, sizes
                    and other details are provided to help you
                    make an informed choice. Actual appearance
                    may vary slightly depending on screen settings
                    and product characteristics.
                </p>

                <p>
                    Products are subject to availability.
                    Displaying a product on the website does not
                    guarantee that it will remain available when
                    you place your order.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">04</span>
                    Prices and Promotions
                </h2>

                <p>
                    Prices on the website are displayed in
                    Moroccan dirhams (DH), unless stated otherwise.
                    Product prices and promotions may change.
                </p>

                <p>
                    Any applicable discount should be reviewed
                    in the order summary before completing checkout.
                    Promotions may be subject to specific conditions
                    displayed with the relevant offer.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">05</span>
                    Orders
                </h2>

                <p>
                    When placing an order, you are responsible
                    for checking the selected products, quantities,
                    sizes, contact information and delivery details.
                </p>

                <p>
                    Submitting an order request does not by itself
                    guarantee acceptance. LANADA may need to review
                    availability and order details before confirming it.
                    Any confirmation or cancellation will be communicated
                    through the available contact or order channels.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">06</span>
                    Payment
                </h2>

                <p>
                    Available payment methods and any payment
                    instructions are shown during checkout.
                    You are responsible for following the payment
                    instructions provided for your order.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">07</span>
                    Delivery
                </h2>

                <p>
                    Delivery options, applicable costs and estimated
                    delivery information should be displayed during
                    checkout or communicated when your order is confirmed.
                </p>

                <p>
                    Delivery estimates are not guaranteed unless
                    expressly stated. Please provide a correct
                    address and an active phone number to help
                    facilitate delivery.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">08</span>
                    Returns and Exchanges
                </h2>

                <p>
                    Return and exchange requests are handled according
                    to the return policy communicated by LANADA and
                    any applicable consumer protection requirements.
                </p>

                <p>
                    Before ordering, review the current return
                    conditions, eligibility requirements, time limits
                    and any applicable costs communicated by the store.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">09</span>
                    Intellectual Property
                </h2>

                <p>
                    Website content, including text, graphics,
                    design elements, logos and photographs, may
                    be protected by intellectual property laws.
                    You may not reproduce, distribute or use
                    protected content commercially without
                    appropriate permission.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">10</span>
                    Limitation and Changes
                </h2>

                <p>
                    LANADA aims to keep website information
                    accurate and available, but temporary
                    interruptions, technical issues or errors
                    may occur.
                </p>

                <p>
                    These terms may be updated when the website
                    or its services change. The latest version
                    will be published on this page.
                </p>
            </section>

            <div className="legal-updated">
                LAST REVIEW: {new Date().toLocaleDateString('en-GB')}
            </div>

        </LegalLayout>
    );
};

export default TermsConditions;
