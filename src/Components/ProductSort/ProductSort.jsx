
import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

import {
    Check,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

import './ProductSort.css';

const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
];

const ProductSort = ({
    value,
    onChange,
    className = ''
}) => {
    return (
        <div className={`product-sort-bar ${className}`}>

            <div className="product-results-label">
                <span className="product-results-indicator"></span>
                <span className="product-results-text">
                    SHOWING PRODUCTS
                </span>
            </div>

            <div className="product-sort-control">

                <label className="product-sort-label">
                    SORT BY
                </label>

                <SelectPrimitive.Root
                    value={value}
                    onValueChange={onChange}
                >
                    <SelectPrimitive.Trigger
                        className="product-select-trigger"
                        aria-label="Sort products"
                    >
                        <SelectPrimitive.Value placeholder="Default" />

                        <SelectPrimitive.Icon className="product-select-trigger-icon">
                            <ChevronDown size={17} strokeWidth={2} />
                        </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>

                    <SelectPrimitive.Portal>
                        <SelectPrimitive.Content
                            className="product-select-content"
                            position="popper"
                            side="bottom"
                            align="end"
                            sideOffset={8}
                            collisionPadding={12}
                        >
                            <SelectPrimitive.ScrollUpButton className="product-select-scroll">
                                <ChevronUp size={16} />
                            </SelectPrimitive.ScrollUpButton>

                            <SelectPrimitive.Viewport className="product-select-viewport">

                                <div className="product-select-heading">
                                    SORT PRODUCTS
                                </div>

                                <SelectPrimitive.Group>
                                    {sortOptions.map((option) => (
                                        <SelectPrimitive.Item
                                            key={option.value}
                                            value={option.value}
                                            className="product-select-item"
                                        >
                                            <SelectPrimitive.ItemText>
                                                {option.label}
                                            </SelectPrimitive.ItemText>

                                            <span className="product-select-item-check">
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

                            <SelectPrimitive.ScrollDownButton className="product-select-scroll">
                                <ChevronDown size={16} />
                            </SelectPrimitive.ScrollDownButton>

                        </SelectPrimitive.Content>
                    </SelectPrimitive.Portal>
                </SelectPrimitive.Root>

            </div>
        </div>
    );
};

export default ProductSort;
