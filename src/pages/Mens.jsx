
import React, { useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import {
    Check,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

import ShoeStore from '../Components/ShoeStore';
import ShoesCard from '../Components/ShoesCard';

import './CSS/Mens.css';

const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
];

const Mens = () => {
    const [sortOption, setSortOption] = useState('default');

    return (
        <div className="mens-page">

            {/* MEN BANNER */}
            <div className="mens-header">
                <div className="mens-banner">
                    <img
                        src="/Assets/ShoeStore/background6.png"
                        alt="Men Collection"
                        className="banner-img"
                    />
                </div>
            </div>

            {/* PRODUCTS CONTENT */}
            <div className="mens-content">

                {/* NEW SORT BAR */}
                <div className="mens-sort-bar">

                    <div className="mens-results-label">
                        <span className="mens-results-indicator"></span>

                        <span className="mens-results-text">
                            SHOWING PRODUCTS
                        </span>
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
                                aria-label="Sort products"
                            >
                                <SelectPrimitive.Value placeholder="Default" />

                                <SelectPrimitive.Icon className="mens-select-trigger-icon">
                                    <ChevronDown size={17} strokeWidth={2} />
                                </SelectPrimitive.Icon>
                            </SelectPrimitive.Trigger>

                            <SelectPrimitive.Portal>
                                <SelectPrimitive.Content
                                    className="mens-select-content"
                                    position="popper"
                                    side="bottom"
                                    align="end"
                                    sideOffset={8}
                                    collisionPadding={12}
                                >
                                    <SelectPrimitive.ScrollUpButton className="mens-select-scroll">
                                        <ChevronUp size={16} />
                                    </SelectPrimitive.ScrollUpButton>

                                    <SelectPrimitive.Viewport className="mens-select-viewport">

                                        <div className="mens-select-heading">
                                            SORT PRODUCTS
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
                                                                size={16}
                                                                strokeWidth={2.5}
                                                            />
                                                        </SelectPrimitive.ItemIndicator>
                                                    </span>
                                                </SelectPrimitive.Item>
                                            ))}
                                        </SelectPrimitive.Group>

                                    </SelectPrimitive.Viewport>

                                    <SelectPrimitive.ScrollDownButton className="mens-select-scroll">
                                        <ChevronDown size={16} />
                                    </SelectPrimitive.ScrollDownButton>

                                </SelectPrimitive.Content>
                            </SelectPrimitive.Portal>
                        </SelectPrimitive.Root>

                    </div>
                </div>

                {/* BOTH COMPONENTS USE THE SAME SORT OPTION */}
                <ShoeStore sortOption={sortOption} />

                <ShoesCard sortOption={sortOption} />

            </div>
        </div>
    );
};

export default Mens;
