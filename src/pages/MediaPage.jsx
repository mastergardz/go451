import { useState, useEffect } from 'react'
import { colors, radius, font, shadows } from '../theme.js'

const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
const MEDIA_URL = '/go451/media/'

function isImage(name) {
  return IMAGE_EXTS.includes(name.split('.').pop().toLowerCase())
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch(MEDIA_URL)
      .then(r => r.json())
      .then(data => {
        const imgs = data.filter(f => f.type === 'file' && isImage(f.name))
        setImages(imgs)
        setLoading(false)
      })
      .catch(() => {
        setError('ไม่พบไฟล์หรือโฟลเดอร์ media')
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #0F2A1C 60%, ${colors.primary} 100%)`,
        padding: '64px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 70% 50%, ${colors.primaryMid}22 0%, transparent 60%)`,
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(27,94,32,0.5)', border: `1px solid ${colors.primaryMid}55`,
            color: '#81C784', padding: '5px 14px', borderRadius: radius.pill,
            fontSize: font.sm, fontWeight: 600, marginBottom: 16,
          }}>🖼️ สื่อประชาสัมพันธ์ · Infographic</div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 42, lineHeight: 1.3, marginBottom: 12 }}>
            สื่อประชาสัมพันธ์<br />
            <span style={{ color: '#81C784' }}>สำนักงานสีเขียว</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: font.md, maxWidth: 500, lineHeight: 1.6 }}>
            Infographic และสื่อเผยแพร่ความรู้ด้านการจัดการขยะ — คลิกภาพเพื่อดูขนาดเต็ม หรือดาวน์โหลดไปใช้งานได้เลย
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px' }}>

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: colors.textSecondary, fontSize: font.md }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
            กำลังโหลดสื่อ...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: colors.textSecondary, fontSize: font.md }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>📭</div>
            {error}
          </div>
        )}

        {!loading && !error && images.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>🖼️</div>
            <div style={{ fontSize: font.lg, fontWeight: 700, color: colors.textPrimary, marginBottom: 8 }}>
              ยังไม่มีสื่อในขณะนี้
            </div>
            <div style={{ fontSize: font.sm, color: colors.textSecondary }}>
              อยู่ระหว่างจัดเตรียม — กรุณาติดตามเร็วๆ นี้ค่ะ
            </div>
          </div>
        )}

        {images.length > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div>
                <h2 style={{ fontWeight: 700, fontSize: font.lg, color: colors.textPrimary, marginBottom: 4 }}>
                  Infographic ทั้งหมด
                </h2>
                <p style={{ fontSize: font.sm, color: colors.textSecondary }}>
                  {images.length} รายการ · คลิกเพื่อดูและดาวน์โหลด
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 24,
            }}>
              {images.map(img => (
                <div
                  key={img.name}
                  onClick={() => setSelected(img)}
                  style={{
                    background: colors.surface,
                    border: `1px solid ${colors.border}`,
                    borderRadius: radius.lg,
                    overflow: 'hidden',
                    boxShadow: shadows.card,
                    cursor: 'pointer',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = `0 8px 32px ${colors.primary}33`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = shadows.card
                  }}
                >
                  <div style={{ width: '100%', height: 200, background: '#F0F4F0', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={MEDIA_URL + img.name}
                      alt={img.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{
                      fontSize: font.sm, fontWeight: 600, color: colors.textPrimary,
                      marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {img.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}
                    </div>
                    <div style={{ fontSize: font.xs, color: colors.textSecondary, marginBottom: 12 }}>
                      {img.name.split('.').pop().toUpperCase()} · {formatSize(img.size)}
                    </div>
                    <a
                      href={MEDIA_URL + img.name}
                      download={img.name}
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        background: colors.primary, color: '#fff',
                        padding: '8px 0', borderRadius: radius.md,
                        fontSize: font.sm, fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      ⬇️ ดาวน์โหลด
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: radius.lg,
              overflow: 'hidden', maxWidth: '90vw', maxHeight: '90vh',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}
          >
            <img
              src={MEDIA_URL + selected.name}
              alt={selected.name}
              style={{ maxWidth: '85vw', maxHeight: '75vh', objectFit: 'contain', display: 'block' }}
            />
            <div style={{
              padding: '16px 20px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: 16,
            }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary }}>
                  {selected.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}
                </div>
                <div style={{ fontSize: font.xs, color: colors.textSecondary }}>
                  {selected.name.split('.').pop().toUpperCase()} · {formatSize(selected.size)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={MEDIA_URL + selected.name}
                  download={selected.name}
                  style={{
                    background: colors.primary, color: '#fff',
                    padding: '10px 20px', borderRadius: radius.md,
                    fontSize: font.sm, fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  ⬇️ ดาวน์โหลด
                </a>
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    background: '#F5F5F5', color: colors.textPrimary,
                    padding: '10px 16px', borderRadius: radius.md,
                    fontSize: font.sm, fontWeight: 700,
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  ✕ ปิด
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
