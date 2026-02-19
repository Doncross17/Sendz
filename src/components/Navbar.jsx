import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Sun, Moon, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Navbar({ theme, toggleTheme }) {
    const { totalItems } = useCart()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const links = [
        { to: '/', label: 'Home' },
        { to: '/shop', label: 'Shop' },
        { to: '/orders', label: 'Orders' },
    ]

    const isActive = (path) => location.pathname === path

    return (
        <header
            className="glass"
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                borderBottom: '1px solid rgba(var(--border), 0.3)',
            }}
        >
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: 'rgb(var(--foreground))' }}>
                        SENDZ
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
                    {links.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            style={{
                                textDecoration: 'none',
                                fontSize: 14,
                                fontWeight: isActive(link.to) ? 600 : 400,
                                color: isActive(link.to) ? 'rgb(var(--foreground))' : 'rgb(var(--muted-foreground))',
                                transition: 'color 0.2s',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: 10,
                            cursor: 'pointer',
                            color: 'rgb(var(--muted-foreground))',
                            transition: 'all 0.2s',
                        }}
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <Link
                        to="/cart"
                        style={{
                            width: 40,
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            color: 'rgb(var(--foreground))',
                            textDecoration: 'none',
                            borderRadius: 10,
                            transition: 'background 0.2s',
                        }}
                    >
                        <ShoppingBag size={20} />
                        {totalItems > 0 && (
                            <span className="cart-badge">{totalItems}</span>
                        )}
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            width: 40,
                            height: 40,
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'rgb(var(--foreground))',
                            borderRadius: 10,
                        }}
                        className="mobile-menu-btn"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div
                    className="glass"
                    style={{
                        padding: '16px 24px',
                        borderTop: '1px solid rgba(var(--border), 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 12,
                    }}
                >
                    {links.map(link => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setMobileOpen(false)}
                            style={{
                                textDecoration: 'none',
                                fontSize: 15,
                                fontWeight: isActive(link.to) ? 600 : 400,
                                color: isActive(link.to) ? 'rgb(var(--foreground))' : 'rgb(var(--muted-foreground))',
                                padding: '8px 0',
                            }}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}

            <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
        </header>
    )
}
