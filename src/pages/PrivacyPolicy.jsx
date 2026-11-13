
import React from 'react';
import LegalLayout from '../Components/Legal/LegalLayout';

const PrivacyPolicy = () => {
    return (
        <LegalLayout
            eyebrow="YOUR PRIVACY MATTERS"
            title="Privacy Policy."
            subtitle="How information may be collected, used and protected when you visit or shop with LANADA."
        >

            <div className="legal-intro">
                <p>
                    This Privacy Policy explains how LANADA may
                    handle information connected to your use of
                    the website, your account and your orders.
                    Please review it carefully before using the site.
                </p>
            </div>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">01</span>
                    Information We May Collect
                </h2>

                <p>
                    Depending on the features you use, the information
                    collected may include:
                </p>

                <ul>
                    <li>
                        <strong>Account information:</strong> name,
                        email address and account details you provide.
                    </li>
                    <li>
                        <strong>Order information:</strong> products
                        purchased, selected sizes, order history and
                        order status.
                    </li>
                    <li>
                        <strong>Delivery information:</strong> phone
                        number, delivery address, city and other
                        details needed to fulfil an order.
                    </li>
                    <li>
                        <strong>Communications:</strong> messages or
                        requests you send to customer support.
                    </li>
                    <li>
                        <strong>Technical information:</strong>
                        information about your browser or device
                        that may be generated when using the website.
                    </li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">02</span>
                    How Information May Be Used
                </h2>

                <p>
                    Information may be used where necessary to:
                </p>

                <ul>
                    <li>Create and manage your customer account.</li>
                    <li>Process and manage your orders.</li>
                    <li>Arrange delivery and communicate order updates.</li>
                    <li>Respond to your questions and support requests.</li>
                    <li>Maintain website functionality and security.</li>
                    <li>Improve the shopping experience.</li>
                    <li>
                        Send promotional communications where you
                        have chosen to receive them and where permitted.
                    </li>
                </ul>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">03</span>
                    Browser Storage
                </h2>

                <p>
                    The website may use browser storage technologies,
                    such as local storage, to support features including
                    shopping cart contents, account-related interface
                    state and website functionality.
                </p>

                <p>
                    You can manage or clear browser storage through
                    your browser settings. Clearing it may affect
                    certain website features or saved information.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">04</span>
                    Sharing of Information
                </h2>

                <p>
                    Information may need to be processed by service
                    providers involved in operating the website,
                    managing orders, providing delivery services,
                    hosting systems or supporting payment and
                    authentication features, where those services
                    are used.
                </p>

                <p>
                    Information should only be shared where needed
                    for a legitimate website or order-related purpose,
                    or where disclosure is required by applicable law.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">05</span>
                    Data Security
                </h2>

                <p>
                    Reasonable measures should be used to protect
                    personal information against unauthorised access,
                    loss, misuse or alteration. However, no website
                    or electronic storage method can be guaranteed
                    to be completely secure.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">06</span>
                    Data Retention
                </h2>

                <p>
                    Information should be kept only for as long as
                    needed for the purposes described in this policy,
                    to manage customer relationships and orders,
                    or to meet applicable legal requirements.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">07</span>
                    Your Choices
                </h2>

                <p>
                    You may contact LANADA to ask about the personal
                    information associated with your account or to
                    request an update or deletion, subject to
                    applicable legal and operational requirements.
                </p>

                <p>
                    You can also choose not to provide optional
                    information. Some account, checkout or delivery
                    features may not work without information that
                    is necessary to provide those services.
                </p>
            </section>

            <section className="legal-section">
                <h2>
                    <span className="legal-section-number">08</span>
                    Changes to This Policy
                </h2>

                <p>
                    This policy may be updated when website features,
                    business practices or applicable requirements change.
                    The latest version should be published on this page.
                </p>
            </section>

            <div className="legal-updated">
                LAST REVIEW: {new Date().toLocaleDateString('en-GB')}
            </div>

        </LegalLayout>
    );
};

export default PrivacyPolicy;
