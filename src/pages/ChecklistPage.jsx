import { useState, useEffect } from 'react'
import { colors, radius, font, shadows } from '../theme.js'

function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth })
  useEffect(() => {
    const handler = () => setSize({ w: window.innerWidth })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return size
}

// ===== ข้อมูลที่ต้องรวบรวม (เฉพาะรายการที่ส่งผลต่อการประเมิน PEA ECO Standard 02/2567) =====
const checklistGroups = [
  {
    id: 'action_items',
    title: 'งานที่ต้องทำ (Action Items)',
    icon: '🚨',
    color: '#B71C1C',
    bgColor: '#FFEBEE',
    description: 'รายการเร่งด่วนที่ต้องดำเนินการเพื่อให้ทันประเมินปี 2569',
    urgent: true,
    items: [
      { id: 'a1', label: 'ประชุมคณะทำงานหลังสงกรานต์', note: 'นัดทีม 6 คน วางแผนรับมือการประเมินปี 2569 — กำหนดวาระและวันประชุม', urgent: true },
      { id: 'a2', label: 'คิดงานนวัตกรรมจากวัสดุเหลือใช้', note: 'ต้องการ 1 ชิ้น — สำคัญมากถ้า Recycle Rate ยังไม่ถึง 45% (จะใช้เป็นเงื่อนไขให้ได้ 2 คะแนนข้อ 3)', urgent: true },
    ],
  },
  {
    id: 'criteria_evidence',
    title: 'ข้อ 1 — มาตรการ + หลักฐานการกำจัด',
    icon: '📋',
    color: '#1565C0',
    bgColor: '#E3F2FD',
    description: 'คะแนนเต็ม 2 — ต้องมีมาตรการ 4 ด้าน + แจ้งเวียน + ใบเสร็จบริษัทรับขยะ',
    items: [
      { id: 'e1', label: 'เอกสารมาตรการจัดการขยะ 4 ด้าน (ลด/คัดแยก/นำกลับ/กำจัด)', note: 'ต้องมีวันที่ + ลงนามผู้บริหาร + หลักฐานแจ้งเวียนพนักงาน' },
      { id: 'e2', label: 'ใบเสร็จ/หนังสือยืนยันจากบริษัทรับขยะไปกำจัด', note: 'ขยะทั่วไป, อันตราย, E-Waste — ต้องครบทุกประเภทที่ส่งออก' },
    ],
  },
  {
    id: 'waste_data',
    title: 'ข้อ 2 — บันทึกน้ำหนักขยะ + วิเคราะห์',
    icon: '⚖️',
    color: colors.primary,
    bgColor: colors.primaryPale,
    description: 'คะแนนเต็ม 2 — บันทึกรายเดือน ≥4 ประเภท + กราฟ/ตารางเทียบเป้าหมาย',
    items: [
      { id: 'w1', label: 'แบบฟอร์มขยะชั้น 1 ครบทุกเดือน (ก.พ.68 – ก.พ.69)', note: 'ตอนนี้มีแค่ ม.ค.69 — ขาดอีก 12 เดือน' },
      { id: 'w2', label: 'เป้าหมายปริมาณขยะปี 2569 (กก./เดือน หรือ % ลดลง)', note: 'ต้องมีตัวเลขเป้าเพื่อแสดงกราฟเทียบ ข้อ 2 จะไม่ได้คะแนนถ้าไม่มีเป้า' },
    ],
  },
  {
    id: 'recycle_rate',
    title: 'ข้อ 3 — Recycle Rate ≥ 45%',
    icon: '♻️',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    description: 'คะแนนเต็ม 2 — อัตรารีไซเคิล >45%=2คะแนน, 30-45%+นวัตกรรม=2คะแนน, 20-30%=1',
    items: [
      { id: 'r1', label: 'ข้อมูลหรือแผนเพิ่ม Recycle Rate (ปัจจุบัน ~10-16%)', note: 'ต้องถึง 45% หรือมีนวัตกรรมรองรับกรณี 30-45%' },
      { id: 'r2', label: 'สิ่งประดิษฐ์/นวัตกรรมจากวัสดุเหลือใช้อย่างน้อย 1 ชิ้น', note: 'จำเป็นถ้า Recycle Rate อยู่ที่ 30-45% — ถ้าถึง 45% ไม่ต้องมีก็ได้' },
    ],
  },
  {
    id: 'inspection',
    title: 'ข้อ 4 — ตรวจถัง + ตรวจพฤติกรรม',
    icon: '🔍',
    color: '#6A1B9A',
    bgColor: '#F3E5F5',
    description: 'คะแนนเต็ม 2 — ตรวจถังไตรมาสละ 1 ครั้ง + ตรวจพฤติกรรมเดือนละ 1 ครั้ง',
    items: [
      { id: 'i1', label: 'รายงานสุ่มตรวจพฤติกรรมการทิ้งขยะรายเดือน (ทุกเดือน)', note: 'ต้องมีครบทุกเดือนที่ประเมิน — บันทึกสาเหตุทิ้งผิด + แนวทางแก้ไข' },
      { id: 'i2', label: 'ภาพถ่ายถังขยะทุกจุด + ป้ายบ่งชี้ประเภทชัดเจน', note: 'ถ่ายล่าสุด สภาพดี ป้ายอ่านออก ทุกชั้น' },
      { id: 'i3', label: 'ภาพถ่ายจุดพักขยะรวม (ชั้น 1) แสดงการแยกประเภท', note: 'ผู้ตรวจต้องเห็นว่ามีระบบ centralized waste ที่ถูกต้อง' },
    ],
  },
  {
    id: 'wastewater',
    title: 'ข้อ 5 — ถังดักไขมัน / น้ำทิ้ง',
    icon: '💧',
    color: '#006064',
    bgColor: '#E0F7FA',
    description: 'คะแนนเต็ม 2 — ถังดักไขมันใช้งานได้ + ถ้าอาคาร ≥5,000 ตร.ม. ต้องมีรายงานน้ำทิ้ง',
    items: [
      { id: 'ww1', label: 'พื้นที่อาคาร 51 รวมทั้งหมด (ตารางเมตร)', note: '⚠️ ถ้า ≥5,000 ตร.ม. ต้องมีรายงานตรวจวัดน้ำทิ้งตามกฎหมาย — ถ้าน้อยกว่า ไม่ต้อง' },
      { id: 'ww2', label: 'จำนวน ตำแหน่ง และสภาพถังดักไขมัน/บำบัดน้ำเสีย', note: 'อยู่ชั้นไหน กี่จุด สภาพปัจจุบัน ใช้งานได้จริง' },
      { id: 'ww3', label: 'หลักฐานดูดล้างทำความสะอาด (ใบเสร็จ/ใบรับรองบริษัท)', note: 'วันที่ครั้งล่าสุด + บริษัทผู้รับจ้าง ต้องถูกต้องตามกฎหมาย' },
      { id: 'ww4', label: 'รายงานผลตรวจวัดน้ำทิ้ง (เฉพาะถ้าอาคาร ≥5,000 ตร.ม.)', note: 'BOD, SS, pH ตามเกณฑ์กรมควบคุมมลพิษ' },
    ],
  },
  {
    id: 'interview',
    title: 'ข้อ 6 — สัมภาษณ์พนักงาน (4 คะแนน)',
    icon: '🗣️',
    color: '#E65100',
    bgColor: '#FFF3E0',
    description: 'คะแนนสูงสุดในหมวด — ผู้ตรวจสุ่มสัมภาษณ์ ≥5 คน: ตอบผ่าน 5=4คะแนน, 4=3คะแนน, 3=2คะแนน',
    items: [
      { id: 'iv1', label: 'พนักงานทุกคนรู้จักประเภทขยะ 4 ประเภทและทิ้งถูกถัง', note: 'ปี 2568 หลุด 1 คะแนนจากข้อนี้ — ข้อนี้สำคัญที่สุด' },
      { id: 'iv2', label: 'พนักงานทุกคนรู้มาตรการ 3R และนโยบายสำนักงานสีเขียว', note: 'ต้องอบรม/ประชาสัมพันธ์ให้ครอบคลุมทุกชั้น ทุกคน' },
      { id: 'iv3', label: 'มีบันทึก/หลักฐานการอบรมหรือแจ้งพนักงาน', note: 'ถ้ามีหลักฐานว่าแจ้งแล้ว ช่วยยืนยันในกรณีที่พนักงานตอบไม่ได้' },
    ],
  },
  {
    id: 'score_data',
    title: 'คะแนนประเมิน (ทุกหมวด)',
    icon: '🏆',
    color: '#BF360C',
    bgColor: '#FBE9E7',
    description: 'ข้อมูลคะแนนจริงปี 2568 เพื่อแสดงใน Dashboard และตั้งเป้าปี 2569',
    items: [
      { id: 's1', label: 'คะแนนหมวด 4 ปี 2568 แยกรายข้อ (ข้อ 1-6)', note: 'รู้แค่รวม 13/15 — ต้องการว่าขาดข้อไหน' },
      { id: 's2', label: 'คะแนนหมวด 1-3 และ 5-6 ปี 2568', note: 'เพื่อแสดงคะแนนรวมทั้ง 90 คะแนน และระดับ ทอง/เงิน/ทองแดง' },
    ],
  },
  {
    id: 'documents',
    title: 'เอกสารหลักฐานที่ต้องอัปโหลด',
    icon: '📄',
    color: '#1B5E20',
    bgColor: '#E8F5E9',
    description: 'PDF เอกสารที่ผู้ตรวจจะขอดู — ต้องมีพร้อมในวันประเมิน',
    items: [
      { id: 'd1', label: 'ประกาศ/คำสั่งมาตรการจัดการขยะ 4 ด้าน (ลงนามอย่างเป็นทางการ)', note: 'วาง: public/documents/waste-policy.pdf' },
      { id: 'd2', label: 'คำสั่งแต่งตั้งคณะทำงานหมวด 4 ปี 2568/2569', note: 'วาง: public/documents/team-order.pdf' },
      { id: 'd3', label: 'แผนการดำเนินงาน Green Office ปี 2569', note: 'วาง: public/documents/action-plan-2569.pdf' },
    ],
  },
]

function ProgressBar({ done, total, color }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: font.xs, color: colors.textMuted }}>{done}/{total} รายการ</span>
        <span style={{ fontSize: font.xs, fontWeight: 700, color }}>{pct}%</span>
      </div>
      <div style={{ background: '#F0F0F0', borderRadius: radius.pill, height: 6, overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: `linear-gradient(90deg, ${color}, ${color}bb)`,
          borderRadius: radius.pill, transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  )
}

