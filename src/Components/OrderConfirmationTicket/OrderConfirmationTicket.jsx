import React, { useEffect, useMemo, useState } from 'react';
import './OrderConfirmationTicket.css';

// Success icon
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lanada-ticket-check"
    aria-hidden="true"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// Cash on Delivery icon
const CashIcon = () => (
  <div className="lanada-ticket-payment-icon">
    <span>DH</span>
  </div>
);

// Dashed separator
const DashedLine = () => (
  <div className="lanada-ticket-dashed" aria-hidden="true" />
);

// Generate a stable barcode from the order ID
const hashCode = (value) =>
  value.split('').reduce((result, character) => {
    result = ((result << 5) - result) + character.charCodeAt(0);
    return result | 0;
  }, 0);

// Barcode
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
    bars.reduce((total, bar) => total + bar.width + spacing, 0) - spacing;

  const svgWidth = 250;
  const svgHeight = 70;

  let currentX = (svgWidth - totalWidth) / 2;

  return (
    <div className="lanada-ticket-barcode">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        aria-label={`Decorative barcode for order ${value}`}
      >
        {bars.map((bar, index) => {
          const x = currentX;
          currentX += bar.width + spacing;

          return (
            <rect
              key={index}
              x={x}
              y="10"
              width={bar.width}
              height="50"
              fill="currentColor"
            />
          );
        })}
      </svg>

      <p>{value}</p>
    </div>
  );
};

// Confetti animation
const ConfettiExplosion = () => {
  const colors = [
    '#ef4444',
    '#3b82f6',
    '#22c55e',
    '#eab308',
    '#8b5cf6',
    '#f97316'
  ];

  const pieces = useMemo(
    () =>
      Array.from({ length: 100 }, (_, index) => ({
        left: `${Math.random() * 100}%`,
        top: `${-20 + Math.random() * 10}%`,
        backgroundColor: colors[index % colors.length],
        transform: `rotate(${Math.random() * 360}deg)`,
        animation: `lanada-ticket-fall ${
          2.5 + Math.random() * 2.5
        }s ${Math.random() * 2}s linear forwards`
      })),
    []
  );

  return (
    <div className="lanada-ticket-confetti" aria-hidden="true">
      {pieces.map((piece, index) => (
        <span key={index} style={piece} />
      ))}
    </div>
  );
};

// Format Moroccan currency
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

// Format date
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

// Main confirmation ticket
const OrderConfirmationTicket = ({
  order,
  onContinueShopping,
  onViewOrders
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const showTimer = window.setTimeout(
      () => setShowConfetti(true),
      100
    );

    const hideTimer = window.setTimeout(
      () => setShowConfetti(false),
      6000
    );

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const shipping = order?.shippingAddress || {};

  const realOrderId =
    order?._id ||
    order?.id ||
    order?.orderId ||
    '';

  const ticketId = realOrderId
    ? String(realOrderId).slice(-12).toUpperCase()
    : 'CONFIRMED';

  const amount = order?.totalAmount ?? order?.total ?? 0;

  const date = order?.createdAt || order?.date;

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

        {/* Thank You */}
        <div className="lanada-ticket-intro">

          <div className="lanada-ticket-success-circle">
            <CheckCircleIcon />
          </div>

          <h1>Thank you!</h1>

          <p>
            Your order has been placed successfully
          </p>

        </div>

        <div className="lanada-ticket-content">

          <DashedLine />

          {/* Order ID and Amount */}
          <div className="lanada-ticket-summary">

            <div>
              <p className="lanada-ticket-label">
                Order ID
              </p>

              <p className="lanada-ticket-id">
                {ticketId}
              </p>
            </div>

            <div className="lanada-ticket-amount-block">

              <p className="lanada-ticket-label">
                Amount
              </p>

              <p className="lanada-ticket-amount">
                {formatAmount(amount)}
              </p>

            </div>

          </div>

          {/* Date */}
          <div className="lanada-ticket-date-block">

            <p className="lanada-ticket-label">
              Date &amp; Time
            </p>

            <p className="lanada-ticket-date">
              {formatDate(date)}
            </p>

          </div>

          {/* Customer and Payment */}
          <div className="lanada-ticket-customer">

            <CashIcon />

            <div>
              <p className="lanada-ticket-customer-name">
                {customerName}
              </p>

              <p className="lanada-ticket-subtitle">
                {paymentLabel}
              </p>

              {phone && (
                <p className="lanada-ticket-subtitle">
                  {phone}
                </p>
              )}
            </div>

          </div>

          {/* Delivery address */}
          {address && (
            <div className="lanada-ticket-address">

              <p className="lanada-ticket-label">
                Delivery Address
              </p>

              <p>{address}</p>

            </div>
          )}

          {/* Order status */}
          <div className="lanada-ticket-status">

            <span className="lanada-ticket-label">
              Order status
            </span>

            <strong>
              {status.toUpperCase()}
            </strong>

          </div>

          <DashedLine />

          {/* Barcode */}
          <Barcode
            value={realOrderId ? String(realOrderId) : ticketId}
          />

        </div>

        {/* Buttons */}
        <div className="lanada-ticket-actions">

          <button
            type="button"
            onClick={onContinueShopping}
            className="lanada-ticket-continue"
          >
            Continue Shopping <span>→</span>
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