import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, radius, font, shadows } from '../theme.js'
import { wasteTypes } from '../data/wasteData.js'

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}

function WasteCard({ waste, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isSelected ? waste.bgColor : colors.surface,
        border: isSelected
          ? `2px solid ${waste.color}`
          : hovered ? `1px solid ${waste.color}66` : `1px solid ${colors.border}`,
        borderRadius: radius.lg, padding: '18px 16px',
        cursor: 'pointer',
        boxShadow: isSelected ? `0 4px 20px ${waste.color}25` : shadows.card,
        transform: hovered && !isSelected ? 'translateY(-2px)' : 'none',
        transition: 'all 0.2s ease',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 36, marginBottom: 8 }}>{waste.icon}</div>
      <div style={{
        fontWeight: 700, fontSize: font.sm, color: isSelected ? waste.color : colors.textPrimary,
        marginBottom: 4,
      }}>{waste.name}</div>
      <div style={{
        fontSize: 11, color: colors.textMuted,
      }}>{waste.nameEn}</div>
      <div style={{
        marginTop: 8, display: 'inline-block',
        background: isSelected ? `${waste.color}20` : '#F5F5F5',
        color: isSelected ? waste.color : colors.textSecondary,
        fontSize: 10, fontWeight: 600,
        padding: '2px 8px', borderRadius: radius.pill,
        border: isSelected ? `1px solid ${waste.color}44` : '1px solid #E0E0E0',
      }}>
        {waste.binColor}
      </div>
    </div>
  )
}

