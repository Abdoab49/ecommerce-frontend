
import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    ShoppingBag,
} from 'lucide-react';

import gsap from 'gsap';

import { ShopContext } from '../Context/ShopContext';
import styles from './SizeSelection.module.css';
import ProductGrid from './ProductGrid';

/* =====================================================
   PRODUCT IMAGES
===================================================== */

const PRODUCT_IMAGES = {
    // MEN (1-8)
    1: [
        '/Assets/ShoeStore/tshirt1.png',
        '/Assets/ShoeStore/tshirt2.png',
        '/Assets/ShoeStore/tshirt3.png',
    ],
    2: [
        '/Assets/ShoeStore/tshirt2.png',
        '/Assets/ShoeStore/tshirt3.png',
        '/Assets/ShoeStore/tshirt4.png',
    ],
    3: [
        '/Assets/ShoeStore/tshirt3.png',
        '/Assets/ShoeStore/tshirt4.png',
        '/Assets/ShoeStore/tshirt5.png',
    ],
    4: [
        '/Assets/ShoeStore/tshirt4.png',
        '/Assets/ShoeStore/tshirt5.png',
        '/Assets/ShoeStore/tshirt6.png',
    ],
    5: [
        '/Assets/ShoeStore/tshirt5.png',
        '/Assets/ShoeStore/tshirt6.png',
        '/Assets/ShoeStore/tshirt7.png',
    ],
    6: [
        '/Assets/ShoeStore/tshirt6.png',
        '/Assets/ShoeStore/tshirt7.png',
        '/Assets/ShoeStore/tshirt8.png',
    ],
    7: [
        '/Assets/ShoeStore/tshirt7.png',
        '/Assets/ShoeStore/tshirt1.png',
        '/Assets/ShoeStore/tshirt2.png',
    ],
    8: [
        '/Assets/ShoeStore/tshirt8.png',
        '/Assets/ShoeStore/tshirt1.png',
        '/Assets/ShoeStore/tshirt2.png',
    ],

    // WOMEN (9, 10, 13-20)
    9: [
        '/Assets/tshirt/tshirt8.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    10: [
        '/Assets/tshirt/tshirt8.png',
        '/Assets/tshirt/tshirt2.png',
        '/Assets/tshirt/tshirt3.png',
    ],
    13: [
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
        '/Assets/tshirt/tshirt3.png',
    ],
    14: [
        '/Assets/tshirt/tshirt2.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt3.png',
    ],
    15: [
        '/Assets/tshirt/tshirt3.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    16: [
        '/Assets/tshirt/tshirt4.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    17: [
        '/Assets/tshirt/tshirt5.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    18: [
        '/Assets/tshirt/tshirt6.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    19: [
        '/Assets/tshirt/tshirt7.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    20: [
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
        '/Assets/tshirt/tshirt3.png',
    ],

    // KIDS (11, 12, 21-28)
    11: [
        '/Assets/tshirt/tshirt8.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    12: [
        '/Assets/tshirt/tshirt8.png',
        '/Assets/tshirt/tshirt2.png',
        '/Assets/tshirt/tshirt3.png',
    ],
    21: [
        '/Assets/tshirt/tshirt5.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    22: [
        '/Assets/tshirt/tshirt6.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    23: [
        '/Assets/tshirt/tshirt7.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    24: [
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
        '/Assets/tshirt/tshirt3.png',
    ],
    25: [
        '/Assets/tshirt/tshirt2.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt3.png',
    ],
    26: [
        '/Assets/tshirt/tshirt3.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    27: [
        '/Assets/tshirt/tshirt4.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],
    28: [
        '/Assets/tshirt/tshirt5.png',
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt2.png',
    ],

    // NEW FOOTBALL T-SHIRTS (45-52)
    45: [
        '/Assets/tshirt/tshirt1.png',
        '/Assets/tshirt/tshirt1_2.png',
        '/Assets/tshirt/tshirt1_3.png',
    ],
    46: [
        '/Assets/tshirt/tshirt2.png',
        '/Assets/tshirt/tshirt2_2.png',
        '/Assets/tshirt/tshirt2_3.png',
    ],
    47: [
        '/Assets/tshirt/tshirt3.png',
        '/Assets/tshirt/tshirt3_2.png',
        '/Assets/tshirt/tshirt3_3.png',
    ],
    48: [
        '/Assets/tshirt/tshirt4.png',
        '/Assets/tshirt/tshirt4_2.png',
        '/Assets/tshirt/tshirt4_3.png',
    ],
    49: [
        '/Assets/tshirt/tshirt5.png',
        '/Assets/tshirt/tshirt5_2.png',
        '/Assets/tshirt/tshirt5_3.png',
    ],
    50: [
        '/Assets/tshirt/tshirt6.png',
        '/Assets/tshirt/tshirt6_2.png',
        '/Assets/tshirt/tshirt6_3.png',
    ],
    51: [
        '/Assets/tshirt/tshirt7.png',
        '/Assets/tshirt/tshirt7_2.png',
        '/Assets/tshirt/tshirt7_3.png',
    ],
    52: [
        '/Assets/tshirt/tshirt8.png',
        '/Assets/tshirt/tshirt8_2.png',
        '/Assets/tshirt/tshirt8_3.png',
    ],
};

/* =====================================================
   RELATED PRODUCTS
===================================================== */

const RELATED_PRODUCTS = [
    {
        id: 2,
        name: 'T-shirt football',
        price: '150 DH',
        img: '/Assets/ShoeStore/tshirt2.png',
        company: 'YEEZY',
    },
    {
        id: 3,
        name: 'T-shirt basketball',
        price: '120 DH',
        img: '/Assets/ShoeStore/tshirt3.png',
        company: 'YEEZY',
    },
    {
        id: 4,
        name: 'T-shirt football',
        price: '120 DH',
        img: '/Assets/ShoeStore/tshirt4.png',
        company: 'YEEZY',
    },
    {
        id: 5,
        name: 'T-shirt football',
        price: '120 DH',
        img: '/Assets/ShoeStore/tshirt5.png',
        company: 'YEEZY',
    },
];

const DEFAULT_IMAGES = PRODUCT_IMAGES[1];
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL'];

/* =====================================================
   PRICE HELPERS
===================================================== */

/**
 * Convert a numeric or formatted price into a valid number.
 */
function parsePrice(value, fallback) {
    if (
        typeof value === 'number' &&
        Number.isFinite(value) &&
        value >= 0
    ) {
        return value;
    }

    if (typeof value === 'string') {
        const normalized = value
            .replace(/[^0-9.,]/g, '')
            .replace(',', '.');

        const parsed = Number.parseFloat(normalized);

        if (Number.isFinite(parsed) && parsed >= 0) {
            return parsed;
        }
    }

    return fallback;
}

/**
 * Normalize sizes so the UI always receives a non-empty array.
 */
function normalizeSizes(value) {
    const source = Array.isArray(value)
        ? value
        : typeof value === 'string'
            ? value.split(',')
            : DEFAULT_SIZES;

    const sizes = source
        .map((size) => String(size).trim())
        .filter(Boolean);

    return sizes.length
        ? [...new Set(sizes)]
        : DEFAULT_SIZES;
}

/**
 * Build a safe product model from route state.
 */
function buildProductData(product) {
    const id = product?.id ?? 1;

    const newPrice = parsePrice(
        product?.price ?? product?.new_price,
        120
    );

    const suppliedOldPrice = parsePrice(
        product?.old_price,
        0
    );

    const oldPrice = suppliedOldPrice > newPrice
        ? suppliedOldPrice
        : Math.round(newPrice * 1.5);

    const imagesFromProduct = Array.isArray(product?.images)
        ? product.images.filter(
            (image) =>
                typeof image === 'string' &&
                image.trim()
        )
        : [];

    const fallbackImages =
        PRODUCT_IMAGES[id] || DEFAULT_IMAGES;

    const images = imagesFromProduct.length
        ? imagesFromProduct
        : fallbackImages;

    const primaryImage =
        typeof product?.img === 'string' && product.img.trim()
            ? product.img
            : typeof product?.image === 'string' && product.image.trim()
                ? product.image
                : images[0];

    const uniqueImages = [
        ...new Set([primaryImage, ...images]),
    ];

    const discount =
        oldPrice > newPrice && oldPrice > 0
            ? Math.round(
                ((oldPrice - newPrice) / oldPrice) * 100
            )
            : 0;

    return {
        id,
        name: product?.name || 'NIKE T-SHIRT',
        brand: product?.company || product?.brand || 'LANADA',
        price: `${newPrice.toFixed(2)} DH`,
        originalPrice: `${oldPrice.toFixed(2)} DH`,
        discount,
        description:
            product?.description ||
            'Premium quality t-shirt with a modern fit. Designed for comfort and everyday style.',
        sizes: normalizeSizes(product?.sizes),
        category: product?.category || 'T-Shirts',
        new_price: newPrice,
        old_price: oldPrice,
        image: primaryImage,
        images: uniqueImages.length
            ? uniqueImages
            : DEFAULT_IMAGES,
    };
}

/* =====================================================
   SIZE SELECTION PAGE
===================================================== */

const SizeSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { addToCart } = useContext(ShopContext);

    const product = location.state?.product || null;

    const productData = useMemo(
        () => buildProductData(product),
        [product]
    );

    const [selectedSize, setSelectedSize] = useState('');
    const [isSizeRequired, setIsSizeRequired] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [cartError, setCartError] = useState('');

    const buttonRef = useRef(null);
    const animationRef = useRef(null);

    /* Reset selection when product changes */
    useEffect(() => {
        setCurrentImage(0);
        setSelectedSize('');
        setIsSizeRequired(false);
        setCartError('');
        setIsAnimating(false);
    }, [productData.id]);

    /* Kill GSAP animation when component unmounts */
    useEffect(() => {
        return () => {
            animationRef.current?.kill();
        };
    }, []);

    /* =================================================
       IMAGE NAVIGATION
    ================================================= */

    const goToImage = useCallback(
        (index) => {
            if (
                !Number.isInteger(index) ||
                index < 0 ||
                index >= productData.images.length
            ) {
                return;
            }

            setCurrentImage(index);
        },
        [productData.images.length]
    );

    const nextImage = useCallback(() => {
        setCurrentImage(
            (previous) =>
                (previous + 1) % productData.images.length
        );
    }, [productData.images.length]);

    const previousImage = useCallback(() => {
        setCurrentImage(
            (previous) =>
                (
                    previous -
                    1 +
                    productData.images.length
                ) % productData.images.length
        );
    }, [productData.images.length]);

    /* =================================================
       SIZE SELECTION
    ================================================= */

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setIsSizeRequired(false);
        setCartError('');
    };

    /* =================================================
       ADD TO CART
    ================================================= */

    const handleAddToCart = () => {
        if (!selectedSize) {
            setIsSizeRequired(true);
            setCartError(
                'Please select a size before adding this item to your bag.'
            );
            return;
        }

        if (isAnimating) return;

        if (typeof addToCart !== 'function') {
            setCartError(
                'Cart is currently unavailable. Please refresh and try again.'
            );
            return;
        }

        try {
            /*
             * Keep the existing ShopContext call signature.
             */
            addToCart(
                productData.id,
                selectedSize,
                productData
            );
        } catch (error) {
            console.error(
                'Unable to add product to cart:',
                error
            );

            setCartError(
                'We could not add this product. Please try again.'
            );

            return;
        }

        setCartError('');
        setIsAnimating(true);

        const button = buttonRef.current;

        if (!button) {
            setIsAnimating(false);
            navigate('/cart');
            return;
        }

        const shirt = button.querySelector(
            `.${styles.shirt}`
        );

        const cartIcon = button.querySelector(
            `.${styles.cart}`
        );

        const label = button.querySelector(
            `.${styles.buttonLabel}`
        );

        animationRef.current?.kill();

        animationRef.current = gsap.timeline({
            onComplete: () => navigate('/cart'),
        });

        animationRef.current
            .to(button, {
                scale: 0.975,
                duration: 0.12,
                ease: 'power2.out',
            })
            .to(button, {
                scale: 1,
                duration: 0.2,
                ease: 'back.out(2)',
            })
            .to(
                label,
                {
                    opacity: 0,
                    y: -7,
                    duration: 0.16,
                },
                '<'
            )
            .fromTo(
                shirt,
                {
                    opacity: 0,
                    y: 18,
                    scale: 0.65,
                    rotation: -12,
                },
                {
                    opacity: 1,
                    y: -15,
                    scale: 1,
                    rotation: 0,
                    duration: 0.32,
                    ease: 'back.out(1.7)',
                }
            )
            .to(shirt, {
                y: 16,
                opacity: 0,
                scale: 0.65,
                duration: 0.22,
                ease: 'power2.in',
            })
            .fromTo(
                cartIcon,
                {
                    opacity: 0,
                    x: -15,
                    scale: 0.75,
                },
                {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'back.out(1.8)',
                }
            )
            .to(button, {
                duration: 0.25,
            });
    };

    /* =================================================
       RELATED PRODUCTS
    ================================================= */

    const handleRelatedProduct = (relatedProduct) => {
        navigate('/size-selection', {
            state: {
                product: relatedProduct,
            },
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    /* =================================================
       RENDER
    ================================================= */

    return (
        <main className={styles.container}>

            {/* BREADCRUMB */}
            <nav
                className={styles.breadcrumb}
                aria-label="Breadcrumb"
            >
                <Link to="/">HOME</Link>

                <span aria-hidden="true">/</span>

                <Link to="/shop">SHOP</Link>

                <span aria-hidden="true">/</span>

                <span aria-current="page">
                    {productData.name}
                </span>
            </nav>

            {/* PRODUCT DETAILS */}
            <section
                className={styles.productWrapper}
                aria-label="Product details"
            >

                {/* IMAGE SECTION */}
                <div className={styles.imageSection}>

                    <div className={styles.imageFrame}>

                        <span className={styles.imageTag}>
                            LANADA / EDITION
                        </span>

                        <img
                            src={productData.images[currentImage]}
                            alt={`${productData.name} view ${currentImage + 1}`}
                            className={styles.productImage}
                            onError={(event) => {
                                if (
                                    event.currentTarget.dataset.fallbackApplied !== 'true'
                                ) {
                                    event.currentTarget.dataset.fallbackApplied = 'true';
                                    event.currentTarget.src = '/logo192.png';
                                }
                            }}
                        />

                        {productData.images.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className={styles.prevBtn}
                                    onClick={previousImage}
                                    aria-label="Previous product image"
                                >
                                    <ChevronLeft size={21} />
                                </button>

                                <button
                                    type="button"
                                    className={styles.nextBtn}
                                    onClick={nextImage}
                                    aria-label="Next product image"
                                >
                                    <ChevronRight size={21} />
                                </button>

                                <div
                                    className={styles.imageCounter}
                                    aria-live="polite"
                                >
                                    {String(currentImage + 1).padStart(2, '0')}
                                    {' / '}
                                    {String(productData.images.length).padStart(2, '0')}
                                </div>
                            </>
                        )}

                    </div>

                    {/* THUMBNAILS */}
                    <div
                        className={styles.thumbnails}
                        aria-label="Product image thumbnails"
                    >
                        {productData.images.slice(0, 6).map(
                            (image, index) => (
                                <button
                                    key={`${image}-${index}`}
                                    type="button"
                                    className={`${styles.thumbnail} ${
                                        currentImage === index
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() => goToImage(index)}
                                    aria-label={`View product image ${index + 1}`}
                                    aria-pressed={currentImage === index}
                                >
                                    <img src={image} alt="" />
                                </button>
                            )
                        )}
                    </div>

                </div>

                {/* PRODUCT INFORMATION */}
                <div className={styles.infoSection}>

                    <div className={styles.productOverline}>
                        <span className={styles.brand}>
                            {productData.brand}
                        </span>

                        <span className={styles.productReference}>
                            REF. {productData.id}
                        </span>
                    </div>

                    <h1 className={styles.title}>
                        {productData.name}
                    </h1>

                    <p className={styles.subtitle}>
                        {productData.category} / Premium collection
                    </p>

                    <p className={styles.description}>
                        {productData.description}
                    </p>

                    {/* PRICE */}
                    <div className={styles.priceBlock}>
                        <div className={styles.priceRow}>

                            <span className={styles.currentPrice}>
                                {productData.price}
                            </span>

                            {productData.discount > 0 && (
                                <>
                                    <span className={styles.originalPrice}>
                                        {productData.originalPrice}
                                    </span>

                                    <span className={styles.discount}>
                                        -{productData.discount}%
                                    </span>
                                </>
                            )}

                        </div>

                        <p className={styles.taxInfo}>
                            Price includes applicable taxes.
                        </p>
                    </div>

                    {/* SIZE SELECTOR */}
                    <div className={styles.sizeSection}>

                        <div className={styles.sizeHeading}>
                            <span className={styles.sizeLabel}>
                                SELECT YOUR SIZE
                            </span>

                            <span className={styles.sizeGuide}>
                                SIZE / FIT
                            </span>
                        </div>

                        <div className={styles.sizeOptions}>
                            {productData.sizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`${styles.sizeBtn} ${
                                        selectedSize === size
                                            ? styles.active
                                            : ''
                                    }`}
                                    onClick={() => handleSizeSelect(size)}
                                    aria-pressed={selectedSize === size}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        {isSizeRequired && (
                            <p
                                className={styles.errorMsg}
                                role="alert"
                            >
                                Please select a size before continuing.
                            </p>
                        )}

                    </div>

                    {/* ADD TO BAG */}
                    <div className={styles.purchaseSection}>

                        <button
                            ref={buttonRef}
                            type="button"
                            className={`${styles.addToCart} ${
                                isAnimating ? styles.adding : ''
                            }`}
                            onClick={handleAddToCart}
                            disabled={isAnimating}
                        >
                            <span className={styles.buttonLabel}>
                                {isAnimating
                                    ? 'ADDING TO BAG'
                                    : 'ADD TO BAG'}
                            </span>

                            <span
                                className={styles.shirt}
                                aria-hidden="true"
                            >
                                <ShoppingBag
                                    size={22}
                                    strokeWidth={1.7}
                                />
                            </span>

                            <span
                                className={styles.cart}
                                aria-hidden="true"
                            >
                                <Check
                                    size={22}
                                    strokeWidth={2}
                                />
                            </span>

                            <ArrowRight
                                className={styles.buttonArrow}
                                size={18}
                            />
                        </button>

                        {cartError && !isSizeRequired && (
                            <p
                                className={styles.errorMsg}
                                role="alert"
                            >
                                {cartError}
                            </p>
                        )}

                        <div className={styles.purchaseNote}>
                            <span>SECURE CHECKOUT</span>

                            <span className={styles.noteDot} />

                            <span>LANADA QUALITY</span>
                        </div>

                    </div>

                    {/* PRODUCT DETAILS FOOTER */}
                    <div className={styles.detailsFooter}>
                        <div>
                            <span className={styles.detailsIcon}>01</span>
                            <span>PREMIUM SELECTION</span>
                        </div>

                        <div>
                            <span className={styles.detailsIcon}>02</span>
                            <span>MADE FOR EVERYDAY</span>
                        </div>
                    </div>

                </div>

            </section>

            {/* RELATED PRODUCTS */}
            <section
                className={styles.relatedSection}
                aria-labelledby="related-title"
            >

                <div className={styles.relatedHeading}>
                    <div>
                        <span className={styles.sectionEyebrow}>
                            COMPLETE YOUR EDIT
                        </span>

                        <h2
                            className={styles.relatedTitle}
                            id="related-title"
                        >
                            YOU MAY ALSO LIKE
                        </h2>
                    </div>

                    <Link
                        to="/shop"
                        className={styles.viewAllLink}
                    >
                        VIEW ALL
                        <ArrowRight size={15} />
                    </Link>
                </div>

                <div className={styles.relatedGrid}>
                    {RELATED_PRODUCTS.map((relatedProduct) => (
                        <article
                            key={relatedProduct.id}
                            className={styles.relatedCard}
                        >

                            <button
                                type="button"
                                className={styles.relatedImageButton}
                                onClick={() => handleRelatedProduct(relatedProduct)}
                                aria-label={`View ${relatedProduct.name}`}
                            >
                                <span className={styles.relatedImageTag}>
                                    LANADA
                                </span>

                                <img
                                    src={relatedProduct.img}
                                    alt={relatedProduct.name}
                                />
                            </button>

                            <div className={styles.relatedInfo}>

                                <div>
                                    <h3 className={styles.relatedName}>
                                        {relatedProduct.name}
                                    </h3>

                                    <p className={styles.relatedBrand}>
                                        {relatedProduct.company}
                                    </p>
                                </div>

                                <span className={styles.relatedPrice}>
                                    {relatedProduct.price}
                                </span>

                                <button
                                    type="button"
                                    className={styles.relatedBtn}
                                    onClick={() => handleRelatedProduct(relatedProduct)}
                                >
                                    VIEW PRODUCT
                                    <ArrowRight size={14} />
                                </button>

                            </div>
                        </article>
                    ))}
                </div>

            </section>

            {/* MORE PRODUCTS */}
            <section
                className={styles.productGridSection}
                aria-label="More products"
            >

                <div className={styles.relatedHeading}>
                    <div>
                        <span className={styles.sectionEyebrow}>
                            DISCOVER MORE
                        </span>

                        <h2 className={styles.relatedTitle}>
                            THE COLLECTION
                        </h2>
                    </div>
                </div>

                <ProductGrid />

            </section>

        </main>
    );
};

export default SizeSelection;
