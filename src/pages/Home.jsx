import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Sparkles, Truck, Shield, RotateCcw, Mail } from 'lucide-react'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

const features = [
    { icon: <Truck size={20} />, title: 'Free Shipping', desc: 'On orders over $99' },
    { icon: <Shield size={20} />, title: 'Secure Payments', desc: '256-bit encryption' },
    { icon: <RotateCcw size={20} />, title: '30-Day Returns', desc: 'No questions asked' },
]

export default function Home() {
    const featured = products.slice(0, 4)
    const newArrivals = products.filter(p => p.badge === 'New')

    return (
        <div>
            {/* Hero */}
            <section
                style={{
                    position: 'relative',
                    minHeight: 620,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                {/* Background image */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} />
                {/* Dark overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.6) 100%)',
                }} />

                {/* Content */}
                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '100px 1.5rem' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', marginBottom: 24, fontSize: 13, fontWeight: 500, color: '#fff' }}>
                            <Sparkles size={14} />
                            New Collection 2026
                        </div>

                        <h1
                            style={{
                                fontSize: 'clamp(36px, 6vw, 64px)',
                                fontWeight: 800,
                                lineHeight: 1.1,
                                letterSpacing: '-0.03em',
                                marginBottom: 20,
                                color: '#fff',
                            }}
                        >
                            Shop smarter,
                            <br />
                            live better.
                        </h1>

                        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.7 }}>
                            Everything your family needs. Curated essentials, great prices, and fast delivery right to your door.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <Link to="/shop" style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '13px 30px',
                                        borderRadius: 12,
                                        background: 'rgb(var(--accent))',
                                        color: '#fff',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        border: 'none',
                                    }}
                                >
                                    Start Shopping
                                    <ArrowRight size={16} />
                                </motion.span>
                            </Link>
                            <Link to="/shop" style={{ textDecoration: 'none' }}>
                                <motion.span
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '13px 30px',
                                        borderRadius: 12,
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        background: 'rgba(255,255,255,0.08)',
                                        backdropFilter: 'blur(6px)',
                                        color: '#fff',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    Browse Deals
                                </motion.span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: '48px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card"
                                style={{
                                    padding: 20,
                                    borderRadius: 14,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 14,
                                }}
                            >
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(var(--accent), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(var(--accent))' }}>
                                    {f.icon}
                                </div>
                                <div>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: 'rgb(var(--foreground))' }}>{f.title}</p>
                                    <p style={{ fontSize: 12, color: 'rgb(var(--muted-foreground))' }}>{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section style={{ padding: '40px 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                        <div>
                            <h2 style={{ fontSize: 24, fontWeight: 700, color: 'rgb(var(--foreground))', letterSpacing: '-0.02em' }}>Featured</h2>
                            <p style={{ fontSize: 14, color: 'rgb(var(--muted-foreground))', marginTop: 4 }}>Hand-picked for you</p>
                        </div>
                        <Link to="/shop" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 500, color: 'rgb(var(--accent))', display: 'flex', alignItems: 'center', gap: 4 }}>
                            View all <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="products-grid">
                        {featured.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            {newArrivals.length > 0 && (
                <section style={{ padding: '40px 0 60px' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                            <div>
                                <h2 style={{ fontSize: 24, fontWeight: 700, color: 'rgb(var(--foreground))', letterSpacing: '-0.02em' }}>New Arrivals</h2>
                                <p style={{ fontSize: 14, color: 'rgb(var(--muted-foreground))', marginTop: 4 }}>Just dropped</p>
                            </div>
                        </div>
                        <div className="products-grid">
                            {newArrivals.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Banner */}
            <section style={{ padding: '0 0 60px' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass-card"
                        style={{
                            padding: '48px 32px',
                            borderRadius: 20,
                            textAlign: 'center',
                            background: 'linear-gradient(135deg, rgba(var(--accent), 0.08), rgba(var(--card), 0.7))',
                        }}
                    >
                        <h2 style={{ fontSize: 28, fontWeight: 700, color: 'rgb(var(--foreground))', marginBottom: 12, letterSpacing: '-0.02em' }}>
                            Join the minimal movement
                        </h2>
                        <p style={{ fontSize: 15, color: 'rgb(var(--muted-foreground))', maxWidth: 400, margin: '0 auto 24px' }}>
                            Sign up for early access to new drops, exclusive offers, and curated content.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, maxWidth: 420, margin: '0 auto' }}>
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                border: '0.5px solid rgba(var(--border), 0.6)',
                                borderRadius: 12,
                                background: 'rgba(var(--muted), 0.35)',
                                transition: 'border-color 0.2s',
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 42,
                                    height: 42,
                                    flexShrink: 0,
                                    color: 'rgb(var(--muted-foreground))',
                                }}>
                                    <Mail size={17} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    style={{
                                        flex: 1,
                                        padding: '10px 14px 10px 0',
                                        border: 'none',
                                        background: 'transparent',
                                        color: 'rgb(var(--foreground))',
                                        fontSize: 14,
                                        outline: 'none',
                                    }}
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: 10,
                                    background: 'rgb(var(--foreground))',
                                    color: 'rgb(var(--background))',
                                    fontSize: 14,
                                    fontWeight: 600,
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
