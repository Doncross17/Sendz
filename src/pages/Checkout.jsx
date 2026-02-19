import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'

export default function Checkout() {
    const { items, subtotal, clearCart } = useCart()
    const { placeOrder } = useOrders()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zip: '',
        country: '',
    })

    const shipping = subtotal > 99 ? 0 : 9.99
    const total = subtotal + shipping

    const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        const shipping = subtotal > 99 ? 0 : 9.99
        const total = subtotal + shipping
        setTimeout(() => {
            placeOrder({
                items: [...items],
                subtotal,
                shipping,
                total,
                shippingInfo: { ...form },
            })
            setLoading(false)
            setSuccess(true)
            clearCart()
        }, 2000)
    }

    if (items.length === 0 && !success) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <p style={{ fontSize: 48, marginBottom: 16 }}>🛒</p>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Your cart is empty</h2>
                <Link to="/shop" style={{ fontSize: 14, color: 'rgb(var(--accent))' }}>Go to shop</Link>
            </div>
        )
    }

    if (success) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 20px', color: 'rgb(34, 197, 94)'
                    }}>
                        <Check size={28} />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: 'rgb(var(--foreground))', marginBottom: 10 }}>
                        Order placed!
                    </h2>
                    <p style={{ fontSize: 15, color: 'rgb(var(--muted-foreground))', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
                        Thank you for your purchase. We'll send you a confirmation email shortly.
                    </p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/orders" style={{ textDecoration: 'none' }}>
                            <motion.span
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: 'inline-flex',
                                    padding: '10px 24px',
                                    borderRadius: 10,
                                    background: 'rgb(var(--foreground))',
                                    color: 'rgb(var(--background))',
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                            >
                                View My Orders
                            </motion.span>
                        </Link>
                        <Link to="/shop" style={{ textDecoration: 'none' }}>
                            <motion.span
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    display: 'inline-flex',
                                    padding: '10px 24px',
                                    borderRadius: 10,
                                    border: '0.5px solid rgba(var(--border), 0.6)',
                                    background: 'transparent',
                                    color: 'rgb(var(--foreground))',
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                            >
                                Continue Shopping
                            </motion.span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        )
    }

    const inputStyle = {
        width: '100%',
        padding: '10px 14px',
        borderRadius: 10,
        border: '1px solid rgba(var(--border), 0.5)',
        background: 'rgba(var(--card), 0.6)',
        backdropFilter: 'blur(8px)',
        color: 'rgb(var(--foreground))',
        fontSize: 14,
        outline: 'none',
        transition: 'border-color 0.2s',
    }

    const labelStyle = {
        display: 'block',
        fontSize: 12,
        fontWeight: 500,
        color: 'rgb(var(--muted-foreground))',
        marginBottom: 6,
    }

    return (
        <div style={{ padding: '32px 0 60px' }}>
            <div className="container">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(var(--muted-foreground))', fontSize: 13, marginBottom: 28 }}
                    >
                        <ArrowLeft size={14} /> Back
                    </button>

                    <h1 style={{ fontSize: 28, fontWeight: 700, color: 'rgb(var(--foreground))', letterSpacing: '-0.02em', marginBottom: 32 }}>
                        Checkout
                    </h1>
                </motion.div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }} className="cart-layout">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card"
                            style={{ padding: 24, borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 20 }}
                        >
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'rgb(var(--foreground))' }}>Contact</h3>
                            <div>
                                <label style={labelStyle}>Email</label>
                                <input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" style={inputStyle} />
                            </div>

                            <div className="divider" />
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'rgb(var(--foreground))' }}>Shipping</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={labelStyle}>First Name</label>
                                    <input type="text" required value={form.firstName} onChange={update('firstName')} placeholder="John" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Last Name</label>
                                    <input type="text" required value={form.lastName} onChange={update('lastName')} placeholder="Doe" style={inputStyle} />
                                </div>
                            </div>

                            <div>
                                <label style={labelStyle}>Address</label>
                                <input type="text" required value={form.address} onChange={update('address')} placeholder="123 Main St" style={inputStyle} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                                <div>
                                    <label style={labelStyle}>City</label>
                                    <input type="text" required value={form.city} onChange={update('city')} placeholder="City" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>ZIP Code</label>
                                    <input type="text" required value={form.zip} onChange={update('zip')} placeholder="10001" style={inputStyle} />
                                </div>
                                <div>
                                    <label style={labelStyle}>Country</label>
                                    <input type="text" required value={form.country} onChange={update('country')} placeholder="US" style={inputStyle} />
                                </div>
                            </div>
                        </motion.div>

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

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                                {items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <img src={item.image} alt={item.name} style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }} />
                                            <div>
                                                <p className="line-clamp-1" style={{ fontWeight: 500, color: 'rgb(var(--foreground))' }}>{item.name}</p>
                                                <p style={{ color: 'rgb(var(--muted-foreground))', fontSize: 12 }}>Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span style={{ fontWeight: 600, color: 'rgb(var(--foreground))' }}>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="divider" style={{ margin: '12px 0' }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                    <span style={{ color: 'rgb(var(--muted-foreground))' }}>Subtotal</span>
                                    <span style={{ fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                                    <span style={{ color: 'rgb(var(--muted-foreground))' }}>Shipping</span>
                                    <span style={{ fontWeight: 500, color: shipping === 0 ? 'rgb(34, 197, 94)' : 'inherit' }}>
                                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="divider" style={{ margin: '4px 0' }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
                                    <span style={{ fontWeight: 600 }}>Total</span>
                                    <span style={{ fontWeight: 700 }}>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: 12,
                                    background: 'rgb(var(--foreground))',
                                    color: 'rgb(var(--background))',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: loading ? 'default' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8,
                                    marginTop: 24,
                                    opacity: loading ? 0.7 : 1,
                                }}
                            >
                                {loading ? (
                                    <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</>
                                ) : (
                                    'Place Order'
                                )}
                            </motion.button>
                        </motion.div>
                    </div>
                </form>
            </div>

            <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr 360px !important;
          }
        }
      `}</style>
        </div>
    )
}
