import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Cart() {
    const { items, subtotal, updateQuantity, removeItem } = useCart()

    const shipping = subtotal > 99 ? 0 : 9.99
    const total = subtotal + shipping

    if (items.length === 0) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p style={{ fontSize: 56, marginBottom: 20 }}>🛒</p>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'rgb(var(--foreground))', marginBottom: 10 }}>
                        Your cart is empty
                    </h2>
                    <p style={{ fontSize: 15, color: 'rgb(var(--muted-foreground))', marginBottom: 24 }}>
                        Add some products to get started
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
                            <ShoppingBag size={16} /> Continue Shopping
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
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: 'rgb(var(--foreground))', letterSpacing: '-0.02em', marginBottom: 32 }}>
                        Cart ({items.length})
                    </h1>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }} className="cart-layout">
                    {/* Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <AnimatePresence>
                            {items.map(item => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20, height: 0 }}
                                    className="glass-card"
                                    style={{
                                        padding: 16,
                                        borderRadius: 14,
                                        display: 'flex',
                                        gap: 16,
                                        alignItems: 'center',
                                        marginBottom: 12,
                                    }}
                                >
                                    <Link to={`/product/${item.id}`}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: 80, height: 80, borderRadius: 10, objectFit: 'cover' }}
                                        />
                                    </Link>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                                            <h3 className="line-clamp-1" style={{ fontSize: 15, fontWeight: 600, color: 'rgb(var(--foreground))' }}>
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p style={{ fontSize: 12, color: 'rgb(var(--muted-foreground))', marginTop: 2 }}>{item.category}</p>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: 'rgb(var(--foreground))', marginTop: 6 }}>${item.price}</p>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div className="qty-control">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => removeItem(item.id)}
                                            style={{
                                                width: 36,
                                                height: 36,
                                                borderRadius: 8,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'transparent',
                                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                                color: 'rgb(239, 68, 68)',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <Trash2 size={15} />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card"
                        style={{ padding: 24, borderRadius: 16, height: 'fit-content', position: 'sticky', top: 88 }}
                    >
                        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'rgb(var(--foreground))', marginBottom: 20 }}>
                            Order Summary
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                <span style={{ color: 'rgb(var(--muted-foreground))' }}>Subtotal</span>
                                <span style={{ color: 'rgb(var(--foreground))', fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                <span style={{ color: 'rgb(var(--muted-foreground))' }}>Shipping</span>
                                <span style={{ color: shipping === 0 ? 'rgb(34, 197, 94)' : 'rgb(var(--foreground))', fontWeight: 500 }}>
                                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <p style={{ fontSize: 12, color: 'rgb(var(--muted-foreground))' }}>
                                    Free shipping on orders over $99
                                </p>
                            )}
                            <div className="divider" style={{ margin: '4px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
                                <span style={{ fontWeight: 600, color: 'rgb(var(--foreground))' }}>Total</span>
                                <span style={{ fontWeight: 700, color: 'rgb(var(--foreground))' }}>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link to="/checkout" style={{ textDecoration: 'none', display: 'block', marginTop: 24 }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: 12,
                                    background: 'rgb(var(--foreground))',
                                    color: 'rgb(var(--background))',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8,
                                }}
                            >
                                Checkout <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (min-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr 360px !important;
          }
        }
      `}</style>
        </div>
    )
}