export default function KnowledgePage() {
  const { w } = useWindowSize()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024
  const [selected, setSelected] = useState(wasteTypes[0])
  const navigate = useNavigate()

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #0F2A1C 60%, ${colors.primary} 100%)`,
        padding: isMobile ? '48px 20px' : '64px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: `linear-gradient(rgba(129,199,132,1) 1px, transparent 1px), linear-gradient(90deg, rgba(129,199,132,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(78,24,135,0.4)', border: `1px solid ${colors.accent}55`,
            color: '#CE93D8', padding: '5px 14px', borderRadius: radius.pill,
            fontSize: font.sm, fontWeight: 600, marginBottom: 16,
          }}>
            📚 ให้ความรู้ · Knowledge Center
          </div>
          <h1 style={{
            color: '#fff', fontWeight: 800,
            fontSize: isMobile ? 28 : 42, lineHeight: 1.3, marginBottom: 12,
          }}>
            รู้จักขยะ<br />
            <span style={{ color: '#81C784' }}>แยกให้ถูก ทิ้งให้เป็น</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.7)', fontSize: font.md,
            maxWidth: 540, lineHeight: 1.6,
          }}>
            เรียนรู้ประเภทขยะ 6 ชนิด วิธีการทิ้งที่ถูกต้อง และทำไมการคัดแยกขยะจึงสำคัญ
            สำหรับพนักงานอาคาร 51
          </p>
        </div>
      </section>

      {/* ===== INTERACTIVE WASTE GUIDE ===== */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 32px', background: colors.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              fontSize: font.xs, fontWeight: 700, letterSpacing: 4,
              color: colors.accent, textTransform: 'uppercase', marginBottom: 8,
            }}>WASTE GUIDE</div>
            <h2 style={{ fontSize: font['2xl'], fontWeight: 800, color: colors.textPrimary, marginBottom: 8 }}>
              ขยะ 6 ประเภท — ทิ้งให้ถูกต้อง
            </h2>
            <p style={{ fontSize: font.base, color: colors.textSecondary }}>
              คลิกเลือกประเภทขยะเพื่อดูรายละเอียด
            </p>
          </div>

          {/* Waste type selector grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(6,1fr)',
            gap: 12, marginBottom: 32,
          }}>
            {wasteTypes.map(w => (
              <WasteCard
                key={w.id}
                waste={w}
                isSelected={selected.id === w.id}
                onClick={() => setSelected(w)}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div style={{
            background: colors.surface,
            border: `2px solid ${selected.borderColor}`,
            borderRadius: radius.xl,
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${selected.color}20`,
            transition: 'border-color 0.3s ease',
          }}>
            {/* Header */}
            <div style={{
              background: selected.bgColor,
              borderBottom: `1px solid ${selected.borderColor}`,
              padding: isMobile ? '24px 20px' : '28px 32px',
              display: 'flex', alignItems: 'center', gap: 20,
              flexWrap: 'wrap',
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: radius.lg, flexShrink: 0,
                background: `${selected.color}20`,
                border: `2px solid ${selected.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36,
              }}>{selected.icon}</div>
              <div>
                <div style={{
                  fontSize: font.xs, fontWeight: 700, letterSpacing: 2,
                  color: selected.color, textTransform: 'uppercase', marginBottom: 4,
                }}>{selected.nameEn}</div>
                <h3 style={{
                  fontWeight: 800, fontSize: isMobile ? font.xl : font['2xl'],
                  color: colors.textPrimary, marginBottom: 4,
                }}>{selected.name}</h3>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: `${selected.color}15`,
                  border: `1px solid ${selected.color}44`,
                  color: selected.color,
                  fontSize: font.sm, fontWeight: 600,
                  padding: '4px 12px', borderRadius: radius.pill,
                }}>
                  🗑️ {selected.binColor}
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
              gap: 0,
            }}>
              {/* ตัวอย่าง */}
              <div style={{ padding: '24px', borderRight: isMobile ? 'none' : `1px solid ${colors.border}`, borderBottom: isMobile ? `1px solid ${colors.border}` : 'none' }}>
                <h4 style={{
                  fontWeight: 700, fontSize: font.base, color: selected.color,
                  marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span>✅</span> ตัวอย่างที่ทิ้งได้
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selected.examples.map((ex, i) => (
                    <li key={i} style={{
                      padding: '7px 0',
                      borderBottom: i < selected.examples.length - 1 ? `1px solid ${colors.border}` : 'none',
                      fontSize: font.sm, color: colors.textSecondary,
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <span style={{ color: selected.color, fontSize: 12 }}>●</span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ห้ามทิ้ง */}
              <div style={{ padding: '24px', borderRight: isMobile ? 'none' : `1px solid ${colors.border}`, borderBottom: isMobile ? `1px solid ${colors.border}` : 'none' }}>
                <h4 style={{
                  fontWeight: 700, fontSize: font.base, color: '#E53935',
                  marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span>❌</span> ห้ามทิ้งร่วมกัน
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {selected.doNot.map((d, i) => (
                    <li key={i} style={{
                      padding: '7px 0',
                      borderBottom: i < selected.doNot.length - 1 ? `1px solid ${colors.border}` : 'none',
                      fontSize: font.sm, color: colors.textSecondary,
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                      <span style={{ color: '#E53935', fontSize: 12 }}>●</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* เคล็ดลับ */}
              <div style={{ padding: '24px' }}>
                <h4 style={{
                  fontWeight: 700, fontSize: font.base, color: colors.accent,
                  marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span>💡</span> ทำไมต้องแยก?
                </h4>
                <p style={{
                  fontSize: font.sm, color: colors.textSecondary, lineHeight: 1.7,
                  marginBottom: 16,
                }}>{selected.tip}</p>

                {selected.id === 'ewaste' && (
                  <div style={{
                    background: colors.accentLight, border: `1px solid ${colors.accent}44`,
                    borderRadius: radius.md, padding: '12px 14px',
                    fontSize: font.sm, color: colors.accent, fontWeight: 500,
                  }}>
                    🏢 อาคาร 51 เป็น Data Center มี E-Waste สูงเป็นพิเศษ
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4R SECTION ===== */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px 32px',
        background: `linear-gradient(180deg, ${colors.heroDark} 0%, #0F2A1C 100%)`,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{
              fontSize: font.xs, fontWeight: 700, letterSpacing: 4,
              color: '#81C784', textTransform: 'uppercase', marginBottom: 8,
            }}>THE 4R PRINCIPLE</div>
            <h2 style={{ fontSize: isMobile ? font['2xl'] : font['3xl'], fontWeight: 800, color: '#fff', marginBottom: 10 }}>
              หลักการ 4R
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: font.base }}>
              เรียงลำดับจากดีที่สุดไปหาน้อยที่สุด
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
            gap: 16,
          }}>
            {[
              {
                r: 'Refuse', th: 'ปฏิเสธ', icon: '🚫', color: '#E53935',
                desc: 'ปฏิเสธสิ่งที่ไม่จำเป็น ไม่รับถุงพลาสติก ไม่รับแก้วพลาสติก',
                rank: '1',
              },
              {
                r: 'Reduce', th: 'ลดปริมาณ', icon: '📉', color: colors.gold,
                desc: 'ลดการใช้ทรัพยากร พิมพ์เอกสารเท่าที่จำเป็น ใช้ดิจิทัลแทนกระดาษ',
                rank: '2',
              },
              {
                r: 'Reuse', th: 'ใช้ซ้ำ', icon: '🔄', color: colors.primaryMid,
                desc: 'นำกลับมาใช้ใหม่ ใช้แก้วส่วนตัว กระบอกน้ำ กล่องอาหาร ถุงผ้า',
                rank: '3',
              },
              {
                r: 'Recycle', th: 'แปรรูป', icon: '♻️', color: '#2196F3',
                desc: 'นำส่งรีไซเคิล คัดแยกขวดพลาสติก กระดาษ กระป๋อง ให้ถูกประเภท',
                rank: '4',
              },
            ].map(item => (
              <div key={item.r} style={{
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: radius.lg,
                padding: '24px 20px',
                borderTop: `3px solid ${item.color}`,
                textAlign: 'center',
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, background: `${item.color}25`,
                  border: `1px solid ${item.color}55`,
                  borderRadius: '50%', fontSize: 12, fontWeight: 800,
                  color: item.color, marginBottom: 12,
                }}>{item.rank}</div>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontWeight: 800, fontSize: font.lg, color: item.color, marginBottom: 4 }}>
                  {item.r}
                </div>
                <div style={{ fontWeight: 600, fontSize: font.base, color: '#fff', marginBottom: 10 }}>
                  {item.th}
                </div>
                <p style={{ fontSize: font.sm, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== E-WASTE DEEP DIVE ===== */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 32px', background: colors.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: font.xs, fontWeight: 700, letterSpacing: 4, color: '#9C27B0', textTransform: 'uppercase', marginBottom: 8 }}>E-WASTE FOCUS</div>
            <h2 style={{ fontSize: isMobile ? font['2xl'] : font['3xl'], fontWeight: 800, color: colors.textPrimary, marginBottom: 10 }}>
              ขยะอิเล็กทรอนิกส์ (E-Waste)
            </h2>
            <p style={{ fontSize: font.base, color: colors.textSecondary, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              อาคาร 51 เป็น Data Center — มี E-Waste สูงกว่าสำนักงานทั่วไป การจัดการอย่างถูกต้องจึงสำคัญมาก
            </p>
          </div>

          {/* Stats banner */}
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
            gap: 14, marginBottom: 36,
          }}>
            {[
              { value: '400,000+', unit: 'ตัน/ปี', label: 'E-Waste ที่ไทยสร้าง', color: '#9C27B0' },
              { value: '0.125%', unit: '', label: 'กำจัดถูกต้อง', color: '#E53935' },
              { value: '2,300+', unit: 'จุด', label: 'จุดรับ E-Waste AIS ทั่วประเทศ', color: colors.primaryMid },
              { value: '70%', unit: '', label: 'ของอันตรายในสิ่งแวดล้อม มาจาก E-Waste', color: colors.gold },
            ].map((s, i) => (
              <div key={i} style={{
                background: colors.surface, border: `1px solid ${s.color}33`,
                borderRadius: radius.lg, padding: '18px 16px', textAlign: 'center',
                borderTop: `3px solid ${s.color}`,
              }}>
                <div style={{ fontSize: font['2xl'], fontWeight: 800, color: s.color, lineHeight: 1 }}>
                  {s.value}<span style={{ fontSize: font.sm }}>{s.unit}</span>
                </div>
                <div style={{ fontSize: font.xs, color: colors.textSecondary, marginTop: 8, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* สารพิษใน E-Waste */}
          <div style={{
            background: colors.surface, border: `1px solid ${colors.border}`,
            borderRadius: radius.lg, padding: '24px', marginBottom: 24,
            boxShadow: shadows.card,
          }}>
            <h3 style={{ fontWeight: 700, fontSize: font.lg, color: colors.textPrimary, marginBottom: 16 }}>
              ⚠️ สารพิษที่พบใน E-Waste
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
              gap: 12,
            }}>
              {[
                { metal: 'ตะกั่ว (Lead)', impact: 'ทำลายระบบประสาทส่วนกลางและส่วนปลาย เป็นพิษต่อเลือดและไต', color: '#607D8B', source: 'หน้าจอ CRT, แบตเตอรี่' },
                { metal: 'ปรอท (Mercury)', impact: 'ทำลายสมองและระบบประสาท ส่งผ่านรกสู่ทารกในครรภ์ได้', color: '#9E9E9E', source: 'หลอดฟลูออเรสเซนต์, สวิตช์' },
                { metal: 'แคดเมียม (Cadmium)', impact: 'ก่อมะเร็งปอด ทำลายไตเรื้อรัง', color: '#FF7043', source: 'แบตเตอรี่ชาร์จได้, เซลล์โซลาร์' },
                { metal: 'นิกเกิล (Nickel)', impact: 'ระคายเคืองระบบทางเดินหายใจ ก่อให้เกิดอาการแพ้ผิวหนัง', color: '#78909C', source: 'แบตเตอรี่, สายเคเบิล' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 14, padding: '14px',
                  background: `${item.color}08`, borderRadius: radius.md,
                  border: `1px solid ${item.color}22`,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: radius.sm, flexShrink: 0,
                    background: `${item.color}20`, border: `1px solid ${item.color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>☠️</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: font.base, color: item.color }}>{item.metal}</div>
                    <div style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: 1.5, marginTop: 3 }}>{item.impact}</div>
                    <div style={{ fontSize: font.xs, color: colors.textMuted, marginTop: 4 }}>พบใน: {item.source}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* จุดรับ E-Waste */}
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
            gap: 16, marginBottom: 24,
          }}>
            <div style={{
              background: colors.surface, border: `1px solid ${colors.border}`,
              borderRadius: radius.lg, padding: '22px', boxShadow: shadows.card,
              borderTop: `3px solid ${colors.primaryMid}`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🏛️</div>
              <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 8 }}>ภาครัฐ</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['อปท. ทั่วประเทศ (กรมควบคุมมลพิษ)', 'กรุงเทพฯ — เก็บขยะชิ้นใหญ่ฟรีสัปดาห์ละครั้ง', 'ห้างสรรพสินค้า — จุดรับ 42 แห่งทั่วประเทศ'].map((t, i) => (
                  <li key={i} style={{ fontSize: font.sm, color: colors.textSecondary, padding: '6px 0', borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none', display: 'flex', gap: 8 }}>
                    <span style={{ color: colors.primaryMid }}>●</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: colors.surface, border: `1px solid ${colors.border}`,
              borderRadius: radius.lg, padding: '22px', boxShadow: shadows.card,
              borderTop: `3px solid #1565C0`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🏢</div>
              <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 8 }}>ภาคเอกชน</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['AIS Hub of E-Waste — 2,300+ จุดทั่วประเทศ', 'True TinkTookTee — 154 จุด (True Shop + Dtac)', 'Central Department Store — 42 จุดทั่วประเทศ'].map((t, i) => (
                  <li key={i} style={{ fontSize: font.sm, color: colors.textSecondary, padding: '6px 0', borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none', display: 'flex', gap: 8 }}>
                    <span style={{ color: '#1565C0' }}>●</span>{t}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: colors.surface, border: `1px solid ${colors.border}`,
              borderRadius: radius.lg, padding: '22px', boxShadow: shadows.card,
              borderTop: `3px solid #9C27B0`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>📱</div>
              <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 8 }}>Mobile Application</h3>
              <div style={{
                background: '#F3E5F5', border: `1px solid #CE93D8`,
                borderRadius: radius.md, padding: '12px 14px', marginBottom: 10,
              }}>
                <div style={{ fontWeight: 700, fontSize: font.base, color: '#6A1B9A' }}>E-Waste+</div>
                <div style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: 4, lineHeight: 1.5 }}>
                  ค้นหาจุดรับใกล้บ้าน · ลงทะเบียน Batch ID · รับ Carbon Score · ติดตามผลกระทบ
                </div>
                <div style={{ fontSize: font.xs, color: '#9C27B0', marginTop: 6, fontWeight: 600 }}>
                  📥 ดาวน์โหลดได้บน Google Play Store
                </div>
              </div>
              <div style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: 1.5 }}>
                True TinkTookTee App — คำนวณ CO₂e แบบ Real-time
              </div>
            </div>
          </div>

          {/* มาตรฐานสากล */}
          <div style={{
            background: colors.surface, border: `1px solid ${colors.border}`,
            borderRadius: radius.lg, padding: '24px', boxShadow: shadows.card,
          }}>
            <h3 style={{ fontWeight: 700, fontSize: font.lg, color: colors.textPrimary, marginBottom: 16 }}>
              🌐 มาตรฐานสากลด้าน E-Waste
            </h3>
            <div style={{
              display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
              gap: 12,
            }}>
              {[
                {
                  name: 'R2 (Responsible Recycling)', org: 'SERI — Sustainable Electronics Recycling International',
                  desc: 'มาตรฐานการรีไซเคิลอิเล็กทรอนิกส์ที่ได้รับการรับรองชั้นนำระดับโลก กำหนดกระบวนการ ความปลอดภัย และการทำลายข้อมูล',
                  color: '#1565C0', tag: 'Global Standard',
                },
                {
                  name: 'e-Stewards', org: 'Basel Action Network (BAN)',
                  desc: 'มาตรฐานที่เข้มงวดกว่า R2 ป้องกันการส่งออก E-Waste ไปยังประเทศกำลังพัฒนา บังคับใช้ ISO 14001 + NAID AAA',
                  color: '#2E7D32', tag: 'Strictest Standard',
                },
                {
                  name: 'Basel Convention', org: 'United Nations — 188 ประเทศ',
                  desc: 'สนธิสัญญาพหุภาคีควบคุมการเคลื่อนย้ายของเสียอันตรายข้ามพรมแดน ตั้งแต่ 1 ม.ค. 2568 E-Waste ทุกชิ้นต้องขอความยินยอมก่อน',
                  color: '#4527A0', tag: 'International Treaty',
                },
                {
                  name: 'ISO 14001:2015', org: 'International Organization for Standardization',
                  desc: 'มาตรฐานระบบการจัดการสิ่งแวดล้อม (EMS) ครอบคลุมการกำจัดของเสีย การใช้ทรัพยากร และการปฏิบัติตามกฎหมาย',
                  color: '#00695C', tag: 'EMS Standard',
                },
              ].map((std, i) => (
                <div key={i} style={{
                  padding: '16px', background: `${std.color}06`,
                  border: `1px solid ${std.color}22`, borderRadius: radius.md,
                  borderLeft: `4px solid ${std.color}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
                    <div style={{ fontWeight: 700, fontSize: font.base, color: std.color }}>{std.name}</div>
                    <span style={{
                      background: `${std.color}15`, color: std.color,
                      fontSize: 10, fontWeight: 700, padding: '2px 8px',
                      borderRadius: radius.pill, flexShrink: 0,
                    }}>{std.tag}</span>
                  </div>
                  <div style={{ fontSize: font.xs, color: colors.textMuted, marginBottom: 6 }}>{std.org}</div>
                  <p style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: 1.6 }}>{std.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ENVIRONMENTAL IMPACT ===== */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px 32px',
        background: `linear-gradient(180deg, #1A0A0A 0%, #1A1200 50%, #0A1628 100%)`,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: font.xs, fontWeight: 700, letterSpacing: 4, color: '#FF7043', textTransform: 'uppercase', marginBottom: 8 }}>ENVIRONMENTAL IMPACT</div>
            <h2 style={{ fontSize: isMobile ? font['2xl'] : font['3xl'], fontWeight: 800, color: '#fff', marginBottom: 10 }}>
              ถ้าเราไม่คัดแยก... จะเกิดอะไร?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: font.base, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
              ข้อมูลสถิติจากองค์กรระดับโลก — ผลกระทบจริงที่เกิดขึ้นจากการจัดการขยะที่ไม่ถูกต้อง
            </p>
          </div>

          {/* Impact stat cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
            gap: 16, marginBottom: 32,
          }}>
            {[
              {
                icon: '🌡️', color: '#FF5722',
                stat: '84×', statLabel: 'มีเทนรุนแรงกว่า CO₂',
                title: 'ก๊าซเรือนกระจกจากบ่อขยะ',
                desc: 'มีเทนจากการย่อยสลายขยะในหลุมฝังกลบรุนแรงกว่า CO₂ ถึง 84 เท่า เป็น 11% ของมีเทนที่มนุษย์สร้างทั้งหมด',
                source: 'EPA, 2022',
              },
              {
                icon: '🐢', color: '#009688',
                stat: '150', statLabel: 'ตัวต่อปีในไทย',
                title: 'เต่าทะเลตายจากขยะพลาสติก',
                desc: 'ไทยสูญเสียเต่าทะเล 150 ตัว, วาฬและโลมา 100 ตัว, พะยูน 12 ตัวต่อปี เกือบ 50% ตายเพราะกินถุงพลาสติก',
                source: 'กระทรวงทรัพยากรธรรมชาติฯ',
              },
              {
                icon: '🌊', color: '#1565C0',
                stat: '14M+', statLabel: 'ตันต่อปี',
                title: 'พลาสติกลงสู่มหาสมุทร',
                desc: 'พลาสติกอย่างน้อย 14 ล้านตันไหลลงสู่มหาสมุทรทุกปี ปัจจุบันสะสมอยู่ในทะเล 75-199 ล้านตัน',
                source: 'IUCN, 2024',
              },
              {
                icon: '🏭', color: '#FF7043',
                stat: '5%', statLabel: 'ของ GHG โลก',
                title: 'การปล่อยก๊าซจากหลุมฝังกลบ',
                desc: 'หลุมฝังกลบปล่อยก๊าซเรือนกระจกราว 1.6 พันล้านตัน CO₂e ต่อปี คิดเป็น ~5% ของการปล่อยก๊าซเรือนกระจกทั้งโลก',
                source: 'University of Colorado, EPA',
              },
              {
                icon: '🇹🇭', color: '#F9A825',
                stat: '73,000+', statLabel: 'ตันต่อวัน',
                title: 'ขยะที่ไทยสร้างทุกวัน',
                desc: 'คนไทยสร้างขยะ 1.15 กก./คน/วัน รวม 73,000+ ตันต่อวัน แต่มีเพียง 18.7% ของบ่อขยะที่ได้มาตรฐานสุขอนามัย',
                source: 'กรมควบคุมมลพิษ',
              },
              {
                icon: '🪸', color: '#E91E63',
                stat: '77%', statLabel: 'ของปะการังไทย',
                title: 'แนวปะการังอยู่ในสภาพย่ำแย่',
                desc: '77% ของแนวปะการังไทยอยู่ในสภาพไม่ดี เกิดจากตะกอนชายฝั่ง น้ำเสีย และขยะพลาสติก',
                source: 'กระทรวงทรัพยากรธรรมชาติฯ, 2560',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid rgba(255,255,255,0.1)`,
                borderRadius: radius.lg, padding: '22px',
                borderTop: `3px solid ${item.color}`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: font['2xl'], fontWeight: 800, color: item.color, lineHeight: 1 }}>{item.stat}</div>
                <div style={{ fontSize: font.xs, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>{item.statLabel}</div>
                <h3 style={{ fontWeight: 700, fontSize: font.base, color: '#fff', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: font.sm, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</p>
                <div style={{
                  fontSize: font.xs, color: 'rgba(255,255,255,0.35)',
                  borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8,
                }}>แหล่งข้อมูล: {item.source}</div>
              </div>
            ))}
          </div>

          {/* Thailand e-waste timeline call-to-action */}
          <div style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: radius.lg, padding: '24px',
          }}>
            <h3 style={{ color: '#fff', fontWeight: 700, fontSize: font.lg, marginBottom: 16 }}>
              📅 ไทม์ไลน์กฎหมาย E-Waste ของไทย
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { year: '2561', event: 'กรมควบคุมมลพิษประกาศแผนการจัดการขยะอิเล็กทรอนิกส์แห่งชาติ', color: colors.primaryMid },
                { year: '2567 ก.พ.', event: 'ร่าง พ.ร.บ. WEEE เปิดรับฟังความคิดเห็นสาธารณะ (ใช้หลัก EPR — ผู้ผลิตต้องรับคืนสินค้า)', color: colors.gold },
                { year: '2568 มิ.ย. 24', event: 'ไทยประกาศห้ามนำเข้า E-Waste อย่างเด็ดขาด เพิ่มรายการห้ามจาก 428 เป็น 463 รายการ', color: '#FF7043' },
                { year: '2569', event: 'เป้าหมาย: ผ่าน พ.ร.บ. WEEE และบังคับใช้ระบบ Extended Producer Responsibility เต็มรูปแบบ', color: '#CE93D8' },
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    flexShrink: 0, background: `${t.color}20`, border: `1px solid ${t.color}44`,
                    color: t.color, fontWeight: 700, fontSize: font.xs,
                    padding: '4px 10px', borderRadius: radius.pill, whiteSpace: 'nowrap', marginTop: 2,
                  }}>{t.year}</div>
                  <div style={{ fontSize: font.sm, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{t.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        background: colors.primaryPale,
        borderTop: `1px solid ${colors.border}`,
        padding: isMobile ? '32px 20px' : '48px 32px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <h3 style={{ fontSize: font['2xl'], fontWeight: 800, color: colors.primary, marginBottom: 8 }}>
            ทดสอบความเข้าใจของคุณ
          </h3>
          <p style={{ fontSize: font.base, color: colors.textSecondary, marginBottom: 20, lineHeight: 1.6 }}>
            ทำแบบทดสอบ 10 ข้อเพื่อตรวจสอบว่าคุณเข้าใจเรื่องการจัดการขยะแล้วหรือยัง
          </p>
          <button onClick={() => navigate('/quiz')} style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryMid})`,
            color: '#fff', border: 'none',
            padding: '14px 36px', borderRadius: radius.md,
            fontSize: font.base, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
            boxShadow: shadows.btn,
          }}>
            ✏️ เริ่มทำแบบทดสอบ →
          </button>
        </div>
      </section>
    </div>
  )
}
