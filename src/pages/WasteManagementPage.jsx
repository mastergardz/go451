import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, radius, font, shadows } from '../theme.js'
import { team, criteria, projectInfo } from '../data/wasteData.js'

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 40 }}>
      {eyebrow && (
        <div style={{
          fontSize: font.xs, fontWeight: 700, letterSpacing: 4,
          color: colors.accent, textTransform: 'uppercase', marginBottom: 8,
        }}>{eyebrow}</div>
      )}
      <h2 style={{
        fontSize: font['2xl'], fontWeight: 800,
        color: colors.textPrimary, marginBottom: 10,
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          fontSize: font.base, color: colors.textSecondary,
          maxWidth: 560, margin: '0 auto', lineHeight: 1.6,
        }}>{subtitle}</p>
      )}
    </div>
  )
}

export default function WasteManagementPage() {
  const { w } = useWindowSize()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024
  const navigate = useNavigate()

  return (
    <div>
      {/* ===== PAGE HERO ===== */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #0F2A1C 60%, ${colors.primary} 100%)`,
        padding: isMobile ? '48px 20px' : '64px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 70% 50%, ${colors.accent}33 0%, transparent 60%)`,
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: `${colors.primaryPale}22`, border: `1px solid ${colors.primaryLight}44`,
            color: '#81C784', padding: '5px 14px', borderRadius: radius.pill,
            fontSize: font.sm, fontWeight: 600, marginBottom: 16,
          }}>
            ♻️ หมวดที่ 4 · การจัดการของเสีย (Waste Management)
          </div>
          <h1 style={{
            color: '#fff', fontWeight: 800,
            fontSize: isMobile ? 28 : 42, lineHeight: 1.3, marginBottom: 12,
          }}>
            การจัดการของเสีย<br />
            <span style={{ color: '#81C784' }}>อาคาร 51</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: font.md, maxWidth: 560, lineHeight: 1.6 }}>
            รับผิดชอบดูแลการคัดแยก รวบรวม กำจัดขยะ และบริหารจัดการน้ำเสีย
            ภายในอาคาร 51 สายงานดิจิทัลและการสื่อสาร การไฟฟ้าส่วนภูมิภาค
          </p>
        </div>
      </section>

      {/* ===== SECTION: หน้าที่และความรับผิดชอบ ===== */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 32px', background: colors.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionTitle
            eyebrow="RESPONSIBILITIES"
            title="หน้าที่และความรับผิดชอบ"
            subtitle="หมวดที่ 4 รับผิดชอบการจัดการของเสียครอบคลุม 5 ด้านหลัก"
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
            gap: 20,
          }}>
            {[
              {
                num: '01', icon: '📋', title: 'กำหนดมาตรการและแนวทาง',
                desc: 'จัดทำมาตรการ แนวทาง และบริหารจัดการในการดำเนินงานคัดแยก รวบรวม และกำจัดขยะอย่างเหมาะสมตามหลัก 4R',
                color: colors.accent,
              },
              {
                num: '02', icon: '♻️', title: 'ดำเนินการคัดแยกและกำจัดขยะ',
                desc: 'ดำเนินงานตามแนวทางการคัดแยก รวบรวม และกำจัดขยะ บริหารจัดการนำขยะกลับมาใช้ประโยชน์หรือนำกลับมาใช้ใหม่',
                color: colors.primary,
              },
              {
                num: '03', icon: '💧', title: 'บริหารจัดการน้ำเสีย',
                desc: 'บริหารจัดการน้ำเสียของสำนักงาน ส่งเสริมและมีส่วนควบคุมคุณภาพน้ำทิ้ง ตามมาตรฐานกฎหมายที่เกี่ยวข้อง',
                color: '#006064',
              },
              {
                num: '04', icon: '🔧', title: 'ดูแลอุปกรณ์บำบัดน้ำเสีย',
                desc: 'ดูแลรักษาอุปกรณ์บำบัดน้ำเสีย ถังแซท และถังดักไขมัน ให้ใช้งานได้ดี ไม่ชำรุด ไม่ส่งกลิ่น',
                color: colors.gold,
              },
              {
                num: '05', icon: '📊', title: 'บันทึกและรายงานข้อมูล',
                desc: 'บันทึกน้ำหนักขยะแยกประเภทครบถ้วนทุกเดือน วิเคราะห์และรายงานผลเปรียบเทียบกับเป้าหมาย',
                color: colors.primaryMid,
              },
              {
                num: '06', icon: '🎓', title: 'สร้างความเข้าใจให้พนักงาน',
                desc: 'ประสานงานกับหมวดที่ 2 เพื่อประชาสัมพันธ์และสร้างความเข้าใจด้านการจัดการขยะและน้ำเสียให้พนักงานอย่างทั่วถึง',
                color: '#BF360C',
              },
            ].map(item => (
              <div key={item.num} style={{
                background: colors.surface,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.lg, padding: '24px',
                boxShadow: shadows.card,
                borderTop: `3px solid ${item.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <span style={{
                    fontSize: font.xs, fontWeight: 800, color: item.color,
                    background: `${item.color}15`, padding: '4px 10px',
                    borderRadius: radius.pill, letterSpacing: 1,
                  }}>{item.num}</span>
                  <span style={{ fontSize: 22 }}>{item.icon}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary, marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION: ทีมงาน ===== */}
      <section style={{
        padding: isMobile ? '40px 20px' : '60px 32px',
        background: `linear-gradient(180deg, ${colors.primaryPale} 0%, ${colors.surface} 100%)`,
        borderTop: `1px solid ${colors.border}`,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionTitle
            eyebrow="OUR TEAM"
            title="ทีมงานหมวดที่ 4"
            subtitle="คณะทำงานกำกับดูแล Green Office สายงานดิจิทัลและการสื่อสาร ประจำปี 2569"
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
            gap: 16,
          }}>
            {team.map(member => (
              <div key={member.id} style={{
                background: colors.surface,
                border: member.isLeader ? `2px solid ${colors.primary}` : `1px solid ${colors.border}`,
                borderRadius: radius.lg,
                padding: '20px',
                boxShadow: member.isLeader ? shadows.cardHover : shadows.card,
                display: 'flex', alignItems: 'flex-start', gap: 16,
                position: 'relative',
              }}>
                {member.isLeader && (
                  <div style={{
                    position: 'absolute', top: -1, right: 16,
                    background: colors.primary, color: '#fff',
                    fontSize: 10, fontWeight: 700,
                    padding: '3px 10px', borderRadius: '0 0 8px 8px',
                  }}>หัวหน้า</div>
                )}
                <div>
                  <div style={{ fontWeight: 700, fontSize: font.base, color: colors.textPrimary }}>
                    {member.name}
                  </div>
                  <div style={{
                    marginTop: 6,
                    display: 'inline-block',
                    background: member.isLeader ? colors.primaryPale : '#F5F5F5',
                    color: member.isLeader ? colors.primary : colors.textSecondary,
                    fontSize: font.xs, fontWeight: 600,
                    padding: '2px 10px', borderRadius: radius.pill,
                  }}>
                    {member.role}
                  </div>
                  {member.phone && (
                    <div style={{ marginTop: 4, fontSize: font.xs, color: colors.textSecondary }}>
                      📞 {member.phone}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION: เกณฑ์การประเมิน ===== */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 32px', background: colors.bg }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionTitle
            eyebrow="PEA ECO STANDARD 02/2567"
            title="เกณฑ์การประเมินหมวดที่ 4"
            subtitle="การจัดการของเสีย (Waste Management) คะแนนเต็ม 14 คะแนน"
          />

          {/* คะแนนรวม progress */}
          <div style={{
            background: colors.surface, border: `1px solid ${colors.border}`,
            borderRadius: radius.lg, padding: '24px 28px', marginBottom: 28,
            boxShadow: shadows.card,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontWeight: 700, fontSize: font.md, color: colors.textPrimary }}>
                ผลการประเมินปี 2568 vs เป้าหมายปี 2569
              </span>
              <span style={{ fontWeight: 800, fontSize: font.lg, color: colors.primary }}>
                13 / 14 คะแนน
              </span>
            </div>
            <div style={{ background: '#E8F5E9', borderRadius: radius.pill, height: 12, overflow: 'hidden' }}>
              <div style={{
                width: `${(13 / 14) * 100}%`, height: '100%',
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`,
                borderRadius: radius.pill,
                transition: 'width 1s ease',
              }} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: 8,
              fontSize: font.sm, color: colors.textSecondary,
            }}>
              <span>ปี 2568: 13/14 (92.9%)</span>
              <span style={{ color: colors.accent, fontWeight: 600 }}>🎯 เป้าปี 2569: 14/14 (100%)</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {criteria.map(c => (
              <div key={c.id} style={{
                background: c.isHighlight
                  ? `linear-gradient(135deg, ${colors.surface}, #FFF3E0)`
                  : colors.surface,
                border: c.isHighlight
                  ? `2px solid ${colors.gold}88`
                  : `1px solid ${colors.border}`,
                borderRadius: radius.lg,
                padding: '22px 24px',
                boxShadow: c.isHighlight ? `0 4px 20px rgba(249,168,37,0.15)` : shadows.card,
                position: 'relative',
              }}>
                {c.isHighlight && (
                  <div style={{
                    position: 'absolute', top: -1, right: 20,
                    background: colors.gold, color: '#fff',
                    fontSize: 11, fontWeight: 700,
                    padding: '3px 12px', borderRadius: '0 0 8px 8px',
                  }}>
                    ⚠️ จุดที่ต้องพัฒนาปี 2569
                  </div>
                )}

                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  {/* Icon + Score */}
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: radius.md,
                      background: c.bgColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24, marginBottom: 6,
                    }}>{c.icon}</div>
                    <div style={{
                      fontSize: 12, fontWeight: 800, color: c.color,
                      background: `${c.color}15`, padding: '2px 6px',
                      borderRadius: radius.pill, whiteSpace: 'nowrap',
                    }}>
                      {c.maxScore} คะแนน
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                      <span style={{
                        fontSize: font.xs, fontWeight: 700, letterSpacing: 1,
                        color: c.color, textTransform: 'uppercase',
                      }}>ข้อที่ {c.id}</span>
                      <h3 style={{
                        fontWeight: 700, fontSize: font.md, color: colors.textPrimary,
                      }}>{c.title}</h3>
                    </div>

                    <p style={{
                      fontSize: font.sm, color: colors.textSecondary, lineHeight: 1.65,
                      marginBottom: 12,
                    }}>{c.description}</p>

                    {/* Keywords */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {c.keywords.map(kw => (
                        <span key={kw} style={{
                          background: c.bgColor, color: c.color,
                          fontSize: 11, fontWeight: 600,
                          padding: '3px 10px', borderRadius: radius.pill,
                          border: `1px solid ${c.color}33`,
                        }}>{kw}</span>
                      ))}
                    </div>

                    {c.isHighlight && c.highlightNote && (
                      <div style={{
                        marginTop: 12, padding: '10px 14px',
                        background: '#FFF8E1', border: `1px solid ${colors.gold}55`,
                        borderRadius: radius.md,
                        fontSize: font.sm, color: '#795548',
                        fontWeight: 500,
                      }}>
                        💡 {c.highlightNote}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.primary}, #0F2A1C)`,
        padding: isMobile ? '40px 20px' : '60px 32px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h3 style={{ color: '#fff', fontWeight: 800, fontSize: font['2xl'], marginBottom: 12 }}>
            พร้อมเรียนรู้เพิ่มเติม?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: font.base, marginBottom: 28, lineHeight: 1.6 }}>
            ศึกษาความรู้เรื่องขยะแต่ละประเภท หรือทำแบบทดสอบเพื่อทดสอบความเข้าใจ
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/knowledge')} style={{
              background: '#fff', color: colors.primary,
              border: 'none', padding: '12px 28px', borderRadius: radius.md,
              fontSize: font.base, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
            }}>
              📚 ให้ความรู้ขยะ
            </button>
            <button onClick={() => navigate('/quiz')} style={{
              background: colors.gold, color: '#fff',
              border: 'none', padding: '12px 28px', borderRadius: radius.md,
              fontSize: font.base, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'Sarabun, sans-serif',
            }}>
              ✏️ ทำแบบทดสอบ
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
