import { useState, useEffect } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { colors, radius, font } from '../theme.js'

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}

const navItems = [
  { path: '/',                  label: 'หน้าหลัก',       icon: '🏠' },
  { path: '/waste-management',  label: 'หมวดที่ 4',       icon: '♻️' },
  { path: '/knowledge',         label: 'ให้ความรู้',      icon: '📚' },
  { path: '/quiz',              label: 'แบบทดสอบ',        icon: '✏️' },
  { path: '/building',          label: 'แผนผังอาคาร',     icon: '🏢' },
  { path: '/dashboard',         label: 'Dashboard',       icon: '📊' },
  { path: '/media',             label: 'สื่อประชาสัมพันธ์',   icon: '🖼️' },
]

export default function Layout() {
  const { w } = useWindowSize()
  const isMobile = w < 768
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // ปิด menu เมื่อเปลี่ยนหน้า
  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', flexDirection: 'column' }}>

      {/* ===== NAVBAR ===== */}
      <nav style={{
        background: `linear-gradient(90deg, ${colors.heroDark} 0%, #0F2A1C 60%, ${colors.primary} 100%)`,
        borderBottom: `1px solid rgba(255,255,255,0.08)`,
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 20px rgba(10,22,40,0.4)',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 32px',
          height: 64, display: 'flex', alignItems: 'center', gap: 16,
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              width: 38, height: 38,
              background: `linear-gradient(135deg, ${colors.primaryMid}, ${colors.primary})`,
              borderRadius: radius.md, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, boxShadow: '0 2px 8px rgba(27,94,32,0.5)',
              border: '1px solid rgba(129,199,132,0.3)',
            }}>🌿</div>
            <div>
              <div style={{
                color: '#fff', fontWeight: 800,
                fontSize: isMobile ? 13 : 15, lineHeight: 1.2,
              }}>
                Green Office <span style={{ color: '#81C784' }}>หมวด 4</span>
              </div>
              {!isMobile && (
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
                  อาคาร 51 · สายงานดิจิทัลและการสื่อสาร
                </div>
              )}
            </div>
          </NavLink>

          {/* Desktop nav links */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
              {navItems.map(item => (
                <NavLink key={item.path} to={item.path} end={item.path === '/'} style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? '#81C784' : 'rgba(255,255,255,0.65)',
                  background: isActive ? 'rgba(129,199,132,0.12)' : 'transparent',
                  padding: '8px 14px',
                  borderRadius: radius.sm,
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  display: 'flex', alignItems: 'center', gap: 6,
                  transition: 'all 0.15s',
                  border: isActive ? '1px solid rgba(129,199,132,0.2)' : '1px solid transparent',
                })}>
                  <span>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(v => !v)} style={{
              marginLeft: 'auto', background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', borderRadius: radius.sm,
              width: 38, height: 38, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
            }}>
              {menuOpen ? '✕' : '☰'}
            </button>
          )}
        </div>

        {/* Mobile dropdown menu */}
        {isMobile && menuOpen && (
          <div style={{
            background: '#0D2A1A',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '8px 16px 16px',
          }}>
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path} end={item.path === '/'} style={({ isActive }) => ({
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px', borderRadius: radius.md, marginBottom: 4,
                color: isActive ? '#81C784' : 'rgba(255,255,255,0.75)',
                background: isActive ? 'rgba(129,199,132,0.1)' : 'transparent',
                fontSize: 15, fontWeight: isActive ? 600 : 400,
              })}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* ===== CONTENT ===== */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* ===== FOOTER ===== */}
      <footer style={{
        background: colors.heroDark,
        borderTop: `1px solid rgba(255,255,255,0.08)`,
        padding: isMobile ? '24px 16px' : '32px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>🌿</span>
            <span style={{ color: '#81C784', fontWeight: 700, fontSize: 14 }}>
              Green Office หมวด 4 อาคาร 51
            </span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            สายงานดิจิทัลและการสื่อสาร · การไฟฟ้าส่วนภูมิภาค · มาตรฐาน PEA Eco Standard
          </p>
        </div>
      </footer>
    </div>
  )
}
