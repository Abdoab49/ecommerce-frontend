import React, {
  useEffect,
  useMemo,
  useState,
  useLayoutEffect
} from 'react';

import './OrderConfirmationTicket.css';

// =========================================
// PROFESSIONAL TICKET ICONS
// =========================================

const TicketIcon = ({ name, size = 20 }) => {
  const icons = {
    check: (
      <>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </>
    ),

    receipt: (
      <>
        <path d="M4 3h16v18l-3-2-3 2-2-2-3 2-2-2-3 2V3Z" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </>
    ),

    wallet: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3 9h18M16 14h2" />
      </>
    ),

    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01" />
      </>
    ),

    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),

    phone: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </>
    ),

    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),

    package: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="M3 8v9l9 5 9-5V8M12 13v9" />
      </>
    )
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name] || null}
    </svg>
  );
};

// =========================================
// BARCODE
// =========================================

const hashCode = (value) => {
  return value.split('').reduce((result, character) => {
    result = ((result << 5) - result) + character.charCodeAt(0);
    return result | 0;
  }, 0);
};

const Barcode = ({ value }) => {
  const bars = useMemo(() => {
    if (!value) return [];

    const seed = hashCode(value);

    const random = (number) => {
      const x = Math.sin(number) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 60 }, (_, index) => ({
      width: random(seed + index) > 0.7 ? 2.5 : 1.5
    }));
  }, [value]);

  if (!value) return null;

  const spacing = 1.5;

  const totalWidth =
    bars.reduce(
      (total, bar) => total + bar.width + spacing,
      0
    ) - spacing;

  const svgWidth = 250;
  const svgHeight = 65;

  let currentX = (svgWidth - totalWidth) / 2;

  return (
    <div className="lanada-ticket-barcode">

      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        role="img"
        aria-label={`Decorative barcode for order ${value}`}
      >
        {bars.map((bar, index) => {
          const x = currentX;
          currentX += bar.width + spacing;

          return (
            <rect
              key={index}
              x={x}
              y="7"
              width={bar.width}
              height="49"
              fill="currentColor"
            />
          );
        })}
      </svg>

      <p>{value}</p>

    </div>
  );
};

// =========================================
// CONFETTI
// =========================================

const ConfettiExplosion = () => {
  const colors = [
    '#171717',
    '#b9a477',
    '#8da58b',
    '#d9c7a1',
    '#a8b5a3'
  ];

  const pieces = useMemo(() => {
    return Array.from({ length: 85 }, (_, index) => ({
      left: `${Math.random() * 100}%`,
      top: `${-15 + Math.random() * 10}%`,
      backgroundColor: colors[index % colors.length],
      transform: `rotate(${Math.random() * 360}deg)`,
      animation: `lanada-ticket-fall ${
        2.5 + Math.random() * 2
      }s ${Math.random() * 1.5}s linear forwards`
    }));
  }, []);

  return (
    <div className="lanada-ticket-confetti" aria-hidden="true">
      {pieces.map((piece, index) => (
        <span
          key={index}
          style={piece}
        />
      ))}
    </div>
  );
};

// =========================================
// FORMAT HELPERS
// =========================================

const formatAmount = (amount) => {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return '— DH';
  }

  return `${numericAmount.toLocaleString('fr-MA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })} DH`;
};

const formatDate = (value) => {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
    .format(date)
    .replace(',', ' •');
};

// =========================================
// ORDER CONFIRMATION TICKET
// =========================================

