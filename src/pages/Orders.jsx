import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Package, ChevronRight, Clock, MapPin, CheckCircle2, Truck, Box, PackageCheck } from 'lucide-react'
import { useOrders, ORDER_STATUSES } from '../context/OrderContext'

const statusIcons = {
    'Confirmed': <CheckCircle2 size={14} />,
    'Processing': <Box size={14} />,
    'Shipped': <Package size={14} />,
    'Out for Delivery': <Truck size={14} />,
    'Delivered': <PackageCheck size={14} />,
}

function ProgressPill({ currentStatus }) {
    const currentIdx = ORDER_STATUSES.indexOf(currentStatus)

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%' }}>
            {ORDER_STATUSES.map((status, idx) => {
                const isCompleted = idx <= currentIdx
                const isCurrent = idx === currentIdx

                return (
                    <div key={status} style={{ display: 'flex', alignItems: 'center', flex: idx < ORDER_STATUSES.length - 1 ? 1 : 'none' }}>
                        {/* Step dot/pill */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: idx * 0.08 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                                padding: isCurrent ? '5px 12px' : '5px 8px',
                                borderRadius: 20,
                                background: isCompleted
                                    ? isCurrent
                                        ? 'rgb(var(--accent))'
                                        : 'rgba(var(--accent), 0.15)'
                                    : 'rgba(var(--muted), 0.5)',
                                color: isCompleted
                                    ? isCurrent
                                        ? '#fff'
                                        : 'rgb(var(--accent))'
                                    : 'rgb(var(--muted-foreground))',
                                fontSize: 11,
                                fontWeight: isCurrent ? 600 : 500,
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                            }}
                        >
                            {statusIcons[status]}
                            <span className="progress-label">{status}</span>
                        </motion.div>

                        {/* Connector line */}
                        {idx < ORDER_STATUSES.length - 1 && (
                            <div style={{
                                flex: 1,
                                height: 2,
                                minWidth: 8,
                                background: idx < currentIdx
                                    ? 'rgba(var(--accent), 0.4)'
                                    : 'rgba(var(--muted-foreground), 0.15)',
                                borderRadius: 1,
                                margin: '0 2px',
                            }} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default function Orders() {
    const { orders, simulateProgress } = useOrders()

    if (orders.length === 0) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <p style={{ fontSize: 56, marginBottom: 20 }}>📦</p>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'rgb(var(--foreground))', marginBottom: 10 }}>
                        No orders yet
                    </h2>
                    <p style={{ fontSize: 15, color: 'rgb(var(--muted-foreground))', marginBottom: 24 }}>
                        When you place an order, it will appear here
                    </p>
                    <Link to="/shop" style={{ textDecoration: 'none' }}>
                        <motion.span
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '10px 24px',
                                borderRadius: 10,
                                background: 'rgb(var(--foreground))',
                                color: 'rgb(var(--background))',
                                fontSize: 14,
                                fontWeight: 600,
                            }}
                        >
                            <Package size={16} /> Start Shopping
                        </motion.span>
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div style={{ padding: '40px 0 60px' }}>
            <div className="container">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <p style={{ fontSize: 13, color: 'rgb(var(--muted-foreground))', marginBottom: 8 }}>
                        Home / <span style={{ color: 'rgb(var(--foreground))' }}>My Orders</span>
                    </p>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: 'rgb(var(--foreground))', letterSpacing: '-0.02em', marginBottom: 8 }}>
                        My Orders
                    </h1>
                    <p style={{ fontSize: 15, color: 'rgb(var(--muted-foreground))', marginBottom: 32 }}>
                        {orders.length} order{orders.length !== 1 ? 's' : ''}
                    </p>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {orders.map((order, i) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass-card"
                            style={{
                                borderRadius: 16,
                                overflow: 'hidden',
                            }}
                        >
                            {/* Order header */}
                            <div style={{
                                padding: '16px 20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: 12,
                                borderBottom: '1px solid rgba(var(--border), 0.3)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: 'rgba(var(--accent), 0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'rgb(var(--accent))',
                                    }}>
                                        <Package size={18} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 15, fontWeight: 600, color: 'rgb(var(--foreground))' }}>{order.id}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgb(var(--muted-foreground))' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                <Clock size={11} />
                                                {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                            <span>•</span>
                                            <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: 18, fontWeight: 700, color: 'rgb(var(--foreground))' }}>${order.total.toFixed(2)}</p>
                                    <p style={{ fontSize: 11, color: 'rgb(var(--muted-foreground))', display: 'flex', alignItems: 'center', gap: 3 }}>
                                        <MapPin size={10} /> Est. {order.estimatedDelivery}
                                    </p>
                                </div>
                            </div>

                            {/* Progress pill */}
                            <div style={{ padding: '16px 20px', overflowX: 'auto' }}>
                                <ProgressPill currentStatus={order.status} />
                            </div>

                            {/* Order items details */}
                            <div style={{
                                borderTop: '1px solid rgba(var(--border), 0.3)',
                            }}>
                                {order.items.map((item, itemIdx) => (
                                    <div
                                        key={item.id}
                                        style={{
                                            padding: '14px 20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 14,
                                            borderBottom: itemIdx < order.items.length - 1 ? '1px solid rgba(var(--border), 0.15)' : 'none',
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{
                                                width: 52, height: 52, borderRadius: 10,
                                                objectFit: 'cover',
                                                border: '1px solid rgba(var(--border), 0.3)',
                                                flexShrink: 0,
                                            }}
                                        />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <p className="line-clamp-1" style={{ fontSize: 14, fontWeight: 600, color: 'rgb(var(--foreground))', marginBottom: 3 }}>
                                                {item.name}
                                            </p>
                                            <p style={{ fontSize: 12, color: 'rgb(var(--muted-foreground))' }}>
                                                ${item.price.toFixed(2)} × {item.quantity}
                                            </p>
                                        </div>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: 'rgb(var(--foreground))', flexShrink: 0 }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Order totals */}
                            <div style={{
                                padding: '14px 20px',
                                borderTop: '1px solid rgba(var(--border), 0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 6,
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                    <span style={{ color: 'rgb(var(--muted-foreground))' }}>Subtotal</span>
                                    <span style={{ fontWeight: 500, color: 'rgb(var(--foreground))' }}>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                                    <span style={{ color: 'rgb(var(--muted-foreground))' }}>Shipping</span>
                                    <span style={{ fontWeight: 500, color: order.shipping === 0 ? 'rgb(34, 197, 94)' : 'rgb(var(--foreground))' }}>
                                        {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div style={{ height: 1, background: 'rgba(var(--border), 0.2)', margin: '4px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15 }}>
                                    <span style={{ fontWeight: 600, color: 'rgb(var(--foreground))' }}>Total</span>
                                    <span style={{ fontWeight: 700, color: 'rgb(var(--foreground))' }}>${order.total.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Order footer actions */}
                            <div style={{
                                padding: '12px 20px 16px',
                                borderTop: '1px solid rgba(var(--border), 0.3)',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                gap: 10,
                            }}>
                                {order.status !== 'Delivered' && (
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => simulateProgress(order.id)}
                                        style={{
                                            padding: '6px 14px',
                                            borderRadius: 8,
                                            border: '0.5px solid rgba(var(--border), 0.6)',
                                            background: 'rgba(var(--muted), 0.35)',
                                            color: 'rgb(var(--foreground))',
                                            fontSize: 12,
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4,
                                        }}
                                    >
                                        Advance Status <ChevronRight size={12} />
                                    </motion.button>
                                )}

                                {order.status === 'Delivered' && (
                                    <span style={{
                                        padding: '5px 12px',
                                        borderRadius: 20,
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        color: 'rgb(34, 197, 94)',
                                        fontSize: 12,
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                    }}>
                                        <PackageCheck size={13} /> Delivered
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 640px) {
          .progress-label { display: none; }
        }
      `}</style>
        </div>
    )
}
