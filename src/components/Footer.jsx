export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid rgba(var(--border), 0.3)', marginTop: 80 }}>
            <div className="container" style={{ padding: '40px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em', color: 'rgb(var(--foreground))' }}>
                    SENDZ
                </span>
                <p style={{ fontSize: 13, color: 'rgb(var(--muted-foreground))', textAlign: 'center', maxWidth: 400 }}>
                    Curated essentials for modern living. Quality over quantity, always.
                </p>
                <div className="divider" style={{ width: '100%', maxWidth: 200, margin: '8px 0' }} />
                <p style={{ fontSize: 12, color: 'rgb(var(--muted-foreground))' }}>
                    © {new Date().getFullYear()} SENDZ. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