const OrderConfirmationTicket = ({
  order,
  onContinueShopping,
  onViewOrders
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  // Scroll page and app container to the top
  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const appContent = document.querySelector('.app-content');

    if (appContent) {
      appContent.scrollTop = 0;
      appContent.scrollTo(0, 0);
    }
  }, []);

  // Confetti timers
  useEffect(() => {
    const showTimer = window.setTimeout(() => {
      setShowConfetti(true);
    }, 100);

    const hideTimer = window.setTimeout(() => {
      setShowConfetti(false);
    }, 5500);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  // Actual backend data
  const shipping = order?.shippingAddress || {};

  const realOrderId =
    order?._id ||
    order?.id ||
    order?.orderId ||
    '';

  const ticketId = realOrderId
    ? String(realOrderId).slice(-12).toUpperCase()
    : 'CONFIRMED';

  const barcodeValue = realOrderId
    ? String(realOrderId)
    : ticketId;

  const amount =
    order?.totalAmount ??
    order?.total ??
    0;

  const date =
    order?.createdAt ||
    order?.date;

  const customerName =
    shipping.fullName ||
    order?.customerName ||
    'LANADA Customer';

  const phone =
    shipping.phone ||
    order?.phone ||
    '';

  const address = [
    shipping.street || shipping.address,
    shipping.region,
    shipping.city,
    shipping.country || 'Morocco'
  ]
    .filter(Boolean)
    .join(', ');

  const status = String(order?.status || 'pending')
    .replace(/_/g, ' ');

  const paymentMethod = String(
    order?.paymentMethod || 'cash_on_delivery'
  ).toLowerCase();

  const paymentLabel =
    paymentMethod === 'cash_on_delivery'
      ? 'Cash on Delivery'
      : paymentMethod.replace(/_/g, ' ');

  return (
    <main className="lanada-ticket-page">

      {showConfetti && <ConfettiExplosion />}

      <div className="lanada-ticket">

        {/* Ticket cut-out effect */}
        <span className="lanada-ticket-cutout lanada-ticket-cutout-left" />
        <span className="lanada-ticket-cutout lanada-ticket-cutout-right" />

        {/* Brand */}
        <div className="lanada-ticket-brand">
          LANADA<span>.</span>
        </div>

        {/* Success */}
        <div className="lanada-ticket-intro">

          <div className="lanada-ticket-success-circle">
            <TicketIcon name="check" size={39} />
          </div>

          <h1>Thank you!</h1>

          <p>
            Your order has been placed successfully
          </p>

        </div>

        <div className="lanada-ticket-content">

          {/* Order ID */}
          <div className="lanada-ticket-info-row">

            <div className="lanada-ticket-icon">
              <TicketIcon name="receipt" />
            </div>

            <div className="lanada-ticket-info-text">
              <span>Order ID</span>
              <strong className="lanada-ticket-order-id">
                {ticketId}
              </strong>
            </div>

          </div>

          {/* Amount */}
          <div className="lanada-ticket-info-row">

            <div className="lanada-ticket-icon">
              <TicketIcon name="wallet" />
            </div>

            <div className="lanada-ticket-info-text">
              <span>Total amount</span>
              <strong className="lanada-ticket-amount">
                {formatAmount(amount)}
              </strong>
            </div>

          </div>

          {/* Date */}
          <div className="lanada-ticket-info-row">

            <div className="lanada-ticket-icon">
              <TicketIcon name="calendar" />
            </div>

            <div className="lanada-ticket-info-text">
              <span>Date &amp; Time</span>
              <strong>{formatDate(date)}</strong>
            </div>

          </div>

          {/* Customer */}
          <div className="lanada-ticket-info-row">

            <div className="lanada-ticket-icon">
              <TicketIcon name="user" />
            </div>

            <div className="lanada-ticket-info-text">
              <span>Customer</span>
              <strong>{customerName}</strong>
            </div>

          </div>

          {/* Phone */}
          {phone && (
            <div className="lanada-ticket-info-row">

              <div className="lanada-ticket-icon">
                <TicketIcon name="phone" />
              </div>

              <div className="lanada-ticket-info-text">
                <span>Phone number</span>
                <strong>{phone}</strong>
              </div>

            </div>
          )}

          {/* Delivery address */}
          {address && (
            <div className="lanada-ticket-info-row">

              <div className="lanada-ticket-icon">
                <TicketIcon name="pin" />
              </div>

              <div className="lanada-ticket-info-text">
                <span>Delivery address</span>
                <strong>{address}</strong>
              </div>

            </div>
          )}

          {/* Payment */}
          <div className="lanada-ticket-payment">

            <div className="lanada-ticket-payment-icon">
              <TicketIcon name="wallet" size={21} />
            </div>

            <div className="lanada-ticket-payment-text">
              <span>Payment method</span>
              <strong>{paymentLabel}</strong>
            </div>

            <div className="lanada-ticket-payment-badge">
              COD
            </div>

          </div>

          {/* Status */}
          <div className="lanada-ticket-status">

            <div className="lanada-ticket-status-icon">
              <TicketIcon name="package" size={17} />
            </div>

            <span>Order status</span>

            <strong>{status.toUpperCase()}</strong>

          </div>

          {/* Barcode */}
          <Barcode value={barcodeValue} />

        </div>

        {/* Actions */}
        <div className="lanada-ticket-actions">

          <button
            type="button"
            onClick={onContinueShopping}
            className="lanada-ticket-continue"
          >
            Continue Shopping
            <span>→</span>
          </button>

          <button
            type="button"
            onClick={onViewOrders}
            className="lanada-ticket-orders"
          >
            View My Orders
          </button>

        </div>

      </div>

    </main>
  );
};

export default OrderConfirmationTicket;