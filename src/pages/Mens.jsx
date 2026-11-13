
import React, { useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

import {
    Check,
    ChevronDown,
    ChevronUp,
    ArrowRight,
} from "lucide-react";

import ShoeStore from "../Components/ShoeStore";
import ShoesCard from "../Components/ShoesCard";

import "./CSS/Mens.css";

const sortOptions = [
    { value: "default", label: "Featured" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
];

const Mens = () => {
    const [sortOption, setSortOption] = useState("default");

    return (
        <main className="mens-page">

            {/* =================================
                MEN EDITORIAL HERO
            ================================= */}

            <section className="mens-hero">

                <div className="mens-hero-image">
                    <img
                        src="/Assets/ShoeStore/background6.png"
                        alt="LANADA men's fashion collection"
                        className="mens-hero-img"
                    />
                </div>

                <div className="mens-hero-overlay" />

                <div className="mens-hero-content">

                    <div className="mens-hero-copy">

                        <div className="mens-hero-eyebrow">
                            <span />
                            LANADA / MEN'S COLLECTION
                        </div>

                        <h1>
                            THE MEN'S
                            <br />
                            <em>EDIT.</em>
                        </h1>

                        <p className="mens-hero-description">
                            A collection built around everyday style.
                            Discover selected pieces made to stand out.
                        </p>

                        <a
                            href="#mens-products"
                            className="mens-hero-button"
                        >
                            EXPLORE COLLECTION
                            <ArrowRight size={17} />
                        </a>

                    </div>

                    <div className="mens-hero-side">
                        <span className="mens-hero-side-number">01</span>
                        <span className="mens-hero-side-line" />
                        <span className="mens-hero-side-label">
                            THE NEW STANDARD
                        </span>
                    </div>

                </div>

                <div className="mens-hero-bottom">

                    <span>DESIGNED FOR EVERYDAY</span>

                    <span className="mens-hero-bottom-center">
                        MEN / COLLECTION
                    </span>

                    <a href="#mens-products">
                        DISCOVER MORE ↓
                    </a>

                </div>

            </section>


            {/* =================================
                PRODUCTS AREA
            ================================= */}

            <section
                className="mens-content"
                id="mens-products"
                aria-label="Men's products"
            >

                {/* COLLECTION HEADING */}

                <div className="mens-section-heading">

                    <div>
                        <span className="mens-section-eyebrow">
                            THE LANADA SELECTION
                        </span>

                        <h2>
                            MEN'S <span>COLLECTION</span>
                        </h2>
                    </div>

                    <p>
                        Find your style.
                        <br />
                        Make it your own.
                    </p>

                </div>


                {/* =================================
                    SORT BAR
                ================================= */}

                <div className="mens-toolbar">

                    <div className="mens-results-label">

                        <span className="mens-results-indicator" />

                        <div>
                            <span className="mens-results-text">
                                EXPLORE THE COLLECTION
                            </span>

                            <span className="mens-results-subtext">
                                MEN / ALL PRODUCTS
                            </span>
                        </div>

                    </div>


                    <div className="mens-sort-control">

                        <label
                            className="mens-sort-label"
                            id="mens-sort-label"
                        >
                            SORT BY
                        </label>

                        <SelectPrimitive.Root
                            value={sortOption}
                            onValueChange={setSortOption}
                        >

                            <SelectPrimitive.Trigger
                                className="mens-select-trigger"
                                aria-labelledby="mens-sort-label"
                                aria-label="Sort men's products"
                            >
                                <SelectPrimitive.Value placeholder="Featured" />

                                <SelectPrimitive.Icon>
                                    <ChevronDown
                                        size={16}
                                        strokeWidth={1.8}
                                    />
                                </SelectPrimitive.Icon>

                            </SelectPrimitive.Trigger>


                            <SelectPrimitive.Portal>

                                <SelectPrimitive.Content
                                    className="mens-select-content"
                                    position="popper"
                                    side="bottom"
                                    align="end"
                                    sideOffset={9}
                                    collisionPadding={12}
                                >

                                    <SelectPrimitive.ScrollUpButton className="mens-select-scroll">
                                        <ChevronUp size={15} />
                                    </SelectPrimitive.ScrollUpButton>


                                    <SelectPrimitive.Viewport className="mens-select-viewport">

                                        <div className="mens-select-heading">
                                            ORDER YOUR PRODUCTS
                                        </div>

                                        <SelectPrimitive.Group>

                                            {sortOptions.map((option) => (
                                                <SelectPrimitive.Item
                                                    key={option.value}
                                                    value={option.value}
                                                    className="mens-select-item"
                                                >

                                                    <SelectPrimitive.ItemText>
                                                        {option.label}
                                                    </SelectPrimitive.ItemText>

                                                    <span className="mens-select-item-check">
                                                        <SelectPrimitive.ItemIndicator>
                                                            <Check
                                                                size={15}
                                                                strokeWidth={2}
                                                            />
                                                        </SelectPrimitive.ItemIndicator>
                                                    </span>

                                                </SelectPrimitive.Item>
                                            ))}

                                        </SelectPrimitive.Group>

                                    </SelectPrimitive.Viewport>


                                    <SelectPrimitive.ScrollDownButton className="mens-select-scroll">
                                        <ChevronDown size={15} />
                                    </SelectPrimitive.ScrollDownButton>

                                </SelectPrimitive.Content>

                            </SelectPrimitive.Portal>

                        </SelectPrimitive.Root>

                    </div>

                </div>


                {/* =================================
                    PRODUCT COMPONENTS
                ================================= */}

                <div className="mens-product-groups">

                    <ShoeStore sortOption={sortOption} />

                    <ShoesCard sortOption={sortOption} />

                </div>

            </section>


            {/* =================================
                BOTTOM BRAND STATEMENT
            ================================= */}

            <section className="mens-brand-statement">

                <span className="mens-brand-overline">
                    LANADA / EST. FOR EVERYDAY
                </span>

                <h2>
                    OWN YOUR <em>STYLE.</em>
                </h2>

                <a href="/shop">
                    DISCOVER MORE
                    <ArrowRight size={16} />
                </a>

            </section>

        </main>
    );
};

export default Mens;
