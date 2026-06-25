import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import ShoeStore from '../Components/ShoeStore';
import './Product.css';

const Product = () => {
  const navigate = useNavigate();
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product?.find((e) => e.id === Number(productId));

  // دالة للذهاب إلى صفحة المقاسات
  const goToSizeSelection = () => {
    navigate('/size-selection', { state: { product } });
  };

  if (!product) {
    return <h2>Loading product...</h2>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} onBuyNow={goToSizeSelection} />
      <DescriptionBox />
      <RelatedProducts />
      
      {/* إضافة ShoeStore تحت RelatedProducts */}
      <div className="shoestore-section">
        <h2 className="section-title">You May Also Like</h2>
        <ShoeStore />
      </div>
    </div>
  );
};

export default Product;