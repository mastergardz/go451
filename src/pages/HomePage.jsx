import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, radius, font, shadows } from '../theme.js'
import { allDivisions, projectInfo, scoreHistory } from '../data/wasteData.js'

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}

// ===== Stat Card (สไตล์ Theme C stat bar แต่สีสว่าง) =====
function StatCard({ icon, value, label, accent }) {
  return (
    <div style={{
      background: colors.surface,
      border: `1px solid ${accent}33`,
      borderRadius: radius.lg,
      padding: '20px 24px',
      textAlign: 'center',
      boxShadow: shadows.card,
    }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: font['3xl'], fontWeight: 800, color: accent, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: 6 }}>{label}</div>
    </div>
  )
}

// ===== Division Card =====
function DivisionCard({ div, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={div.isMain ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: div.isMain
          ? `linear-gradient(135deg, #fff, ${colors.primaryPale})`
          : colors.surface,
        border: div.isMain
          ? `2px solid ${colors.primaryMid}`
          : `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: '22px 20px',
        cursor: div.isMain ? 'pointer' : 'default',
        boxShadow: hovered && div.isMain ? shadows.cardHover : shadows.card,
        transform: hovered && div.isMain ? 'translateY(-3px)' : 'none',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* กรอบพิเศษหมวด 4 */}
      {div.isMain && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
        }} />
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{
          width: 48, height: 48, borderRadius: radius.md, flexShrink: 0,
          background: div.isMain
            ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryMid})`
            : div.bgColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
          boxShadow: div.isMain ? '0 4px 12px rgba(27,94,32,0.3)' : 'none',
        }}>{div.icon}</div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              fontSize: font.xs, fontWeight: 700, letterSpacing: 1,
              color: div.isMain ? colors.primary : div.color,
              textTransform: 'uppercase',
            }}>{div.name}</span>
            {div.isMain && (
              <span style={{
                background: colors.gold, color: '#fff',
                fontSize: 10, fontWeight: 700,
                padding: '2px 8px', borderRadius: radius.pill,
              }}>โฟกัสหลัก</span>
            )}
          </div>

          <div style={{
            fontSize: font.md, fontWeight: 700,
            color: div.isMain ? colors.primary : colors.textPrimary,
            marginBottom: 4,
          }}>{div.title}</div>

          <div style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: 1.5 }}>
            {div.subtitle}
          </div>

          <div style={{
            marginTop: 10, display: 'flex', alignItems: 'center', gap: 6,
            flexWrap: 'wrap',
          }}>
            {div.isMain && div.score2568 && (
              <span style={{
                background: colors.accentLight,
                color: colors.accent,
                fontSize: font.xs, fontWeight: 600,
                padding: '3px 10px', borderRadius: radius.pill,
              }}>
                {div.score2568}/{div.scoreMax} คะแนน ปี 2568
              </span>
            )}
          </div>
        </div>
      </div>

      {div.isMain && (
        <div style={{
          marginTop: 14, paddingTop: 14,
          borderTop: `1px solid ${colors.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: font.sm, color: colors.textSecondary }}>
            เป้าหมายปี 2569: <strong style={{ color: colors.primary }}>15/15 คะแนนเต็ม</strong>
          </span>
          <span style={{ fontSize: 18 }}>→</span>
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  const { w } = useWindowSize()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024
  const navigate = useNavigate()

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #0F2A1C 50%, ${colors.primary} 100%)`,
        padding: isMobile ? '48px 20px 56px' : '72px 32px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* radial glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 80% 40%, ${colors.accent}44 0%, transparent 55%)`,
        }} />
        {/* subtle grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: `linear-gradient(rgba(129,199,132,1) 1px, transparent 1px), linear-gradient(90deg, rgba(129,199,132,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(78,24,135,0.45)', border: `1px solid ${colors.accent}66`,
            color: '#CE93D8', padding: '6px 16px', borderRadius: radius.pill,
            fontSize: font.sm, fontWeight: 500, marginBottom: 20,
          }}>
            🏢 {projectInfo.building} · {projectInfo.division}
          </div>

          <h1 style={{
            color: '#fff', fontWeight: 800,
            fontSize: isMobile ? 32 : 48,
            lineHeight: 1.25, marginBottom: 12,
            fontFamily: 'Sarabun, sans-serif',
          }}>
            สำนักงานสีเขียว<br />
            <span style={{ color: '#81C784' }}>เริ่มที่มือเรา</span>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? 15 : 17,
            marginBottom: 36, maxWidth: 560, lineHeight: 1.6,
          }}>
            {projectInfo.slogan} — ร่วมกันพัฒนาสำนักงานสีเขียวเพื่อสิ่งแวดล้อมที่ดีกว่า
          </p>

          {/* Score + CTA row */}
          <div style={{
            display: 'flex', gap: 16, alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Score 2568 */}
            <div style={{
              background: 'rgba(249,168,37,0.15)', border: '1px solid rgba(249,168,37,0.4)',
              borderRadius: radius.lg, padding: '14px 22px',
            }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: colors.gold, lineHeight: 1 }}>
                13<span style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>/14</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: font.sm, marginTop: 4 }}>คะแนนปี 2568</div>
            </div>
            {/* Target 2569 */}
            <div style={{
              background: 'rgba(27,94,32,0.25)', border: `1px solid ${colors.primaryLight}55`,
              borderRadius: radius.lg, padding: '14px 22px',
            }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: '#81C784', lineHeight: 1 }}>
                14<span style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>/14</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: font.sm, marginTop: 4 }}>เป้าหมายปี 2569</div>
            </div>
            {/* CTA */}
            <button
              onClick={() => navigate('/waste-management')}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryMid})`,
                color: '#fff', border: 'none',
                padding: '14px 28px', borderRadius: radius.md,
                fontSize: 15, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
                boxShadow: shadows.btn,
              }}
            >
              เรียนรู้หมวดที่ 4 →
            </button>
          </div>
        </div>
      </section>

      {/* ===== STAT BAR ===== */}
      <section style={{
        background: colors.surface,
        borderBottom: `1px solid ${colors.border}`,
        padding: isMobile ? '24px 20px' : '28px 32px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: isMobile ? 12 : 20,
        }}>
          <StatCard icon="🏆" value="93%" label="คะแนนรวมปี 2568" accent={colors.gold} />
          <StatCard icon="📂" value="6" label="หมวดการประเมิน" accent={colors.primary} />
          <StatCard icon="🗑️" value="6" label="ประเภทขยะที่คัดแยก" accent={colors.primaryMid} />
          <StatCard icon="🎯" value="100%" label="เป้าหมายปี 2569" accent={colors.accent} />
        </div>
      </section>

      {/* ===== SECTION: ภาพรวม 6 หมวด ===== */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 32px', background: colors.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              fontSize: font.xs, fontWeight: 700, letterSpacing: 4,
              color: colors.accent, textTransform: 'uppercase', marginBottom: 8,
            }}>
              PEA ECO STANDARD
            </div>
            <h2 style={{
              fontSize: isMobile ? font['2xl'] : font['3xl'],
              fontWeight: 800, color: colors.textPrimary, marginBottom: 12,
            }}>
              ภาพรวมโครงการ Green Office
            </h2>
            <p style={{
              fontSize: font.md, color: colors.textSecondary,
              maxWidth: 560, margin: '0 auto', lineHeight: 1.6,
            }}>
              โครงการพัฒนาสำนักงานสีเขียว อาคาร 51 ประกอบด้วย 6 หมวดการประเมิน
              ตามมาตรฐาน PEA Eco Standard ฉบับปรับปรุงครั้งที่ 02/2567
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
            gap: 20,
          }}>
            {allDivisions.map(div => (
              <DivisionCard
                key={div.id}
                div={div}
                onClick={() => navigate('/waste-management')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION: ทำไมต้อง Green Office ===== */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px 32px',
        background: `linear-gradient(180deg, ${colors.heroDark} 0%, #0F2A1C 100%)`,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              fontSize: font.xs, fontWeight: 700, letterSpacing: 4,
              color: '#81C784', textTransform: 'uppercase', marginBottom: 8,
            }}>
              WHY GREEN OFFICE?
            </div>
            <h2 style={{
              fontSize: isMobile ? font['2xl'] : font['3xl'],
              fontWeight: 800, color: '#fff', marginBottom: 12,
            }}>
              ทำไมต้องสำนักงานสีเขียว?
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
            gap: 20,
          }}>
            {[
              {
                icon: '🌍', title: 'รับผิดชอบต่อสิ่งแวดล้อม',
                desc: 'ลดผลกระทบต่อสิ่งแวดล้อมจากการดำเนินงานของสำนักงาน ทั้งขยะ น้ำเสีย และการใช้พลังงาน',
                accent: '#4CAF50',
              },
              {
                icon: '⚡', title: 'ประสิทธิภาพที่ดีขึ้น',
                desc: 'ลดต้นทุนการจัดการของเสีย ประหยัดพลังงาน และสร้างสภาพแวดล้อมการทำงานที่ดีขึ้น',
                accent: colors.gold,
              },
              {
                icon: '🏛️', title: 'มาตรฐานองค์กรภาครัฐ',
                desc: 'การไฟฟ้าส่วนภูมิภาคมุ่งสู่การเป็นองค์กรต้นแบบด้านสิ่งแวดล้อม ตามนโยบาย PEA Eco Standard',
                accent: '#CE93D8',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: radius.lg, padding: '28px 24px',
                borderTop: `3px solid ${item.accent}`,
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: font.lg, marginBottom: 10 }}>
                  {item.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: font.base, lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section style={{
        background: colors.primaryPale,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`,
        padding: isMobile ? '32px 20px' : '40px 32px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>✏️</div>
          <h3 style={{ fontSize: isMobile ? font.xl : font['2xl'], fontWeight: 800, color: colors.primary, marginBottom: 8 }}>
            ทดสอบความเข้าใจของคุณ
          </h3>
          <p style={{ fontSize: font.base, color: colors.textSecondary, marginBottom: 20, lineHeight: 1.6 }}>
            แบบทดสอบ 10 ข้อเกี่ยวกับการจัดการของเสียและสิ่งแวดล้อม
            ช่วยเตรียมพร้อมสำหรับการประเมิน Green Office
          </p>
          <button
            onClick={() => navigate('/quiz')}
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryMid})`,
              color: '#fff', border: 'none',
              padding: '14px 36px', borderRadius: radius.md,
              fontSize: font.base, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
              boxShadow: shadows.btn,
            }}
          >
            เริ่มทำแบบทดสอบ →
          </button>
        </div>
      </section>
    </div>
  )
}
