import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        shop: 'SHOP',
        men: 'MEN',
        women: 'Women',
        jackets: 'JACKETS',
        kids: 'Kids',
        shoes: 'SHOES',
        caps: 'CAPS',
        cart: 'Cart',
        orders: 'My Orders',
        login: 'Login',
        signup: 'Create Account'
      },
      hero: {
        title: 'Discover Your Style',
        subtitle: 'Shop the latest fashion collections.',
        button: 'Shop Now'
      },
      common: {
        search: 'Search',
        account: 'My Account',
        loading: 'Loading...',
        continue: 'Continue Shopping',
        addToCart: 'Add to Cart',
        selectSize: 'Select Size',
        viewAll: 'View All',
        currency: 'DH'
      },
      cart: {
        title: 'Shopping Cart',
        empty: 'Your cart is empty',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        discount: 'Discount',
        total: 'Total',
        checkout: 'Proceed to Checkout',
        remove: 'Remove',
        quantity: 'Quantity'
      },
      checkout: {
        title: 'Shipping Information',
        fullName: 'Full Name',
        phone: 'Phone Number',
        city: 'City',
        region: 'Region',
        address: 'Full Address',
        payment: 'Payment Method',
        cash: 'Cash on Delivery',
        placeOrder: 'Place Order'
      },
      orders: {
        title: 'My Orders',
        empty: 'You have no orders yet.',
        pending: 'Pending',
        processing: 'Processing',
        shipped: 'Shipped',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
      },
      auth: {
        login: 'Login',
        logout: 'Logout',
        email: 'Email Address',
        password: 'Password',
        forgot: 'Forgot Password?',
        signup: 'Create Account'
      }
    }
  },

  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        shop: 'BOUTIQUE',
        men: 'HOMME',
        women: 'Femme',
        jackets: 'VESTES',
        kids: 'Enfants',
        shoes: 'CHAUSSURES',
        caps: 'CASQUETTES',
        cart: 'Panier',
        orders: 'Mes commandes',
        login: 'Connexion',
        signup: 'Créer un compte'
      },
      hero: {
        title: 'Découvrez votre style',
        subtitle: 'Découvrez les dernières collections de mode.',
        button: 'Acheter maintenant'
      },
      common: {
        search: 'Rechercher',
        account: 'Mon compte',
        loading: 'Chargement...',
        continue: 'Continuer vos achats',
        addToCart: 'Ajouter au panier',
        selectSize: 'Choisir la taille',
        viewAll: 'Voir tout',
        currency: 'DH'
      },
      cart: {
        title: 'Panier',
        empty: 'Votre panier est vide',
        subtotal: 'Sous-total',
        shipping: 'Livraison',
        discount: 'Réduction',
        total: 'Total',
        checkout: 'Passer la commande',
        remove: 'Supprimer',
        quantity: 'Quantité'
      },
      checkout: {
        title: 'Informations de livraison',
        fullName: 'Nom complet',
        phone: 'Numéro de téléphone',
        city: 'Ville',
        region: 'Région',
        address: 'Adresse complète',
        payment: 'Mode de paiement',
        cash: 'Paiement à la livraison',
        placeOrder: 'Confirmer la commande'
      },
      orders: {
        title: 'Mes commandes',
        empty: 'Vous n’avez pas encore de commandes.',
        pending: 'En attente',
        processing: 'En préparation',
        shipped: 'Expédiée',
        delivered: 'Livrée',
        cancelled: 'Annulée'
      },
      auth: {
        login: 'Connexion',
        logout: 'Déconnexion',
        email: 'Adresse e-mail',
        password: 'Mot de passe',
        forgot: 'Mot de passe oublié ?',
        signup: 'Créer un compte'
      }
    }
  },

  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        shop: 'المتجر',
        men: 'رجال',
        women: 'نساء',
        jackets: 'السترات',
        kids: 'الأطفال',
        shoes: 'الأحذية',
        caps: 'القبعات',
        cart: 'سلة التسوق',
        orders: 'طلباتي',
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب'
      },
      hero: {
        title: 'اكتشف أسلوبك الخاص',
        subtitle: 'اكتشف أحدث تشكيلات الأزياء.',
        button: 'تسوق الآن'
      },
      common: {
        search: 'بحث',
        account: 'حسابي',
        loading: 'جارٍ التحميل...',
        continue: 'متابعة التسوق',
        addToCart: 'أضف إلى السلة',
        selectSize: 'اختر المقاس',
        viewAll: 'عرض الكل',
        currency: 'درهم'
      },
      cart: {
        title: 'سلة التسوق',
        empty: 'سلة التسوق فارغة',
        subtotal: 'المجموع الفرعي',
        shipping: 'التوصيل',
        discount: 'التخفيض',
        total: 'المجموع',
        checkout: 'إتمام الطلب',
        remove: 'حذف',
        quantity: 'الكمية'
      },
      checkout: {
        title: 'معلومات التوصيل',
        fullName: 'الاسم الكامل',
        phone: 'رقم الهاتف',
        city: 'المدينة',
        region: 'الجهة',
        address: 'العنوان الكامل',
        payment: 'طريقة الدفع',
        cash: 'الدفع عند الاستلام',
        placeOrder: 'تأكيد الطلب'
      },
      orders: {
        title: 'طلباتي',
        empty: 'ليس لديك أي طلبات حتى الآن.',
        pending: 'قيد الانتظار',
        processing: 'قيد التجهيز',
        shipped: 'تم الشحن',
        delivered: 'تم التوصيل',
        cancelled: 'ملغى'
      },
      auth: {
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        forgot: 'نسيت كلمة المرور؟',
        signup: 'إنشاء حساب'
      }
    }
  }
};

const supportedLanguages = ['en', 'fr', 'ar'];

const getSavedLanguage = () => {
  try {
    const saved = localStorage.getItem('lanada_language');
    const language = (saved || 'en').split('-')[0].toLowerCase();

    return supportedLanguages.includes(language)
      ? language
      : 'en';
  } catch {
    return 'en';
  }
};

const updateDocumentLanguage = (language) => {
  const lang = String(language || 'en')
    .split('-')[0]
    .toLowerCase();

  const validLanguage = supportedLanguages.includes(lang)
    ? lang
    : 'en';

  const direction = validLanguage === 'ar' ? 'rtl' : 'ltr';

  if (typeof document !== 'undefined') {
    document.documentElement.lang = validLanguage;
    document.documentElement.dir = direction;

    if (document.body) {
      document.body.dir = direction;
    }
  }

  try {
    localStorage.setItem('lanada_language', validLanguage);
  } catch {
    // Ignore storage errors.
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

i18n.on('languageChanged', updateDocumentLanguage);

updateDocumentLanguage(getSavedLanguage());

export default i18n;
