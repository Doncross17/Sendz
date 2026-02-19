import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ShoppingBag, Star, ArrowLeft, Check, MessageSquare, Send } from 'lucide-react'
import { useState } from 'react'
import products from '../data/products'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const mockReviews = {
    1: [
        { id: 1, name: 'Alex M.', rating: 5, date: '2026-02-10', text: 'Absolutely love this lamp. The warm LED tone is perfect for my workspace and the matte finish looks premium.' },
        { id: 2, name: 'Sarah K.', rating: 4, date: '2026-01-28', text: 'Great design and build quality. Wish the arm was slightly longer, but overall very happy with it.' },
    ],
    2: [
        { id: 1, name: 'Jordan P.', rating: 5, date: '2026-02-14', text: 'Best earbuds I\'ve ever owned. Noise cancellation is incredible and battery lasts forever.' },
        { id: 2, name: 'Taylor W.', rating: 5, date: '2026-02-01', text: 'Spatial audio is a game-changer. Extremely comfortable for long listening sessions.' },
        { id: 3, name: 'Chris D.', rating: 4, date: '2026-01-15', text: 'Sound quality is top-notch. The case is a bit bulky though.' },
    ],
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function StarRating({ rating, interactive, onRate }) {
    return (
        <div style={{ display: 'flex', gap: 3 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <Star
                    key={i}
                    size={interactive ? 20 : 14}
                    fill={i <= rating ? 'rgb(var(--accent))' : 'transparent'}
                    color={i <= rating ? 'rgb(var(--accent))' : 'rgb(var(--muted-foreground))'}
                    style={interactive ? { cursor: 'pointer' } : {}}
                    onClick={interactive ? () => onRate(i) : undefined}
                />
            ))}
        </div>
    )
}

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addItem } = useCart()
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    const productReviews = mockReviews[Number(id)] || []
    const [reviews, setReviews] = useState(productReviews)
    const [reviewForm, setReviewForm] = useState({ name: '', text: '', rating: 0 })
    const [showForm, setShowForm] = useState(false)

    const avgRating = reviews.length > 0
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : 0

    const handleSubmitReview = (e) => {
        e.preventDefault()
        if (reviewForm.rating === 0) return
        const newReview = {
            id: Date.now(),
            name: reviewForm.name || 'Anonymous',
            rating: reviewForm.rating,
            date: new Date().toISOString().split('T')[0],
            text: reviewForm.text,
        }
        setReviews(prev => [newReview, ...prev])
        setReviewForm({ name: '', text: '', rating: 0 })
        setShowForm(false)
    }

    const product = products.find(p => p.id === Number(id))
    if (!product) {
        return (
            <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
                <p style={{ fontSize: 48, marginBottom: 16 }}>😕</p>
                <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Product not found</h2>
                <Link to="/shop" style={{ fontSize: 14, color: 'rgb(var(--accent))' }}>Back to shop</Link>
            </div>
        )
    }

    const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

    const handleAdd = () => {
        for (let i = 0; i < quantity; i++) addItem(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div style={{ padding: '32px 0 60px' }}>
            <div className="container">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}
                >
                    <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(var(--muted-foreground))', fontSize: 13 }}>
                        <ArrowLeft size={14} /> Back
                    </button>
                    <span style={{ color: 'rgba(var(--muted-foreground), 0.4)' }}>|</span>
                    <span style={{ fontSize: 13, color: 'rgb(var(--muted-foreground))' }}>
                        <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
                        {' / '}
                        <span style={{ color: 'rgb(var(--foreground))' }}>{product.name}</span>
                    </span>
                </motion.div>

                {/* Product */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40, alignItems: 'start' }} className="product-detail-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div
                            style={{
                                borderRadius: 16,
                                overflow: 'hidden',
                                background: 'rgb(var(--secondary))',
                                aspectRatio: '1 / 1',
                                position: 'relative',
                            }}
                        >
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {product.badge && (
                                <span
                                    style={{
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        padding: '5px 12px',
                                        borderRadius: 8,
                                        background: product.badge === 'Sale' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(var(--accent), 0.9)',
                                        color: '#fff',
                                    }}
                                >
                                    {product.badge}
                                </span>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                    >
                        <div>
                            <p style={{ fontSize: 12, fontWeight: 500, color: 'rgb(var(--muted-foreground))', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                                {product.category}
                            </p>
                            <h1 style={{ fontSize: 28, fontWeight: 700, color: 'rgb(var(--foreground))', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                                {product.name}
                            </h1>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Star size={16} fill="rgb(var(--accent))" color="rgb(var(--accent))" />
                            <span style={{ fontSize: 14, fontWeight: 500, color: 'rgb(var(--foreground))' }}>{product.rating}</span>
                            <span style={{ fontSize: 13, color: 'rgb(var(--muted-foreground))' }}>• In stock</span>
                        </div>

                        <span style={{ fontSize: 32, fontWeight: 700, color: 'rgb(var(--foreground))' }}>
                            ${product.price}
                        </span>

                        <p style={{ fontSize: 15, color: 'rgb(var(--muted-foreground))', lineHeight: 1.7 }}>
                            {product.description}
                        </p>

                        <div className="divider" />

                        {/* Quantity + Add to Cart */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div className="qty-control">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAdd}
                                style={{
                                    flex: 1,
                                    padding: '12px 24px',
                                    borderRadius: 12,
                                    background: added ? 'rgb(34, 197, 94)' : 'rgb(var(--foreground))',
                                    color: added ? '#fff' : 'rgb(var(--background))',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 8,
                                    transition: 'background 0.3s',
                                }}
                            >
                                {added ? <><Check size={16} /> Added!</> : <><ShoppingBag size={16} /> Add to Cart</>}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews Section */}
                <section style={{ marginTop: 56 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Reviews header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                            <div>
                                <h2 style={{ fontSize: 22, fontWeight: 700, color: 'rgb(var(--foreground))', letterSpacing: '-0.02em', marginBottom: 6 }}>
                                    Reviews
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    {reviews.length > 0 && (
                                        <>
                                            <StarRating rating={Math.round(Number(avgRating))} />
                                            <span style={{ fontSize: 14, fontWeight: 600, color: 'rgb(var(--foreground))' }}>{avgRating}</span>
                                            <span style={{ fontSize: 13, color: 'rgb(var(--muted-foreground))' }}>({reviews.length} review{reviews.length !== 1 ? 's' : ''})</span>
                                        </>
                                    )}
                                    {reviews.length === 0 && (
                                        <span style={{ fontSize: 13, color: 'rgb(var(--muted-foreground))' }}>No reviews yet — be the first!</span>
                                    )}
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setShowForm(!showForm)}
                                style={{
                                    padding: '8px 18px',
                                    borderRadius: 10,
                                    background: showForm ? 'rgba(var(--muted), 0.5)' : 'rgb(var(--foreground))',
                                    color: showForm ? 'rgb(var(--foreground))' : 'rgb(var(--background))',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                }}
                            >
                                <MessageSquare size={14} />
                                {showForm ? 'Cancel' : 'Write a Review'}
                            </motion.button>
                        </div>

                        {/* Review form */}
                        {showForm && (
                            <motion.form
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                onSubmit={handleSubmitReview}
                                className="glass-card"
                                style={{
                                    padding: 20,
                                    borderRadius: 14,
                                    marginBottom: 20,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 14,
                                }}
                            >
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 500, color: 'rgb(var(--muted-foreground))', marginBottom: 6 }}>Your Rating *</p>
                                    <StarRating rating={reviewForm.rating} interactive onRate={(r) => setReviewForm(f => ({ ...f, rating: r }))} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgb(var(--muted-foreground))', marginBottom: 6 }}>Name</label>
                                        <input
                                            type="text"
                                            placeholder="Your name (optional)"
                                            value={reviewForm.name}
                                            onChange={(e) => setReviewForm(f => ({ ...f, name: e.target.value }))}
                                            style={{
                                                width: '100%',
                                                padding: '9px 14px',
                                                borderRadius: 10,
                                                border: '0.5px solid rgba(var(--border), 0.6)',
                                                background: 'rgba(var(--muted), 0.35)',
                                                color: 'rgb(var(--foreground))',
                                                fontSize: 14,
                                                outline: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'rgb(var(--muted-foreground))', marginBottom: 6 }}>Review *</label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Share your experience with this product..."
                                        value={reviewForm.text}
                                        onChange={(e) => setReviewForm(f => ({ ...f, text: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '10px 14px',
                                            borderRadius: 10,
                                            border: '0.5px solid rgba(var(--border), 0.6)',
                                            background: 'rgba(var(--muted), 0.35)',
                                            color: 'rgb(var(--foreground))',
                                            fontSize: 14,
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit',
                                        }}
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={reviewForm.rating === 0}
                                    style={{
                                        alignSelf: 'flex-start',
                                        padding: '9px 20px',
                                        borderRadius: 10,
                                        background: reviewForm.rating > 0 ? 'rgb(var(--foreground))' : 'rgba(var(--muted), 0.5)',
                                        color: reviewForm.rating > 0 ? 'rgb(var(--background))' : 'rgb(var(--muted-foreground))',
                                        fontSize: 13,
                                        fontWeight: 600,
                                        border: 'none',
                                        cursor: reviewForm.rating > 0 ? 'pointer' : 'not-allowed',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 6,
                                    }}
                                >
                                    <Send size={13} /> Submit Review
                                </motion.button>
                            </motion.form>
                        )}

                        {/* Reviews list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {reviews.map((review, i) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass-card"
                                    style={{
                                        padding: '18px 20px',
                                        borderRadius: 14,
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                                        <div style={{
                                            width: 36, height: 36, borderRadius: 10,
                                            background: 'rgba(var(--accent), 0.12)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 13, fontWeight: 700,
                                            color: 'rgb(var(--accent))',
                                            flexShrink: 0,
                                        }}>
                                            {getInitials(review.name)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                                                <p style={{ fontSize: 14, fontWeight: 600, color: 'rgb(var(--foreground))' }}>{review.name}</p>
                                                <span style={{ fontSize: 11, color: 'rgb(var(--muted-foreground))' }}>
                                                    {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <StarRating rating={review.rating} />
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 14, color: 'rgb(var(--muted-foreground))', lineHeight: 1.6, marginLeft: 48 }}>
                                        {review.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Related */}
                {related.length > 0 && (
                    <section style={{ marginTop: 56 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'rgb(var(--foreground))', marginBottom: 24, letterSpacing: '-0.02em' }}>
                            You might also like
                        </h2>
                        <div className="products-grid">
                            {related.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>

            <style>{`
        @media (min-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
        </div>
    )
}