export default function ChecklistPage() {
  const { w } = useWindowSize()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024

  // state: track checked items (เก็บใน localStorage เพื่อจำระหว่าง session)
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem('go451_checklist')
      return saved ? JSON.parse(saved) : {}
    } catch { return {} }
  })

  function toggle(id) {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] }
      localStorage.setItem('go451_checklist', JSON.stringify(next))
      return next
    })
  }

  // คำนวณภาพรวม
  const allItems = checklistGroups.flatMap(g => g.items)
  const totalDone = allItems.filter(item => checked[item.id]).length
  const totalAll = allItems.length
  const overallPct = Math.round((totalDone / totalAll) * 100)

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: `linear-gradient(135deg, ${colors.heroDark} 0%, #1A1200 50%, #1A0A00 100%)`,
        padding: isMobile ? '48px 20px' : '64px 32px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(circle at 80% 50%, ${colors.gold}22 0%, transparent 55%)`,
        }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(249,168,37,0.15)', border: `1px solid ${colors.gold}44`,
            color: colors.gold, padding: '5px 14px', borderRadius: radius.pill,
            fontSize: font.sm, fontWeight: 600, marginBottom: 16,
          }}>
            🚧 อยู่ระหว่างพัฒนา · ข้อมูลที่ต้องรวบรวม
          </div>
          <h1 style={{
            color: '#fff', fontWeight: 800,
            fontSize: isMobile ? 28 : 42, lineHeight: 1.3, marginBottom: 12,
          }}>
            Checklist<br />
            <span style={{ color: colors.gold }}>เป้าหมาย 15/15</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: font.md, maxWidth: 540, lineHeight: 1.6 }}>
            รายการที่ส่งผลต่อการประเมิน PEA Eco Standard โดยตรง — ติ๊กถูกเมื่อได้ข้อมูลแล้ว
          </p>
        </div>
      </section>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: isMobile ? '32px 20px' : '48px 32px' }}>

        {/* Overall progress */}
        <div style={{
          background: colors.surface, border: `1px solid ${colors.border}`,
          borderRadius: radius.lg, padding: '24px 28px', marginBottom: 32,
          boxShadow: shadows.card,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: font.xl, color: colors.textPrimary }}>
                ความคืบหน้าภาพรวม
              </div>
              <div style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: 2 }}>
                ข้อมูลครบแล้ว {totalDone} จาก {totalAll} รายการ
              </div>
            </div>
            <div style={{
              fontSize: font['3xl'], fontWeight: 800,
              color: overallPct === 100 ? colors.primary : overallPct > 50 ? colors.gold : '#E53935',
            }}>
              {overallPct}%
            </div>
          </div>
          <div style={{ background: '#F0F0F0', borderRadius: radius.pill, height: 14, overflow: 'hidden' }}>
            <div style={{
              width: `${overallPct}%`, height: '100%',
              background: overallPct === 100
                ? `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight})`
                : `linear-gradient(90deg, ${colors.gold}, #FFB300)`,
              borderRadius: radius.pill, transition: 'width 0.6s ease',
            }} />
          </div>
          {overallPct === 100 && (
            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: colors.primaryPale, border: `1px solid ${colors.border}`,
              borderRadius: radius.md, fontSize: font.sm,
              color: colors.primary, fontWeight: 600, textAlign: 'center',
            }}>
              ✅ ข้อมูลครบแล้ว — พร้อมลบเมนูนี้ออก
            </div>
          )}
        </div>

        {/* Group summary cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
          gap: 12, marginBottom: 40,
        }}>
          {checklistGroups.map(group => {
            const done = group.items.filter(i => checked[i.id]).length
            return (
              <div key={group.id} style={{
                background: colors.surface, border: `1px solid ${group.color}22`,
                borderRadius: radius.lg, padding: '16px',
                borderTop: `3px solid ${group.color}`,
                boxShadow: shadows.card,
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{group.icon}</div>
                <div style={{ fontSize: font.sm, fontWeight: 700, color: colors.textPrimary, marginBottom: 10 }}>
                  {group.title}
                </div>
                <ProgressBar done={done} total={group.items.length} color={group.color} />
              </div>
            )
          })}
        </div>

        {/* Checklist groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {checklistGroups.map(group => {
            const done = group.items.filter(i => checked[i.id]).length
            const isComplete = done === group.items.length
            return (
              <div key={group.id} style={{
                background: colors.surface,
                border: group.urgent && !isComplete
                  ? `2px solid ${group.color}`
                  : isComplete ? `2px solid ${group.color}66` : `1px solid ${colors.border}`,
                borderRadius: radius.lg, overflow: 'hidden',
                boxShadow: group.urgent && !isComplete
                  ? `0 4px 24px ${group.color}30`
                  : isComplete ? `0 4px 20px ${group.color}18` : shadows.card,
              }}>
                {/* Urgent banner */}
                {group.urgent && !isComplete && (
                  <div style={{
                    background: group.color,
                    padding: '6px 24px',
                    fontSize: 12, fontWeight: 700, color: '#fff',
                    letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    ⚡ เร่งด่วน — ต้องดำเนินการ
                  </div>
                )}

                {/* Group header */}
                <div style={{
                  background: group.urgent && !isComplete ? '#FFF5F5' : isComplete ? `${group.bgColor}` : colors.surface,
                  borderBottom: `1px solid ${colors.border}`,
                  padding: '20px 24px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: 12,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: radius.md,
                      background: group.bgColor, border: `1px solid ${group.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22,
                    }}>{group.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: font.md, color: group.urgent && !isComplete ? group.color : colors.textPrimary }}>
                        {group.title}
                        {isComplete && <span style={{ marginLeft: 8, color: group.color }}>✓ เสร็จแล้ว</span>}
                      </div>
                      <div style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: 2 }}>
                        {group.description}
                      </div>
                    </div>
                  </div>
                  <div style={{ minWidth: 140 }}>
                    <ProgressBar done={done} total={group.items.length} color={group.color} />
                  </div>
                </div>

                {/* Items */}
                <div>
                  {group.items.map((item, idx) => {
                    const isDone = !!checked[item.id]
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        style={{
                          padding: '14px 24px',
                          borderBottom: idx < group.items.length - 1 ? `1px solid ${colors.border}` : 'none',
                          display: 'flex', alignItems: 'center', gap: 14,
                          cursor: 'pointer',
                          background: isDone ? `${group.bgColor}60` : item.urgent && !isDone ? '#FFF5F5' : 'transparent',
                          transition: 'background 0.15s ease',
                        }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                          background: isDone ? group.color : 'transparent',
                          border: isDone ? `2px solid ${group.color}` : `2px solid ${colors.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s ease',
                        }}>
                          {isDone && <span style={{ color: '#fff', fontSize: 13, fontWeight: 800 }}>✓</span>}
                        </div>

                        {/* Label */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: font.base, fontWeight: isDone ? 500 : 400,
                            color: isDone ? colors.textSecondary : colors.textPrimary,
                            textDecoration: isDone ? 'line-through' : 'none',
                          }}>
                            {item.label}
                          </div>
                          {item.note && (
                            <div style={{ fontSize: font.xs, color: colors.textMuted, marginTop: 3 }}>
                              💬 {item.note}
                            </div>
                          )}
                        </div>

                        {/* Status badge */}
                        <div style={{
                          flexShrink: 0,
                          background: isDone ? `${group.color}15` : '#F5F5F5',
                          color: isDone ? group.color : colors.textMuted,
                          border: `1px solid ${isDone ? group.color + '44' : '#E0E0E0'}`,
                          fontSize: font.xs, fontWeight: 600,
                          padding: '3px 10px', borderRadius: radius.pill,
                        }}>
                          {isDone ? 'ได้แล้ว' : 'รอข้อมูล'}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Note */}
        <div style={{
          marginTop: 32, padding: '16px 20px',
          background: '#FFF8E1', border: `1px solid ${colors.gold}44`,
          borderRadius: radius.md,
          fontSize: font.sm, color: '#795548', lineHeight: 1.6,
        }}>
          💡 <strong>หมายเหตุ:</strong> การ tick ✓ ในหน้านี้บันทึกไว้ในเบราว์เซอร์ของพี่เท่านั้น
          เมื่อส่งข้อมูลมาให้ครบแล้ว ผมจะอัปเดตเว็บและลบเมนูนี้ออกครับ
        </div>
      </div>
    </div>
  )
}
