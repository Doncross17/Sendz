import { Link } from 'react-router-dom'
import { ShoppingBag, Star, Plus, Minus } from 'lucide-react'
import { motion } from 'motion/react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
    const { items, addItem, updateQuantity, removeItem } = useCart()
    const cartItem = items.find(i => i.id === product.id)
    const qty = cartItem ? cartItem.quantity : 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: 'rgba(var(--card), 0.7)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(var(--border), 0.4)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Image */}
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <div className="product-image-wrapper" style={{ aspectRatio: '1 / 1' }}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.badge && (
                        <span
                            style={{
                                position: 'absolute',
                                top: 12,
                                left: 12,
                                fontSize: 11,
                                fontWeight: 600,
                                padding: '4px 10px',
                                borderRadius: 6,
                                background: product.badge === 'Sale' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(var(--accent), 0.9)',
                                color: '#fff',
                                letterSpacing: '0.02em',
                            }}
                        >
                            {product.badge}
                        </span>
                    )}
                </div>
            </Link>

            {/* Info */}
            <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 11, fontWeight: 500, color: 'rgb(var(--muted-foreground))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>
                            {product.category}
                        </p>
                        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h3 className="line-clamp-1" style={{ fontSize: 15, fontWeight: 600, color: 'rgb(var(--foreground))', lineHeight: 1.3 }}>
                                {product.name}
                            </h3>
                        </Link>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={13} fill="rgb(var(--accent))" color="rgb(var(--accent))" />
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'rgb(var(--muted-foreground))' }}>{product.rating}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: 'rgb(var(--foreground))' }}>
                        ${product.price}
                    </span>
                    {qty > 0 ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0,
                            borderRadius: 10,
                            border: '0.5px solid rgba(var(--border), 0.6)',
                            background: 'rgba(var(--muted), 0.35)',
                            overflow: 'hidden',
                        }}>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (qty === 1) removeItem(product.id)
                                    else updateQuantity(product.id, qty - 1)
                                }}
                                style={{
                                    width: 32, height: 32,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'rgb(var(--foreground))',
                                    fontSize: 14,
                                }}
                                aria-label="Decrease quantity"
                            >
                                <Minus size={14} />
                            </motion.button>
                            <span style={{
                                minWidth: 28,
                                textAlign: 'center',
                                fontSize: 13,
                                fontWeight: 700,
                                color: 'rgb(var(--foreground))',
                            }}>
                                {qty}
                            </span>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => { e.preventDefault(); updateQuantity(product.id, qty + 1) }}
                                style={{
                                    width: 32, height: 32,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'rgb(var(--foreground))',
                                    fontSize: 14,
                                }}
                                aria-label="Increase quantity"
                            >
                                <Plus size={14} />
                            </motion.button>
                        </div>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={(e) => { e.preventDefault(); addItem(product) }}
                            style={{
                                padding: '8px 14px',
                                borderRadius: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                background: 'rgb(var(--foreground))',
                                color: 'rgb(var(--background))',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 600,
                                transition: 'opacity 0.2s',
                            }}
                            aria-label="Add to cart"
                        >
                            <ShoppingBag size={14} />
                            Add to Cart
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
