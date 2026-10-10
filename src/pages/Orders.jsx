import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Orders.module.css";

const STATUS_LABELS = {
  pending: "في الانتظار",
  processing: "قيد المعالجة",
  shipped: "تم الشحن",
  delivered: "تم التوصيل",
  cancelled: "ملغى",
};

const STATUS_KEYS = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const formatMoney = (amount) =>
  `${Number(amount || 0).toLocaleString("fr-FR")} DH`;

const formatDate = (date) => {
  if (!date) return "تاريخ غير متوفر";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "تاريخ غير متوفر";
  return parsedDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const Orders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    // ✅ Check wach user mconnecté
    const userId = localStorage.getItem("lanada_user_id");

    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://backend-3lyx.onrender.com/api/orders?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error("تعذر تحميل الطلبات");
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("وقع مشكل أثناء تحميل الطلبات. عاود المحاولة من بعد.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const stats = useMemo(() => {
    const result = {
      total: orders.length,
      spent: 0,
      units: 0,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      const status = String(order.status || "").toLowerCase();
      if (Object.prototype.hasOwnProperty.call(result, status)) {
        result[status] += 1;
      }
      result.spent += Number(order.totalAmount || 0);
      const items = Array.isArray(order.items) ? order.items : [];
      items.forEach((item) => {
        result.units += Number(item.quantity || 0);
      });
    });

    return result;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders
      .filter((order) => {
        const orderId = String(order._id || order.id || "").toLowerCase();
        const customerName = String(
          order.shippingAddress?.fullName || ""
        ).toLowerCase();
        const status = String(order.status || "").toLowerCase();

        const matchesSearch =
          !query || orderId.includes(query) || customerName.includes(query);

        const matchesStatus =
          statusFilter === "all" || status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();

        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [orders, search, statusFilter, sortOrder]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setSortOrder("newest");
  };

  if (loading) {
    return (
      <div className={styles.state}>
        <span className={styles.spinner} />
        <p>كنوجدو ليك الطلبات ديالك...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.state}>
        <div className={styles.stateIcon}>!</div>
        <h2>ما قدرناش نجيبو الطلبات</h2>
        <p>{error}</p>
        <button
          className={styles.primaryButton}
          onClick={() => window.location.reload()}
        >
          عاود المحاولة
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={styles.state}>
        <div className={styles.stateIcon}>🛍️</div>
        <h2>ما عندك حتى طلب دابا</h2>
        <p>ملي تدير أول طلب، غادي تلقى التفاصيل ديالو هنا.</p>
        <button
          className={styles.primaryButton}
          onClick={() => navigate("/")}
        >
          اكتشف المنتجات
        </button>
      </div>
    );
  }

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              مساحة الزبون
            </span>
            <h1>طلباتي</h1>
            <p>كل مشترياتك وتتبع الطلبات ديالك، فبلاصة وحدة.</p>
          </div>

          <button
            className={styles.shopButton}
            onClick={() => navigate("/")}
          >
            <span>＋</span>
            كمل التسوق
          </button>
        </section>

        <section className={styles.statsGrid} aria-label="إحصائيات الطلبات">
          <article className={`${styles.statCard} ${styles.statViolet}`}>
            <div className={styles.statTop}>
              <span className={styles.statIcon}>▤</span>
              <span className={styles.statCaption}>المجموع</span>
            </div>
            <strong className={styles.statValue}>{stats.total}</strong>
            <span className={styles.statLabel}>طلب مسجل</span>
            <span className={styles.statOrb} />
          </article>

          <article className={`${styles.statCard} ${styles.statTeal}`}>
            <div className={styles.statTop}>
              <span className={styles.statIcon}>DH</span>
              <span className={styles.statCaption}>المشتريات</span>
            </div>
            <strong className={styles.statValue}>
              {formatMoney(stats.spent)}
            </strong>
            <span className={styles.statLabel}>مجموع الطلبات</span>
            <span className={styles.statOrb} />
          </article>

          <article className={`${styles.statCard} ${styles.statAmber}`}>
            <div className={styles.statTop}>
              <span className={styles.statIcon}>□</span>
              <span className={styles.statCaption}>المنتجات</span>
            </div>
            <strong className={styles.statValue}>{stats.units}</strong>
            <span className={styles.statLabel}>قطعة مطلوبة</span>
            <span className={styles.statOrb} />
          </article>

          <article className={`${styles.statCard} ${styles.statBlue}`}>
            <div className={styles.statTop}>
              <span className={styles.statIcon}>✓</span>
              <span className={styles.statCaption}>تم التوصيل</span>
            </div>
            <strong className={styles.statValue}>{stats.delivered}</strong>
            <span className={styles.statLabel}>طلب وصل بنجاح</span>
            <span className={styles.statOrb} />
          </article>
        </section>

        <section className={styles.overview}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionEyebrow}>ملخص الطلبات</span>
              <h2>الحالة ديال طلباتك</h2>
              <p>نظرة سريعة على فين وصل كل طلب.</p>
            </div>
            <span className={styles.orderCount}>
              {orders.length} طلب
            </span>
          </div>

          <div className={styles.statusList}>
            {STATUS_KEYS.map((status) => {
              const count = stats[status] || 0;
              const percentage = orders.length
                ? Math.round((count / orders.length) * 100)
                : 0;

              return (
                <div className={styles.statusRow} key={status}>
                  <div className={styles.statusLabel}>
                    <span
                      className={`${styles.dot} ${styles[`dot_${status}`]}`}
                    />
                    <span>{STATUS_LABELS[status]}</span>
                    <strong>{count}</strong>
                  </div>

                  <div className={styles.progressTrack}>
                    <span
                      className={`${styles.progressBar} ${
                        styles[`bar_${status}`]
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={styles.ordersSection}>
          <div className={styles.sectionHeading}>
            <div>
              <span className={styles.sectionEyebrow}>سجل الشراء</span>
              <h2>جميع الطلبات</h2>
              <p>قلب على طلب معين أو اختار الحالة اللي بغيتي.</p>
            </div>
          </div>

          <div className={styles.filters}>
            <label className={styles.searchBox}>
              <span className={styles.searchIcon}>⌕</span>
              <input
                type="search"
                placeholder="قلب برقم الطلب أو الاسم..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="البحث في الطلبات"
              />
            </label>

            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="فلترة حسب الحالة"
            >
              <option value="all">جميع الحالات</option>
              {STATUS_KEYS.map((status) => (
                <option value={status} key={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="ترتيب الطلبات"
            >
              <option value="newest">الأحدث أولا</option>
              <option value="oldest">الأقدم أولا</option>
            </select>
          </div>

          <div className={styles.resultsInfo}>
            كيبانو <strong>{filteredOrders.length}</strong> من{" "}
            <strong>{orders.length}</strong> طلب
          </div>

          {filteredOrders.length === 0 ? (
            <div className={styles.noResults}>
              <span className={styles.noResultsIcon}>⌕</span>
              <strong>ما لقينا حتى طلب</strong>
              <p>جرّب تبدل كلمة البحث أو تختار حالة أخرى.</p>
              <button className={styles.clearButton} onClick={clearFilters}>
                مسح البحث والفلترة
              </button>
            </div>
          ) : (
            <div className={styles.ordersList}>
              {filteredOrders.map((order, index) => {
                const orderId = String(order._id || order.id || "");
                const status = String(
                  order.status || "pending"
                ).toLowerCase();
                const items = Array.isArray(order.items) ? order.items : [];

                return (
                  <article
                    className={styles.card}
                    key={orderId || `order-${index}`}
                  >
                    <header className={styles.cardHeader}>
                      <div className={styles.orderIdentity}>
                        <span className={styles.orderNumber}>رقم الطلب</span>
                        <strong className={styles.id}>
                          #{orderId.slice(-6).toUpperCase() || "------"}
                        </strong>
                      </div>

                      <span
                        className={`${styles.status} ${
                          styles[`status_${status}`] || styles.statusUnknown
                        }`}
                      >
                        <span className={styles.statusDot} />
                        {STATUS_LABELS[status] || order.status || "غير محدد"}
                      </span>

                      <time className={styles.date}>
                        {formatDate(order.createdAt)}
                      </time>
                    </header>

                    <div className={styles.shipping}>
                      <span className={styles.shippingIcon}>⌖</span>
                      <div>
                        <span className={styles.shippingLabel}>
                          عنوان التوصيل
                        </span>
                        <strong>
                          {order.shippingAddress?.fullName ||
                            "الاسم غير متوفر"}
                        </strong>
                        <p>
                          {[
                            order.shippingAddress?.street,
                            order.shippingAddress?.city,
                            order.shippingAddress?.region,
                          ]
                            .filter(Boolean)
                            .join("، ") || "العنوان غير متوفر"}
                        </p>
                        {order.shippingAddress?.phone && (
                          <p>{order.shippingAddress.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className={styles.items}>
                      {items.length > 0 ? (
                        items.map((item, itemIndex) => (
                          <div
                            className={styles.item}
                            key={item._id || itemIndex}
                          >
                            <img
                              src={
                                item.image ||
                                "/Assets/ShoeStore/tshirt1.png"
                              }
                              alt={item.name || "منتج"}
                              loading="lazy"
                            />

                            <div className={styles.itemInfo}>
                              <p className={styles.itemName}>
                                {item.name || "منتج"}
                              </p>
                              <span className={styles.itemMeta}>
                                الكمية: {item.quantity || 1}
                                {item.size ? ` · القياس: ${item.size}` : ""}
                              </span>
                            </div>

                            <strong className={styles.itemPrice}>
                              {formatMoney(item.price)}
                            </strong>
                          </div>
                        ))
                      ) : (
                        <p className={styles.noItems}>
                          تفاصيل المنتجات غير متوفرة.
                        </p>
                      )}
                    </div>

                    <footer className={styles.cardFooter}>
                      <span>المجموع ديال الطلب</span>
                      <strong>{formatMoney(order.totalAmount)}</strong>
                    </footer>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className={styles.pageFooter}>
          <span className={styles.footerSparkle}>✦</span>
          شكرا على الثقة ديالك، وفرجة ممتعة فالتسوق!
        </footer>
      </div>
    </main>
  );
};

export default Orders;