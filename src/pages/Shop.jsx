import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search } from 'lucide-react'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Shop() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')

    const filtered = products.filter(p => {
        const matchCat = activeCategory === 'All' || p.category === activeCategory
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchCat && matchSearch
    })

    return (
        <div style={{ padding: '40px 0 60px' }}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: 32 }}
                >
                    <p style={{ fontSize: 13, color: 'rgb(var(--muted-foreground))', marginBottom: 8 }}>
                        Home / <span style={{ color: 'rgb(var(--foreground))' }}>Shop</span>
                    </p>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: 'rgb(var(--foreground))', letterSpacing: '-0.02em' }}>
                        Shop
                    </h1>
                    <p style={{ fontSize: 15, color: 'rgb(var(--muted-foreground))', marginTop: 6 }}>
                        {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                    </p>
                </motion.div>

                {/* Filters */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                    {/* Search */}
                    <div style={{
                        position: 'relative',
                        maxWidth: 360,
                        display: 'flex',
                        alignItems: 'center',
                        border: '0.5px solid rgba(var(--border), 0.6)',
                        borderRadius: 12,
                        background: 'rgba(var(--muted), 0.35)',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 44,
                            height: 44,
                            flexShrink: 0,
                            color: 'rgb(var(--muted-foreground))',
                        }}>
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '11px 14px 11px 0',
                                border: 'none',
                                background: 'transparent',
                                color: 'rgb(var(--foreground))',
                                fontSize: 14,
                                outline: 'none',
                            }}
                        />
                    </div>

                    {/* Category tabs */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <motion.button
                                key={cat}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setActiveCategory(cat)}
                                style={{
                                    padding: '7px 16px',
                                    borderRadius: 8,
                                    border: 'none',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    background: activeCategory === cat ? 'rgb(var(--foreground))' : 'rgba(var(--muted), 0.8)',
                                    color: activeCategory === cat ? 'rgb(var(--background))' : 'rgb(var(--muted-foreground))',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Products */}
                <AnimatePresence mode="wait">
                    {filtered.length > 0 ? (
                        <motion.div
                            key={activeCategory + searchQuery}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="products-grid"
                        >
                            {filtered.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                textAlign: 'center',
                                padding: '80px 20px',
                            }}
                        >
                            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: 'rgb(var(--foreground))', marginBottom: 8 }}>
                                No products found
                            </h3>
                            <p style={{ fontSize: 14, color: 'rgb(var(--muted-foreground))' }}>
                                Try adjusting your search or filter
                            </p>
                            <button
                                onClick={() => { setActiveCategory('All'); setSearchQuery('') }}
                                style={{
                                    marginTop: 20,
                                    padding: '8px 20px',
                                    borderRadius: 8,
                                    border: '1px solid rgba(var(--border), 0.5)',
                                    background: 'transparent',
                                    color: 'rgb(var(--foreground))',
                                    fontSize: 13,
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                }}
                            >
                                Clear filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
