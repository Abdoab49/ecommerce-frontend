// src/pages/ShopCategory.jsx
import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import ShoeStoreItem from '../Components/ShoeStoreItem/ShoeStoreItem';
import { getProductPrice } from '../Data/prices';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortOption, setSortOption] = useState('default');

    let filteredProducts = all_product.filter(
        item => item.category === props.category
    );

    // ✅ تطبيق الأسعار من ملف واحد
    filteredProducts = filteredProducts.map(item => {
        const price = getProductPrice(item.name);
        return {
            ...item,
            new_price: price.new_price,
            old_price: price.old_price
        };
    });

    // ✅ الترتيب حسب الخيار المختار
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc':
                return a.new_price - b.new_price;
            case 'price-desc':
                return b.new_price - a.new_price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-{sortedProducts.length}</span> out of {sortedProducts.length} products
                </p>
                <div className="shopcategory-sort">
                    <label htmlFor="sort-select">Sort by</label>
                    <select
                        id="sort-select"
                        className="sort-select"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A → Z</option>
                        <option value="name-desc">Name: Z → A</option>
                    </select>
                </div>
            </div>
            <div className="shopcategory-products">
                {sortedProducts.map((item) => (
                    <ShoeStoreItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopCategory;