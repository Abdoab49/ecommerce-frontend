// src/pages/ShopCategory.jsx
import React, { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import ShoeStoreItem from '../Components/ShoeStoreItem/ShoeStoreItem';
import { getProductPrice } from '../Data/prices';  // ✅ استيراد

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);

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

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {filteredProducts.map((item) => (
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